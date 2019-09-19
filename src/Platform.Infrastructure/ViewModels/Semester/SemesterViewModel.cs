namespace Platform.Infrastructure.ViewModels.Semester
{
    public sealed class SemesterViewModel
    {
        public int SemesterId { get; set; }
        public string SemesterName { get; set; }
        public string MajorName { get; set; }
        public int MajorId { get; set; }
        public int State { get; set; }
        public string Password { get; set; }
        public bool Obsolete { get; set; }
    }
}