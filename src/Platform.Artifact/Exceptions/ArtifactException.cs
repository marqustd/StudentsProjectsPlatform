using System;

namespace Platform.Artifacts.Exceptions
{
    public class ArtifactException : Exception
    {
        public ArtifactException()
        {
        }

        public ArtifactException(string message) : base(message)
        {
        }

        public ArtifactException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}