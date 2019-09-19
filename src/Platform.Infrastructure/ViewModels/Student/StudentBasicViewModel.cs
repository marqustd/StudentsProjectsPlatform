using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels.Student
{
    public class StudentBasicViewModel : IViewModelVerify
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
    }
}