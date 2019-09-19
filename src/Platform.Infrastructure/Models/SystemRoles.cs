using System.ComponentModel.DataAnnotations;

namespace Platform.Infrastructure.Models
{
    public enum SystemRoles
    {
        [Display(Name = "Admin")] Admin,
        [Display(Name = "Student")] Student,
        [Display(Name = "Teacher")] Teacher
    }
}