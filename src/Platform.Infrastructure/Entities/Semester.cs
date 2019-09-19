using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Platform.Infrastructure.Models;

namespace Platform.Infrastructure.Entities
{
    public sealed class Semester : PlatformEntity
    {
        public IList<StudentSemester> StudentsSemesters { get; set; } = new List<StudentSemester>();
        public Subject Subject { get; set; }
        public State State { get; set; }
        public string Password { get; set; } //todo hash it
        public Major Major { get; set; }
        public Season Season { get; set; }
        public int Year { get; set; }
        public IList<Section> Sections { get; set; } = new List<Section>();

        [NotMapped]
        public string Name => $"{Major?.Name} {Subject?.Name} {Season} {Year}";

        public override string ToString()
        {
            return $"{Subject?.Name} for {Major?.Name} on {Season} {Year}";
        }
    }
}