using Microsoft.AspNetCore.Identity;

namespace Platform.IdentityServer.Models
{
    public class AppUser : IdentityUser
    {
        public string GoogleId { get; set; }
        public bool HasGoogleOrigin { get; set; } = false;
    }
}