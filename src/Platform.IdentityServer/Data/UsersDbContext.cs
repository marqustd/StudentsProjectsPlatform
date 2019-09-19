using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Platform.IdentityServer.Models;

namespace Platform.IdentityServer.Data
{
    public class UsersDbContext : IdentityDbContext<AppUser>
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}