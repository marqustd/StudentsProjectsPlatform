using Microsoft.AspNetCore.Http;

namespace Platform.Domain.Utilities
{
    public interface IFileHelper
    {
        T ReadFile<T>(IFormFile file);
    }
}