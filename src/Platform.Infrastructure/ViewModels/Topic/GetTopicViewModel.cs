using Platform.Infrastructure.ViewModels.Helpers;
using Platform.Infrastructure.ViewModels.Helpers.Attributes;

namespace Platform.Infrastructure.ViewModels.Topic
{
    public class GetTopicViewModel : IViewModelVerify
    {
        [PositiveNumber]
        public int SubjectId { get; set; }

        [PositiveNumber]
        public int TopicId { get; set; }
    }
}