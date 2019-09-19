namespace Platform.Infrastructure.Entities
{
    public sealed class StudentSemester
    {
        public StudentSemester()
        {
        }

        public StudentSemester(Student student, Semester semester)
        {
            Semester = semester;
            Student = student;
        }

        public Student Student { get; set; }
        public int StudentId { get; set; }
        public Semester Semester { get; set; }
        public int SemesterId { get; set; }
    }
}