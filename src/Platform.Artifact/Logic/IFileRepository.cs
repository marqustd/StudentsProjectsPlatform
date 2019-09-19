using Platform.Artifacts.DTO;

namespace Platform.Artifacts.Logic
{
    public interface IFileRepository
    {
        ArtifactInfoDto Write(ArtifactDto dto);

        ArtifactDto Read(ArtifactInfoDto dto);
    }
}