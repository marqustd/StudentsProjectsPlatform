using System.Collections.Generic;

namespace Platform.Infrastructure.Entities
{
    public sealed class Teacher : User
    {
        public IList<TeacherSubject> TeachersSubjects { get; set; } = new List<TeacherSubject>();
    }
}