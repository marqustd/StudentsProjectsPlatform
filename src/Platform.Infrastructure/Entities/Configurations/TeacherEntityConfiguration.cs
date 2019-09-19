using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Platform.Infrastructure.Entities.Configurations
{
    public class TeacherEntityConfiguration : IEntityTypeConfiguration<Teacher>
    {
        public void Configure(EntityTypeBuilder<Teacher> builder)
        {
            builder.HasIndex(t => t.Email).IsUnique();
        }
    }
}