using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Platform.IdentityServer.Models;
using Platform.Infrastructure.Models;

namespace Platform.IdentityServer.Services
{
    public class GoogleUserManager
    {
        private readonly UserManager<AppUser> userManager;

        public GoogleUserManager(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<AppUser> Create(string firstName, string lastName, string albumNumber, string googleId,
            string email)
        {
            var user = new AppUser
            {
                GoogleId = googleId,
                HasGoogleOrigin = true,
                UserName = email,
                Email = email,
                EmailConfirmed = true
            };

            try
            {
                if (!(await userManager.CreateAsync(user)).Succeeded ||
                    !(await userManager.AddToRoleAsync(user, SystemRoles.Student.ToString())).Succeeded) 
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }

            return user;
        }
    }
}