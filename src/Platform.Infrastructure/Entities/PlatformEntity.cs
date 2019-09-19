using System.ComponentModel.DataAnnotations;

namespace Platform.Infrastructure.Entities
{
    public abstract class PlatformEntity
    {
        [Key]
        public int Id { get; set; }

        public bool Obsolete { get; set; }
    }
}