using Platform.Infrastructure.Models;

namespace Platform.Infrastructure.ViewModels.Account
{
    public class RegisterViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int AlbumNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool Agree { get; set; }
        public SystemRoles Role { get; set; }
    }
}