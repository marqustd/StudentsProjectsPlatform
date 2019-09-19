using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;

namespace Platform.Infrastructure.Dal
{
    internal sealed class StudentsDal : IStudentsDal
    {
        private readonly PlatformDbContext _dbContext;

        public StudentsDal(PlatformDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Student> GetStudentWithSectionsAsync(int id)
        {
            var student = await _dbContext.Students
                .Include(s => s.StudentsSections).ThenInclude(ss => ss.Section)
                .Include(s => s.StudentsSections).ThenInclude(ss => ss.Semester)
                .Include(s => s.StudentsSections).ThenInclude(ss => ss.Topic)
                .Include(s => s.StudentsSections).ThenInclude(ss => ss.Subject)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (student == null)
            {
                throw new NotFoundException($"No Student with id {id} found");
            }

            return student;
        }

        public async Task<StudentSection> GetStudentSectionAsync(int studentId, int sectionId)
        {
            var studentSection = await _dbContext.StudentSections.Include(ss => ss.Student)
                .FirstOrDefaultAsync(ss => ss.SectionId == sectionId && ss.StudentId == studentId);
            if (studentSection == null)
            {
                throw new NotFoundException(
                    $"No Student with id {studentId} is assigned to section with id {sectionId}");
            }

            return studentSection;
        }

        public IQueryable<Subject> GetStudentSubjects(int studentId)
        {
            return _dbContext.Subjects
                .Include(x => x.TeachersSubjects).ThenInclude(x => x.Teacher)
                .Include(x => x.Semesters).ThenInclude(x => x.StudentsSemesters)
                .Where(x => !x.Obsolete)
                .Where(x => x.Semesters
                                .SelectMany(y => y.StudentsSemesters.Select(z => z))
                                .Any(s => s.StudentId == studentId));
        }

        public IQueryable<Subject> GetStudentSubjectsToSign(int studentId)
        {
            return _dbContext.Subjects
                .Include(x => x.TeachersSubjects).ThenInclude(x => x.Teacher)
                .Include(x => x.Semesters).ThenInclude(x => x.StudentsSemesters)
                .Where(x => !x.Obsolete)
                .Where(x => x.Semesters
                                .SelectMany(y => y.StudentsSemesters.Select(z => z))
                                .All(s => s.StudentId != studentId));

        }

        public Task<bool> CheckIfStudentIsInSection(int studentId, int sectionId)
        {
            return _dbContext.StudentSections
                .Where(x => x.StudentId == studentId)
                .Where(x => x.SectionId == sectionId)
                .AnyAsync();
        }

        public Task<Section> GetSectionForStudentAsync(int subjectId, int sectionId)
        {
            return _dbContext.Sections
                .Where(x => x.Id == sectionId)
                .Where(x => x.Subject.Id == subjectId)
                .Include(x => x.Topic)
                .SingleOrDefaultAsync();
        }

        public async Task<int?> GetStudentSignedSectionId(int studentId, int subjectId)
        {
            return (await _dbContext.Sections
                .Where(x => x.Subject.Id == subjectId)
                .Where(x => x.StudentsSections.Any(y => y.StudentId == studentId))
                .SingleOrDefaultAsync())?.Id;
        }

        public async Task<int?> GetSectionGradeForStudent(int studentId, int sectionId)
        {
            var studentSection = await _dbContext.StudentSections
                .Where(x => x.StudentId == studentId)
                .FirstOrDefaultAsync(x => x.SectionId == sectionId);

            return studentSection?.Grade;
        }
    }
}