using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.Subject;
using Platform.Utilities;

namespace Platform.Domain.Logic
{
    internal class SubjectsLogic : ISubjectsLogic
    {
        private readonly IPlatformRepository _platformRepository;
        private readonly IStudentsDal _studentsDal;
        private readonly ISubjectsDal _subjectsDal;

        public SubjectsLogic(IPlatformRepository platformRepository, ISubjectsDal subjectsDal, IStudentsDal studentsDal)
        {
            _platformRepository = platformRepository;
            _subjectsDal = subjectsDal;
            _studentsDal = studentsDal;
        }

        public async Task<Subject> AddSubjectAsync(AddSubjectViewModel model)
        {
            Require.NotNull(model, nameof(model));

            if (await _platformRepository.GetForNameAsync<Subject>(model.Name) != null)
            {
                throw new ConflictException($"Subject {model.Name} already exists");
            }

            var teacher = await _platformRepository.GetForIdAsync<Teacher>(model.TeacherId);

            if (teacher == null)
            {
                throw new NotFoundException($"No Teacher with id {model.TeacherId} found");
            }

            var subject = new Subject
            {
                Name = model.Name
            };
            subject.TeachersSubjects = new[] {new TeacherSubject(teacher, subject)};

            await _platformRepository.AddAsync(subject);
            return subject;
        }

        public async Task<(IEnumerable<Subject>, int)> FetchSubjectsAsync(string search, int index, int count,
            bool obsolete)
        {
            Require.NotNull(search, nameof(search));
            var subjects = _platformRepository.FindForName<Subject>(search)
                .Include(s => s.TeachersSubjects)
                .ThenInclude(t => t.Teacher);
            if (obsolete)
            {
                var amount = await subjects.CountAsync();
                var filtered = await subjects
                    .OrderBy(a => a.Name)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return (filtered, amount);
            }
            else
            {
                var amount = await subjects.Where(s => !s.Obsolete).CountAsync();
                var filtered = await subjects.Where(s => !s.Obsolete)
                    .OrderBy(a => a.Name)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return (filtered, amount);
            }
        }

        public async Task<Subject> ObsoleteSubjectAsync(int id)
        {
            var subject = await _platformRepository.GetForIdAsync<Subject>(id);
            if (subject == null)
            {
                throw new NotFoundException($"No subject with id {id}");
            }

            subject.Obsolete = true;
            await _platformRepository.UpdateAsync(subject);
            return subject;
        }

        public Task<Subject> GetSubjectAsync(int id, Func<IQueryable<Subject>, IQueryable<Subject>> expression = null)
        {
            return _platformRepository.GetForIdAsync(id, expression);
        }

        public async Task<Subject> EditSubjectAsync(EditSubjectViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var subject = await _platformRepository.GetForNameAsync<Subject>(editModel.Name);
            if (subject != null)
            {
                if (subject.Id != editModel.SubjectId)
                {
                    throw new ConflictException($"Subject with name {editModel.Name} already exists");
                }
            }
            else
            {
                subject = await _platformRepository.GetForIdAsync<Subject>(editModel.SubjectId);
            }

            if (subject == null)
            {
                throw new NotFoundException($"No subject with id {editModel.SubjectId}");
            }

            subject.Name = editModel.Name ?? subject.Name;
            subject.Description = editModel.Description ?? subject.Description;
            await _platformRepository.UpdateAsync(subject);
            return subject;
        }

        public async Task<Subject> RestoreSubjectAsync(int id)
        {
            var subject = await _platformRepository.GetForIdAsync<Subject>(id);
            if (subject == null)
            {
                throw new NotFoundException($"No Subject with id {id}");
            }

            if (!subject.Obsolete)
            {
                throw new ConflictException($"Subject with id {id} is not obsoleted.");
            }

            subject.Obsolete = false;
            await _platformRepository.UpdateAsync(subject);
            return subject;
        }

        public async Task<IEnumerable<Teacher>> GetSubjectsTeachersAsync(int subjectId)
        {
            var teachers = await _subjectsDal.GetSubjectsTeachers(subjectId).ToListAsync();
            return teachers;
        }

