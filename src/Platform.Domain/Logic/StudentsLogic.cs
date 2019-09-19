using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.Account;
using Platform.Infrastructure.ViewModels.Grade;
using Platform.Infrastructure.ViewModels.Student;
using Platform.Utilities;
using Platform.Utilities.Utilities;

namespace Platform.Domain.Logic
{
    internal class StudentsLogic : IStudentsLogic
    {
        private readonly IPlatformRepository _platformRepository;
        private readonly IStudentsDal _studentsDal;
        private readonly IUsersCommonLogic _usersCommonLogic;

        public StudentsLogic(IPlatformRepository platformRepository, IUsersCommonLogic usersCommonLogic,
            IStudentsDal studentsDal)
        {
            _platformRepository = platformRepository;
            _usersCommonLogic = usersCommonLogic;
            _studentsDal = studentsDal;
        }

        public async Task<Student> AddStudentAsync(AddStudentViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var student = await _platformRepository.GetStudentForAlbumAsync(model.AlbumNumber);

            if (student != null)
            {
                throw new ConflictException($"Student with album: {model.AlbumNumber} already exists");
            }

            var newStudent = await MapStudentAsync(model);
            await _platformRepository.AddAsync(newStudent);
            return newStudent;
        }

        public async Task<Student> ObsoleteStudentAsync(int id)
        {
            var student = await _platformRepository.GetForIdAsync<Student>(id);
            if (student == null)
            {
                throw new NotFoundException($"No student with id {id}");
            }

            student.Obsolete = true;
            await _platformRepository.UpdateAsync(student);
            return student;
        }

        public Task<Student> GetStudentAsync(int id)
        {
            return _platformRepository.GetForIdAsync<Student>(id);
        }

        public async Task<Tuple<IEnumerable<Student>, int>> FetchStudentsAsync(string search, int index, int count,
            bool obsolete)
        {
            Require.NotNull(search, nameof(search));
            var students = _platformRepository.FindUserForFullName<Student>(search);
            if (obsolete)
            {
                var amount = await students.CountAsync();
                var filtered = await students
                    .OrderBy(a => a.LastName)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return new Tuple<IEnumerable<Student>, int>(filtered, amount);
            }
            else
            {
                var amount = await students.Where(s => !s.Obsolete).CountAsync();
                var filtered = await students.Where(s => !s.Obsolete)
                    .OrderBy(a => a.LastName)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return new Tuple<IEnumerable<Student>, int>(filtered, amount);
            }
        }

        public async Task<Student> EditStudentAsync(EditStudentViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var student = await _platformRepository.GetForIdAsync<Student>(editModel.Id);

            if (!string.IsNullOrWhiteSpace(editModel.Email))
            {
                if (!EmailVerifier.IsFormatCorrect(editModel.Email))
                {
                    throw new ArgumentException("Wrong email format", nameof(editModel.Email));
                }

                var model = new SystemIdEmailModel
                {
                    Email = editModel.Email,
                    SystemId = student.SystemId
                };
                if (student.Verified)
                {
                    await _usersCommonLogic.ChangeEmailAsync(model);
                    student.Email = editModel.Email;
                }
            }

            student.FirstName = editModel.FirstName ?? student.FirstName;
            student.LastName = editModel.LastName ?? student.LastName;
            await _platformRepository.UpdateAsync(student);
            return student;
        }

        public async Task<Student> RestoreStudentAsync(int id)
        {
            var student = await _platformRepository.GetForIdAsync<Student>(id);
            if (student == null)
            {
                throw new NotFoundException($"No Student with id {id}");
            }

            if (!student.Obsolete)
            {
                throw new ConflictException($"Student with id {id} is not obsoleted");
            }

            student.Obsolete = false;
            await _platformRepository.UpdateAsync(student);
            return student;
        }

        public async Task<GradeViewModel> GradeStudentAsync(GradeStudentViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var studentSection = await _studentsDal.GetStudentSectionAsync(model.StudentId, model.SectionId);
            var grade = model.Grade;
            if (grade <= 1 || grade >= 6)
            {
                throw new ArgumentException("Grade has to be between 2 and 5");
            }

            studentSection.Grade = model.Grade;
            await _platformRepository.SaveChanges();
            return new GradeViewModel
            {
                StudentId = studentSection.StudentId,
                Name = studentSection.Student.FullName,
                Grade = grade
            };
        }

        public async Task<int> ImportStudentsAsync(IEnumerable<AddStudentViewModel> studentViewModels)
        {
            var students = new List<Student>();
            foreach (var student in studentViewModels)
            {
                students.Add(await MapStudentAsync(student));
            }

            await _platformRepository.AddRangeAsync(students.ToArray());

            return students.Count;
        }

        private async Task<Student> MapStudentAsync(AddStudentViewModel model)
        {
            var major = await _platformRepository.GetForIdAsync<Major>(model.MajorId);
            return new Student
            {
                Major = major,
                AlbumNumber = model.AlbumNumber,
                Verified = false,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Obsolete = false
            };
        }

        public Task<bool> CheckIfStudentIsInSection(int studentId, int sectionId)
        {
            return _studentsDal.CheckIfStudentIsInSection(studentId, sectionId);
        }

        public Task<int?> GetStudentSignedSectionId(int studentId, int subjectId)
        {
            return _studentsDal.GetStudentSignedSectionId(studentId, subjectId);
        }

        public Task<int?> GetSectionGradeForStudent(int studentId, int sectionId)
        {
            return _studentsDal.GetSectionGradeForStudent(studentId, sectionId);

        }
    }
}