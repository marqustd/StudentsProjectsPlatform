using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Platform.Infrastructure.Entities.Configurations
{
    public class ArtifactEntityTypeConfiguration : IEntityTypeConfiguration<Artifact>
    {
        public void Configure(EntityTypeBuilder<Artifact> builder)
        {
            builder.HasQueryFilter(a => !a.Obsolete)
                .Property(a => a.UpdatedOn)
                .HasDefaultValueSql("GetUtcDate()");
            //.ValueGeneratedOnAddOrUpdate() // todo test if fixed
        }
    }
}