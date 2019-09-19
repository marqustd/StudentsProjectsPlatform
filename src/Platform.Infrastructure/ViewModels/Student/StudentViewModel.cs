using Platform.Infrastructure.ViewModels.Helpers;
using Platform.Infrastructure.ViewModels.Helpers.Attributes;
using Platform.Infrastructure.ViewModels.User;

namespace Platform.Infrastructure.ViewModels.Student
{
    public class StudentViewModel : UserViewModel, IViewModelVerify
    {
        [AllowRange(100000, 999999)]
        public int AlbumNumber { get; set; }

        [PositiveNumber]
        public int MajorId { get; set; }
    }
}