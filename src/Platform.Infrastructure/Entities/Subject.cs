using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Platform.Infrastructure.Entities
{
    public sealed class Subject : PlatformEntityWithName
    {
        public IList<TeacherSubject> TeachersSubjects { get; set; } = new List<TeacherSubject>();
        public IList<Topic> Topics { get; set; } = new List<Topic>();
        public IList<Semester> Semesters { get; set; } = new List<Semester>();

        public IList<SubjectArtifact> SubjectToArtifacts { get; set; } = new List<SubjectArtifact>();

        [MaxLength(500)]
        public string Description { get; set; }
    }
}