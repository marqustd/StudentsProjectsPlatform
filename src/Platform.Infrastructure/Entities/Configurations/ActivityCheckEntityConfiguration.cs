using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Platform.Infrastructure.Entities.Configurations
{
    internal class ActivityCheckEntityConfiguration : IEntityTypeConfiguration<ActivityCheck>
    {
        public void Configure(EntityTypeBuilder<ActivityCheck> builder)
        {
            builder.HasKey(x => new {x.ActivityId, x.StudentId});
            builder.HasOne(x => x.Activity)
                .WithMany(x => x.ActivityToCheck)
                .HasForeignKey(x => x.ActivityId);
            builder.HasOne(x => x.Student)
                .WithMany()
                .HasForeignKey(x => x.StudentId);
        }
    }
}