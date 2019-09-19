using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;

namespace Platform.Infrastructure.Dal
{
    internal class SubjectsDal : ISubjectsDal
    {
        private readonly PlatformDbContext _dbContext;

        public SubjectsDal(PlatformDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Subject> GetSubjectWithTopicsAsync(int id)
        {
            var subject = await _dbContext.Subjects
                .Include(s => s.Topics)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (subject == null)
            {
                throw new NotFoundException($"No Subject with id {id} found");
            }

            return subject;
        }

        public async Task<Subject> GetSubjectWithTeachersAsync(int id)
        {
            var subject = await _dbContext.Subjects
                .Include(s => s.TeachersSubjects)
                .ThenInclude(ts => ts.Teacher)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (subject == null)
            {
                throw new NotFoundException($"No Subject with id {id} found");
            }

            return subject;
        }

        public async Task<Subject> GetSubjectWithSemestersAsync(int id)
        {
            var subject = await _dbContext.Subjects
                .Include(s => s.Semesters).ThenInclude(x => x.Major)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (subject == null)
            {
                throw new NotFoundException($"No Subject with id {id} found");
            }

            return subject;
        }

        public IQueryable<Semester> GetSubjectsSemesters(int subjectId)
        {
            return _dbContext.Semesters
                .Include(x => x.Major)
                .Include(x => x.Subject)
                .Where(x => x.Subject.Id == subjectId);
        }

        public IQueryable<Teacher> GetSubjectsTeachers(int subjectId)
        {
            return _dbContext.Subjects
                .Include(s => s.TeachersSubjects)
                .ThenInclude(ts => ts.Teacher)
                .Where(s => s.Id == subjectId)
                .SelectMany(s => s.TeachersSubjects)
                .Select(ts => ts.Teacher);
        }

        public IQueryable<Section> GetSectionsForStudent(int studentId, int subjectId)
        {
            var studentSemesters = _dbContext.StudentsSemesters
                .Where(x => x.StudentId == studentId)
                .Select(x => x.Semester)
                .Where(x => x.Subject.Id == subjectId);

            var subjectSections = _dbContext.Sections
                .Include(y => y.StudentsSections)
                .Include(y => y.Topic)
                .Where(x => x.Subject.Id == subjectId);

            var result = subjectSections.Join(studentSemesters, 
            sec => sec.Semester, 
            sem => sem, 
            (sec, sem) => sec);

            return result;
        }
        public IQueryable<Section> GetSectionsForTeacher(int subjectId, int semesterId)
        {
            return _dbContext.Sections
                .Include(y => y.Topic)
                .Include(y => y.Subject)
                .Include(y => y.Semester)
                .Include(y => y.StudentsSections)
                .Where(x => x.Subject.Id == subjectId)
                .Where(x => x.Semester.Id == semesterId);
        }

        public IQueryable<Topic> FetchTopics(int subjectId, string search, bool obsolete, int index, int count)
        {
            return _dbContext.Topics
                .Where(t => obsolete ? true : !t.Obsolete)
                .Where(t => t.Subject.Id == subjectId)
                .Where(t => t.Name.Contains(search, StringComparison.OrdinalIgnoreCase))
                .OrderBy(t => t.Name)
                .Skip(index)
                .Take(count);
        }

        public async Task<IEnumerable<Student>> GetSubjectsStudentsAsync(int subjectId)
        {
            return await _dbContext.StudentsSemesters.Include(ss => ss.Student).Include(ss => ss.Semester)
                .ThenInclude(ss => ss.Subject).Where(ss => ss.Semester.Subject.Id == subjectId).Select(ss => ss.Student)
                .ToListAsync();
        }

        public Task<int> GetTopicsAmountAsync(int subjectId, bool obsolete)
        {
            return _dbContext.Topics
                .Where(t => obsolete ? true : !t.Obsolete)
                .Where(t => t.Subject.Id == subjectId)
                .CountAsync();
        }
    }
}