using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Platform.Infrastructure.Entities.Configurations
{
    public class AdminEntityConfiguration : IEntityTypeConfiguration<Admin>
    {
        public void Configure(EntityTypeBuilder<Admin> builder)
        {
            builder.HasIndex(a => a.Email).IsUnique();
        }
    }
}