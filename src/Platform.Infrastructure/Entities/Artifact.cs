using System;

namespace Platform.Infrastructure.Entities
{
    public sealed class Artifact : PlatformEntityWithName
    {
        public Artifact()
        {
        }

        public Artifact(string guid, string name, string contentType)
        {
            ContentType = contentType;
            Name = name;
            Guid = guid;
            RefreshUpdateOn();
        }

        public string Guid { get; set; }

        public string ContentType { get; set; }

        public DateTime UpdatedOn { get; private set; }
        public User Author { get; set; }

        public void RefreshUpdateOn()
        {
            UpdatedOn = DateTime.UtcNow;
        }
    }
}