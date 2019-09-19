using System.Linq;
using System.Reflection;
using AutoMapper;

namespace Platform.API.AutoMapper
{
    public static class AutoMapperInitializer
    {
        public static void Initialize()
        {
            var profiles = Assembly
                .GetExecutingAssembly()
                .GetTypes()
                .Where(t => t.IsSubclassOf(typeof(Profile)));

            Mapper.Initialize(mapper => { profiles.ToList().ForEach(p => mapper.AddProfile(p)); });
        }
    }
}