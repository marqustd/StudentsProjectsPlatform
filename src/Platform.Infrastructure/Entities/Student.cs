using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Platform.Infrastructure.Entities
{
    public sealed class Student : User
    {
        public bool Verified { get; set; } = false;

        [Required]
        public int AlbumNumber { get; set; }

        [Required]
        public Major Major { get; set; }

        public IList<StudentSemester> StudentsSemesters { get; set; } = new List<StudentSemester>();
        public IList<StudentSection> StudentsSections { get; set; } = new List<StudentSection>();
    }
}