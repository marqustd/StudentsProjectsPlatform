using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;

namespace Platform.Infrastructure.Dal
{
    internal sealed class SectionsDal : ISectionsDal
    {
        private readonly PlatformDbContext _dbContext;

        public SectionsDal(PlatformDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Section> GetSectionWithStudentsAsync(int sectionId)
        {
            var section = await _dbContext.Sections
                .Include(s => s.StudentsSections)
                .ThenInclude(ss => ss.Student)
                .FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null)
            {
                throw new NotFoundException($"No Section with id {sectionId} found");
            }

            return section;
        }

        public async Task<Section> GetSectionWithActivitiesAsync(int sectionId)
        {
            var section = await _dbContext.Sections
                .Include(s => s.Activities)
                .ThenInclude(a => a.ActivityTemplate)
                .FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null)
            {
                throw new NotFoundException($"No Section with id {sectionId} found");
            }

            return section;
        }

        public async Task<IEnumerable<StudentSection>> GetStudentSectionsAsync(int sectionId)
        {
            var studentSections = await _dbContext.StudentSections
                .Include(ss => ss.Student)
                .Where(ss => ss.SectionId == sectionId).ToListAsync();
            if (studentSections.Count < 1)
            {
                throw new NotFoundException($"No Section with id {sectionId} found or section is empty");
            }

            return studentSections;
        }

        public async Task GradeSectionAsync(int sectionId, int grade)
        {
            var section = await _dbContext.Sections
                .Include(x => x.StudentsSections)
                .ThenInclude(y => y.Student)
                .FirstOrDefaultAsync(x => x.Id.Equals(sectionId));

            if (section == null || section.StudentsSections.Count < 1)
            {
                throw new NotFoundException($"No Section with id {sectionId} found or section is empty");
            }

            var studentSections = section.StudentsSections.ToList();
            studentSections.ForEach(x => x.Grade = grade);
            _dbContext.SaveChanges();
        }

        public Task<Section> GetSectionAsync(int subjectId, int semesterId, int sectionId)
        {
            var section = _dbContext.Sections
                .Where(x => x.Id == sectionId)
                .Where(x => x.Semester.Id == semesterId)
                .Where(x => x.Subject.Id == subjectId)
                .FirstAsync();

            return section;
        }

        public async Task<IEnumerable<Student>> SearchNewStudents(int semesterId, string search)
        {
            const int studentsAmount = 5;
            var studentsInSem= _dbContext.StudentsSemesters
                .Where(x => x.SemesterId == semesterId)
                .Select(x=>x.Student);

            var studentsWithSection = _dbContext.StudentSections
                .Where(x => x.Semester.Id == semesterId)
                .Select(x => x.Student);

            var studentsWithoutSection = await studentsInSem.Except(studentsWithSection)
                .Where(x => x.FullName.Contains(search, System.StringComparison.OrdinalIgnoreCase))
                .OrderBy(x => x.FullName)
                .Take(studentsAmount)
                .ToListAsync();

            return studentsWithoutSection;
        }
    }
}