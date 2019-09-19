using System;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Logging;
using Platform.Artifacts.DTO;

namespace Platform.Artifacts.Logic
{
    public class LocalFileRepository : IFileRepository
    {
        private readonly IGuidFactory _guidFactory;
        private readonly ILogger _logger;
        private readonly string _serverPath;

        public LocalFileRepository(IGuidFactory guidFactory) : this(guidFactory, null, null)
        {
        }

        public LocalFileRepository(
            IGuidFactory guidFactory,
            string localPath = null,
            ILogger logger = null)
        {
            _guidFactory = guidFactory;
            _logger = logger;
            _serverPath = (string.IsNullOrWhiteSpace(localPath)
                              ? Directory.GetParent(Environment.CurrentDirectory).FullName
                              : localPath)
                          + @"\Artifacts";
        }

        public ArtifactDto Read(ArtifactInfoDto dto)
        {
            var filePath = Directory.GetFiles(_serverPath, $"{dto.Guid}.data").SingleOrDefault();
            if (string.IsNullOrWhiteSpace(filePath))
            {
                throw new FileNotFoundException($"File with {dto.Guid} guid was not found");
            }

            return new ArtifactDto {File = File.OpenRead(filePath)};
        }

        public ArtifactInfoDto Write(ArtifactDto dto)
        {
            var guid = _guidFactory.Create();
            var filePath = $@"{_serverPath}\{guid}.data";
            while (File.Exists(filePath))
            {
                guid = _guidFactory.Create();
                filePath = $@"{_serverPath}\{guid}.data";
            }

            try
            {
                Directory.CreateDirectory(_serverPath);
                using (var fs = File.Create(filePath))
                {
                    dto.File.CopyTo(fs);
                    fs.Position = 0;
                    fs.Flush(true);
                }
            }
            catch (Exception outerEx)
            {
                _logger?.LogError(outerEx.Message, outerEx.Message);
                try
                {
                    File.Delete(filePath);
                }
                catch (Exception innerEx)
                {
                    _logger?.LogError(innerEx.Message, innerEx.Message);
                    throw;
                }

                throw;
            }

            return new ArtifactInfoDto(guid, dto.FileName, dto.ContentType);
        }
    }
}