using System.Threading.Tasks;
using Platform.Infrastructure.Entities;

namespace Platform.Infrastructure.Dal
{
    public interface ISemestersDal
    {
        Task<Semester> GetSemesterWithSectionsAsync(int semesterId);
    }
}