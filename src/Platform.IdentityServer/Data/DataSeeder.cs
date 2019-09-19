using System;
using System.Linq;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Platform.IdentityServer.Models;
using Platform.Infrastructure.Models;

namespace Platform.IdentityServer.Data
{
    public class DataSeeder
    {
        public static void InitializeDatabase(IServiceProvider service)
        {
            var config = new Config(service.GetRequiredService<IConfiguration>());
            var context = service.GetRequiredService<ConfigurationDbContext>();

            if (!context.Clients.Any())
            {
                foreach (var client in config.GetClients())
                {
                    context.Clients.Add(client.ToEntity());
                }

                context.SaveChanges();
            }

            if (!context.IdentityResources.Any())
            {
                foreach (var resource in config.GetIdentityResources())
                {
                    context.IdentityResources.Add(resource.ToEntity());
                }

                context.SaveChanges();
            }

            if (!context.ApiResources.Any())
            {
                foreach (var resource in config.GetApis())
                {
                    context.ApiResources.Add(resource.ToEntity());
                }

                context.SaveChanges();
            }
        }

        public static void SeedUsers(IServiceProvider service)
        {
            SeedRoles(service);
            SeedAdmin(service);
            SeedTeacher(service);
        }

        private static void SeedTeacher(IServiceProvider service)
        {
            var email = "teacher@local.host";
            var roleManager = service.GetRequiredService<UserManager<AppUser>>();
            var teacher = roleManager.FindByEmailAsync(email).Result;
            if (teacher == null)
            {
                teacher = new AppUser
                {
                    Id = "1",
                    Email = email,
                    EmailConfirmed = true,
                    UserName = email
                };
                teacher.PasswordHash = roleManager.PasswordHasher.HashPassword(teacher, "Teacher1");

                roleManager.CreateAsync(teacher).Wait();
                roleManager.AddToRoleAsync(teacher, SystemRoles.Teacher.ToString()).Wait();
            }
        }

        private static void SeedAdmin(IServiceProvider service)
        {
            var email = "admin@local.host";
            var roleManager = service.GetRequiredService<UserManager<AppUser>>();
            var admin = roleManager.FindByEmailAsync(email).Result;
            if (admin == null)
            {
                admin = new AppUser
                {
                    Id = "0",
                    Email = email,
                    EmailConfirmed = true,
                    UserName = email
                };
                admin.PasswordHash = roleManager.PasswordHasher.HashPassword(admin, "Admin1");

                roleManager.CreateAsync(admin).Wait();
                roleManager.AddToRoleAsync(admin, SystemRoles.Admin.ToString()).Wait();
            }
        }

        private static void SeedRoles(IServiceProvider service)
        {
            var roleManager = service.GetRequiredService<RoleManager<IdentityRole>>();
            if (roleManager.Roles.Any())
            {
                return;
            }

            foreach (var f in Enum.GetValues(typeof(SystemRoles)))
            {
                roleManager.CreateAsync(new IdentityRole(f.ToString())).Wait();
            }
        }
    }
}