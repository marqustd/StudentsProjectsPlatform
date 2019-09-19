using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Platform.Infrastructure.Entities.Configurations
{
    public class StudentSemesterEntityConfiguration : IEntityTypeConfiguration<StudentSemester>
    {
        public void Configure(EntityTypeBuilder<StudentSemester> builder)
        {
            builder.HasKey(ss => new {ss.SemesterId, ss.StudentId});
            builder.HasOne(ss => ss.Student)
                .WithMany(s => s.StudentsSemesters)
                .HasForeignKey(ss => ss.StudentId);
            builder.HasOne(ss => ss.Semester)
                .WithMany(s => s.StudentsSemesters)
                .HasForeignKey(ss => ss.SemesterId);
        }
    }
}