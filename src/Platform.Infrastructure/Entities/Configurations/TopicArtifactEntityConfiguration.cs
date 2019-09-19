using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Platform.Infrastructure.Entities.Configurations
{
    public class TopicArtifactEntityConfiguration : IEntityTypeConfiguration<TopicArtifact>
    {
        public void Configure(EntityTypeBuilder<TopicArtifact> builder)
        {
            builder.HasKey(x => new {x.ArtifactId, x.TopicId});
            builder.HasOne(x => x.Topic)
                .WithMany(x => x.TopicToArtifact)
                .HasForeignKey(x => x.TopicId);
            builder.HasOne(x => x.Artifact)
                .WithMany()
                .HasForeignKey(x => x.ArtifactId);
        }
    }
}