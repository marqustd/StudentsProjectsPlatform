using Microsoft.EntityFrameworkCore;
using Platform.Infrastructure.Data;

namespace Platform.Domain.Tests
{
    internal static class TestsUtilities
    {
        public static PlatformDbContext MakeContext(string name)
        {
            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase(name)
                .Options;
            return new PlatformDbContext(options);
        }
    }
}