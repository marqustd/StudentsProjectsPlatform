using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Platform.Infrastructure.Entities.Configurations
{
    public class StudentSectionEntityConfiguration : IEntityTypeConfiguration<StudentSection>
    {
        public void Configure(EntityTypeBuilder<StudentSection> builder)
        {
            builder.HasKey(ss => new {ss.SectionId, ss.StudentId});
            builder.HasOne(ss => ss.Student)
                .WithMany(s => s.StudentsSections)
                .HasForeignKey(ss => ss.StudentId);
            builder.HasOne(ss => ss.Section)
                .WithMany(s => s.StudentsSections)
                .HasForeignKey(ss => ss.SectionId);
        }
    }
}