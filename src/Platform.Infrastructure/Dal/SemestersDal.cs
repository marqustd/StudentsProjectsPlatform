using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;

namespace Platform.Infrastructure.Dal
{
    internal class SemestersDal : ISemestersDal
    {
        private readonly PlatformDbContext _dbContext;

        public SemestersDal(PlatformDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Semester> GetSemesterWithSectionsAsync(int semesterId)
        {
            return _dbContext.Semesters
                .AsNoTracking()
                .Include(s => s.Sections)
                .ThenInclude(s => s.StudentsSections)
                .ThenInclude(ss => ss.Student)
                .Include(s => s.Major)
                .Include(s => s.Subject)
                .FirstOrDefaultAsync(s => s.Id == semesterId);
        }
    }
}