        public async Task<Teacher> AddTeacherToSubjectAsync(AddTeacherToSubjectViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var subject = await _subjectsDal.GetSubjectWithTeachersAsync(model.SubjectId);
            if (subject == null)
            {
                throw new NotFoundException($"No subject with id {model.SubjectId}");
            }

            var teacher = await _platformRepository.GetForIdAsync<Teacher>(model.TeacherId);
            if (teacher == null)
            {
                throw new NotFoundException($"No teacher with id {model.TeacherId}");
            }

            // If already added
            if (subject.TeachersSubjects.Select(x => x.TeacherId).Contains(model.TeacherId))
            {
                throw new ConflictException("Teacher is already added to this subject");
            }

            subject.TeachersSubjects.Add(
                new TeacherSubject(teacher, subject));

            await _platformRepository.UpdateAsync(subject);
            return teacher;
        }

        public async Task<Teacher> RemoveTeacherFromSubjectAsync(AddTeacherToSubjectViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var subject = await _subjectsDal.GetSubjectWithTeachersAsync(model.SubjectId);
            var teacher = await _platformRepository.GetForIdAsync<Teacher>(model.TeacherId);

            var connection =
                subject.TeachersSubjects.FirstOrDefault(ts => ts.Teacher == teacher && ts.Subject == subject);

            subject.TeachersSubjects.Remove(connection);
            await _platformRepository.UpdateAsync(subject);

            return teacher;
        }

        public async Task<(IEnumerable<Teacher>, int)> FetchSubjectTeachersAsync(int subjectId, int index,
            int count, bool obsolete)
        {
            var query = _subjectsDal.GetSubjectsTeachers(subjectId);
            if (!obsolete)
            {
                query = query.Where(x => !x.Obsolete);
            }

            var amount = await query.CountAsync();
            var filtered = await query
                .OrderBy(a => a.LastName)
                .Skip(index)
                .Take(count)
                .ToListAsync();
            return (filtered, amount);
        }

        public async Task<(IEnumerable<Subject>, int)> FetchTeacherSubjectsAsync(int teacherId, string search,
            int index, int count)
        {
            var subjects = _platformRepository.FindForName<Subject>(search ?? "")
                .Where(s => s.TeachersSubjects.Select(x => x.TeacherId).Contains(teacherId))
                .Include(s => s.TeachersSubjects)
                .ThenInclude(t => t.Teacher);

            var amount = await subjects.CountAsync();
            var filtered = await subjects
                .OrderBy(a => a.Name)
                .Skip(index)
                .Take(count)
                .ToListAsync();

            return (filtered, amount);
        }

        public async Task<Subject> SignStudentToSubjectAsync(Student student, SubjectSignInModel signModel)
        {
            var subject = await _subjectsDal.GetSubjectWithSemestersAsync(signModel.SubjectId);
            var studentToAdd = await _platformRepository.GetForIdAsync<Student>(student.Id,
                x => x.Include(y => y.Major));
            
            var semester = subject.Semesters.FirstOrDefault(s => s.Password == signModel.Password);
            if(semester == null 
                || semester.Obsolete
                || semester.State != State.Open
                || semester.Major.Id != student.Major.Id)
            {
                throw new ArgumentException("Invalid semester password.");
            }

            studentToAdd.StudentsSemesters.Add(new StudentSemester(student, semester));
            await _platformRepository.UpdateAsync(student);
            return subject;
        }

        public async Task<(IEnumerable<Subject>, int)> FetchStudentsSubjectsAsync(int studentId, string search,
            int index, int count)
        {
            var subjects = _studentsDal.GetStudentSubjects(studentId);

            var amount = await subjects.CountAsync();
            var filtered = await subjects
                .Where(x => x.Name.Contains(search, StringComparison.OrdinalIgnoreCase))
                .OrderBy(a => a.Name)
                .Skip(index)
                .Take(count)
                .ToListAsync();

            return (filtered, amount);
        }

        public Task<IEnumerable<Student>> GetSubjectsStudentsAsync(int subjectId)
        {
            return _subjectsDal.GetSubjectsStudentsAsync(subjectId);
        }

        public async Task<(IEnumerable<Subject>, int)> FindSubjectsForStudentAsync(int studentId, string search, int index, int count)
        {
            var subjects = _studentsDal.GetStudentSubjectsToSign(studentId);

            var amount = await subjects.CountAsync();
            var filtered = await subjects
                .Where(x => x.Name.Contains(search, StringComparison.OrdinalIgnoreCase))
                .OrderBy(a => a.Name)
                .Skip(index)
                .Take(count)
                .ToListAsync();

            return (filtered, amount);
        }
    }
}