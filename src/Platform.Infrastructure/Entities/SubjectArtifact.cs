namespace Platform.Infrastructure.Entities
{
    public class SubjectArtifact
    {
        public SubjectArtifact()
        {
        }

        public SubjectArtifact(Subject subject, Artifact artifact)
        {
            Subject = subject;
            Artifact = artifact;
            SubjectId = subject.Id;
            ArtifactId = artifact.Id;
        }

        public Subject Subject { get; set; }
        public int SubjectId { get; set; }
        public Artifact Artifact { get; set; }
        public int ArtifactId { get; set; }
    }
}