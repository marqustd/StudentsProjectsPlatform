using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels.Subject
{
    public class AddSubjectViewModel : IViewModelVerify
    {
        public string Name { get; set; }
        public int TeacherId { get; set; }
    }
}