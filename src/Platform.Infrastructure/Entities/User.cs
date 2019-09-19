using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Platform.Infrastructure.Entities
{
    public abstract class User : PlatformEntity
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Email { get; set; }

        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";

        public string SystemId { get; set; }
    }
}