namespace Platform.Infrastructure.Entities
{
    public class TopicArtifact
    {
        public TopicArtifact()
        {
        }

        public TopicArtifact(Topic topic, Artifact artifact)
        {
            Topic = topic;
            Artifact = artifact;
        }

        public Topic Topic { get; set; }
        public int TopicId { get; set; }
        public Artifact Artifact { get; set; }
        public int ArtifactId { get; set; }
    }
}