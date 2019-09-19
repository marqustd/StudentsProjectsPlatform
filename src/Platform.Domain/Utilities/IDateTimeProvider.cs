using System;
using Platform.Infrastructure.Models;

namespace Platform.Domain.Utilities
{
    public interface IDateTimeProvider
    {
        DateTime Now { get; }
        DateTime UtcNow { get; }
        DateTime Today { get; }
        DateTime MinValue { get; }
        DateTime MaxValue { get; }
        Season SeasonNow { get; }
    }
}