using System;
using System.IO;

namespace Platform.Artifacts.DTO
{
    public class ArtifactDto : IDisposable
    {
        public Stream File { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }

        public void Dispose()
        {
            File?.Dispose();
        }
    }
}