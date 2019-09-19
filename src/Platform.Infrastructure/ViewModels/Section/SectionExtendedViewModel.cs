using System;
using System.Collections.Generic;
using System.Text;

namespace Platform.Infrastructure.ViewModels.Section
{
    public sealed class SectionExtendedViewModel
    {
        public int SectionId { get; set; }
        public string Name { get; set; }
        public int? Grade { get; set; }
        public int Capacity { get; set; }
        public int MembersCount { get; set; }
        public int TopicId { get; set; }
        public string TopicName { get; set; }
        public string TopicDescription { get; set; }
        public bool IsSignedIn { get; set; }
    }
}
