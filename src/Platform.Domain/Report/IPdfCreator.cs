using System.IO;
using System.Threading.Tasks;

namespace Platform.Domain.Report
{
    public interface IPdfCreator
    {
        Task<MemoryStream> CreateSemesterReport(int semesterId);
    }
}