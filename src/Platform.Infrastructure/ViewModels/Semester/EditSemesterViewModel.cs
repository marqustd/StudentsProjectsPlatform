using Platform.Infrastructure.Models;

namespace Platform.Infrastructure.ViewModels.Semester
{
    public sealed class EditSemesterViewModel
    {
        public int Id { get; set; }
        public State? State { get; set; }
        public string Password { get; set; }
    }
}