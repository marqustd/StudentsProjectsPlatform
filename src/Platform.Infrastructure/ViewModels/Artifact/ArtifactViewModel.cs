using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels.Artifact
{
    public class ArtifactViewModel : IViewModelVerify
    {
        public int ArtifactId { get; set; }
        public string Name { get; set; }
    }
}