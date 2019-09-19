using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Platform.Infrastructure.Entities;

namespace Platform.Infrastructure.Data
{
    public static class DataSeeder
    {
        public static void Seed(IServiceProvider serviceProvider)
        {
            SeedMajors(serviceProvider);
            SeedUsers(serviceProvider);
        }

        private static void SeedMajors(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<PlatformDbContext>();
            if (!context.Majors.Any())
            {
                context.Add(new Major {Name = "Informatyka", Obsolete = false});
                context.SaveChanges();
            }
        }


        private static void SeedUsers(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<PlatformDbContext>();
            var added = false;
            if (!context.Students.Any())
            {
                var student = new Student
                {
                    AlbumNumber = 123456,
                    FirstName = "Test",
                    LastName = "Student",
                    Email = "student@local.host",
                    Major = context.Majors.FirstOrDefault()
                };
                context.Students.Add(student);
                added = true;
            }

            if (!context.Admins.Any())
            {
                var admin = new Admin
                {
                    SystemId = "0",
                    Email = "admin@local.host",
                    FirstName = "Test",
                    LastName = "Admin"
                };
                context.Admins.Add(admin);
                added = true;
            }

            if (!context.Teachers.Any())
            {
                var teacher = new Teacher
                {
                    SystemId = "1",
                    Email = "teacher@local.host",
                    FirstName = "Test",
                    LastName = "Teacher"
                };
                context.Teachers.Add(teacher);
                added = true;
            }

            if (added)
            {
                context.SaveChanges();
            }
        }
    }
}