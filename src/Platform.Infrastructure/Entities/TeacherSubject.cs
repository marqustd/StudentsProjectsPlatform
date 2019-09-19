namespace Platform.Infrastructure.Entities
{
    public sealed class TeacherSubject
    {
        public TeacherSubject(Teacher teacher, Subject subject)
        {
            Teacher = teacher;
            Subject = subject;
        }

        public TeacherSubject()
        {
        }

        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}