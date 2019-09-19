using System.ComponentModel.DataAnnotations;

namespace Platform.Infrastructure.Entities
{
    public abstract class PlatformEntityWithName : PlatformEntity
    {
        [Required]
        public string Name { get; set; }
    }
}