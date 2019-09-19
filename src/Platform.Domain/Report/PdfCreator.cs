using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using Platform.Infrastructure.Dal;
using Spire.Pdf;
using Spire.Pdf.Graphics;

namespace Platform.Domain.Report
{
    internal class PdfCreator : IPdfCreator
    {
        private readonly PdfSolidBrush _brush = new PdfSolidBrush(Color.Black);
        private readonly PdfDocument _doc;
        private readonly PdfFont _font = new PdfFont(PdfFontFamily.Helvetica, 10f);
        private readonly float _maxHeight;
        private readonly ISemestersDal _semestersDal;
        private float _height = 10f;
        private PdfPageBase _page;

        public PdfCreator(ISemestersDal semestersDal)
        {
            _semestersDal = semestersDal;

            _doc = new PdfDocument();
            _page = _doc.Pages.Add();
            _maxHeight = _page.Size.Height;
        }

        public async Task<MemoryStream> CreateSemesterReport(int semesterId)
        {
            var semester = await _semestersDal.GetSemesterWithSectionsAsync(semesterId);
            Write($"End Report for: {semester}");
            foreach (var s in semester.Sections)
            {
                foreach (var ss in s.StudentsSections)
                {
                    var grade = ss.Grade.HasValue ? ss.Grade.Value.ToString() : "N/A";
                    Write($"{ss.Student.FullName} Grade: {grade}");
                }
            }

            var stream = new MemoryStream();
            _doc.SaveToStream(stream);
            stream.Seek(0, SeekOrigin.Begin);
            return stream;
        }

        private void Write(string toWrite)
        {
            _page.Canvas.DrawString(toWrite, _font, _brush, 0, _height);
            _height += 10f;
            if (_height > _maxHeight)
            {
                _page = _doc.Pages.Add();
                _height = 10;
            }
        }
    }
}