using System;

namespace Platform.Infrastructure.Entities
{
    public sealed class Comment : PlatformEntity
    {
        public User Author { get; set; }
        public DateTime DateTime { get; set; }
        public string Content { get; set; }
    }
}