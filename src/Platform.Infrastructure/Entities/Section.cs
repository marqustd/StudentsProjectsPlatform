using System.Collections.Generic;
using Platform.Infrastructure.Models;

namespace Platform.Infrastructure.Entities
{
    public sealed class Section : PlatformEntityWithName
    {
        public Topic Topic { get; set; }
        public Subject Subject { get; set; }
        public Semester Semester { get; set; }
        public State State { get; set; }
        public int Capacity { get; set; }
        public IList<Comment> Comments { get; set; } = new List<Comment>();
        public IList<StudentSection> StudentsSections { get; set; } = new List<StudentSection>();
        public IList<Activity> Activities { get; set; } = new List<Activity>();
    }
}