using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels.Subject
{
    public class EditSubjectViewModel : IViewModelVerify
    {
        public int SubjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}