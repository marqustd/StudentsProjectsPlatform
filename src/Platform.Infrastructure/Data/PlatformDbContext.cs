using Microsoft.EntityFrameworkCore;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Entities.Configurations;

namespace Platform.Infrastructure.Data
{
    public class PlatformDbContext : DbContext
    {
        public PlatformDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Artifact> Artifacts { get; set; }
        public DbSet<Major> Majors { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<TeacherSubject> TeachersSubjects { get; set; }
        public DbSet<Semester> Semesters { get; set; }
        public DbSet<StudentSemester> StudentsSemesters { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityCheck> ActivityChecks { get; set; }
        public DbSet<ActivityTemplate> ActivityTemplates { get; set; }
        public DbSet<StudentSection> StudentSections { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .ApplyConfiguration(new StudentEntityConfiguration())
                .ApplyConfiguration(new TeacherEntityConfiguration())
                .ApplyConfiguration(new AdminEntityConfiguration())
                .ApplyConfiguration(new ArtifactEntityTypeConfiguration())
                .ApplyConfiguration(new SubjectArtifactEntityConfiguration())
                .ApplyConfiguration(new TopicArtifactEntityConfiguration())
                .ApplyConfiguration(new TeacherSubjectEntityConfiguration())
                .ApplyConfiguration(new StudentSemesterEntityConfiguration())
                .ApplyConfiguration(new StudentSectionEntityConfiguration())
                .ApplyConfiguration(new ActivityCheckEntityConfiguration());
        }
    }
}