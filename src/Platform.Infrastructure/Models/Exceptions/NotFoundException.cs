using System;

namespace Platform.Infrastructure.Models.Exceptions
{
    public class NotFoundException : ArgumentException
    {
        public NotFoundException(string message) : base(message)
        {
        }
    }
}