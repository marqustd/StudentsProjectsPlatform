using System;

namespace Platform.Infrastructure.Models.Exceptions
{
    public class ConflictException : ArgumentException
    {
        public ConflictException(string message) : base(message)
        {
        }
    }
}