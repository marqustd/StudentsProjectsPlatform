using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels.Subject
{
    public class SubjectViewModel : IViewModelVerify
    {
        public int SubjectId { get; set; }
        public string Name { get; set; }
        public string TeacherName { get; set; }
        public int TeacherId { get; set; }
        public bool IsObsolete { get; set; }
        public string Description { get; set; }
    }
}