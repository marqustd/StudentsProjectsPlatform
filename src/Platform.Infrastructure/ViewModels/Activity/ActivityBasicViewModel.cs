using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels.Activity
{
    public class ActivityBasicViewModel : IViewModelVerify
    {
        public int ActivityId { get; set; }
        public string Name { get; set; }
    }
}