using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels.User
{
    public class EditUserViewModel : IViewModelVerify
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}