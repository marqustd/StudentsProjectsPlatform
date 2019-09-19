using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels.Student
{
    public class AddStudentViewModel : IViewModelVerify
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int MajorId { get; set; }
        public int AlbumNumber { get; set; }
    }
}