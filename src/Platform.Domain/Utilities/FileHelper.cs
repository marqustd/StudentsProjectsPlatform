using System.IO;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Platform.Domain.Utilities
{
    internal sealed class FileHelper : IFileHelper
    {
        public T ReadFile<T>(IFormFile file)
        {
            using (var stream = file.OpenReadStream())
            {
                using (var streamReader = new StreamReader(stream))
                {
                    using (var jsonReader = new JsonTextReader(streamReader))
                    {
                        var models = new JsonSerializer().Deserialize<T>(jsonReader);
                        return models;
                    }
                }
            }
        }
    }
}