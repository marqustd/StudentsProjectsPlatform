using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Platform.Infrastructure.Entities.Configurations
{
    public class SubjectArtifactEntityConfiguration : IEntityTypeConfiguration<SubjectArtifact>
    {
        public void Configure(EntityTypeBuilder<SubjectArtifact> builder)
        {
            builder.HasKey(x => new {x.ArtifactId, x.SubjectId});
            builder.HasOne(x => x.Subject)
                .WithMany(x => x.SubjectToArtifacts)
                .HasForeignKey(x => x.SubjectId);
            builder.HasOne(x => x.Artifact)
                .WithMany()
                .HasForeignKey(x => x.ArtifactId);
        }
    }
}