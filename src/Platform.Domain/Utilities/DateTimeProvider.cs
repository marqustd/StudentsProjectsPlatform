using System;
using Platform.Infrastructure.Models;

namespace Platform.Domain.Utilities
{
    internal class DateTimeProvider : IDateTimeProvider
    {
        public DateTime Now => DateTime.Now;
        public DateTime UtcNow => DateTime.UtcNow;
        public DateTime Today => DateTime.Today;
        public DateTime MinValue => DateTime.MinValue;
        public DateTime MaxValue => DateTime.MaxValue;

        public Season SeasonNow => Today.Month > 2 ? Season.Summer : Season.Winter;
    }
}