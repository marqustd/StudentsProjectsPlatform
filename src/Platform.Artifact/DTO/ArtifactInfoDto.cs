namespace Platform.Artifacts.DTO
{
    public class ArtifactInfoDto
    {
        public ArtifactInfoDto()
        {
        }

        public ArtifactInfoDto(string guid, string fileName, string contentType)
        {
            ContentType = contentType;
            Guid = guid;
            FileName = fileName;
        }

        public string Guid { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
    }
}