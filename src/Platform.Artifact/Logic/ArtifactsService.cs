using System.Collections.Generic;
using System.Linq;
using Platform.Artifacts.DTO;
using Platform.Artifacts.Exceptions;

namespace Platform.Artifacts.Logic
{
    public class ArtifactsService
    {
        private readonly IFileRepository _fileRepo;
        private readonly long _maxFileLength = 10000000; // 10 MB

        private readonly IEnumerable<string> _validExtensions = new[]
        {
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
            "application/pdf",
            "application/zip",
            "application/x-7z-compressed",
            "application/x-rar-compressed"
        };

        public ArtifactsService(
            IFileRepository fileRepo,
            long? maxFileSize = null,
            string[] validExtensions = null)
        {
            _fileRepo = fileRepo;

            if (maxFileSize.HasValue)
            {
                _maxFileLength = maxFileSize.Value;
            }

            if (validExtensions != null)
            {
                _validExtensions = validExtensions;
            }
        }

        /// <param name="dto">Data transfer object</param>
        /// <exception cref="FileSizeException"></exception>
        /// <exception cref="ContentTypeException"></exception>
        public ArtifactInfoDto Add(ArtifactDto dto)
        {
            if (!_validExtensions.Contains(dto.ContentType))
            {
                throw new ContentTypeException();
            }

            if (dto.File.Length > _maxFileLength)
            {
                throw new FileSizeException();
            }

            return _fileRepo.Write(dto);
        }

        public ArtifactDto Get(ArtifactInfoDto dto)
        {
            return _fileRepo.Read(dto);
        }
    }
}