using Platform.Infrastructure.Models;

namespace Platform.Infrastructure.ViewModels
{
    public sealed class ChangeStateViewModel
    {
        public int State { get; set; }
        public int SemesterId { get; set; }
    }
}