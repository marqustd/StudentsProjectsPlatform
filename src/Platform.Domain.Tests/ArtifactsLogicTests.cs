using System.IO;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using Platform.Artifacts.DTO;
using Platform.Artifacts.Exceptions;
using Platform.Artifacts.Logic;

namespace Platform.Domain.Tests
{
    [TestFixture]
    internal class ArtifactsLogicTests
    {
        private readonly int _maxFileSize = 1000;
        private readonly string[] _validContent = {"application/pdf"};

        [Test]
        public void AddArtifact_WhenCorrect_ThenReturnDto()
        {
            const int fileSize = 100;
            const string guid = "123-123-123";
            const string contentType = "application/pdf";
            const string fileName = "test_file_123.pdf";
            var expectedResult = new ArtifactInfoDto(guid, fileName, contentType);
            var streamMock = new Mock<Stream>();
            streamMock.Setup(a => a.Length).Returns(fileSize);
            var artifactDto = new ArtifactDto
            {
                ContentType = contentType,
                File = streamMock.Object,
                FileName = fileName
            };

            var fileRepo = new Mock<IFileRepository>();
            fileRepo.Setup(r => r.Write(It.IsAny<ArtifactDto>())).Returns(expectedResult);

            var sut = new ArtifactsService(fileRepo.Object, _maxFileSize, _validContent);

            sut.Add(artifactDto).Should().Be(expectedResult);
        }

        [Test]
        public void AddArtifact_WhenWrongContentType_ThenThrowException()
        {
            var fileMock = new Mock<Stream>();
            fileMock.Setup(f => f.Length).Returns(100);
            var artifactDto = new ArtifactDto
            {
                ContentType = "plain/text",
                File = fileMock.Object,
                FileName = ""
            };
            var fileRepo = new Mock<IFileRepository>();

            var sut = new ArtifactsService(fileRepo.Object, _maxFileSize, _validContent);

            Assert.Throws<ContentTypeException>(() => sut.Add(artifactDto));
        }

        [Test]
        public void AddArtifact_WhenWrongFileSize_ThenThrowException()
        {
            var fileMock = new Mock<Stream>();
            fileMock.Setup(f => f.Length).Returns(10000);
            var artifactDto = new ArtifactDto
            {
                ContentType = "application/pdf",
                File = fileMock.Object,
                FileName = ""
            };
            var fileRepo = new Mock<IFileRepository>();

            var sut = new ArtifactsService(fileRepo.Object, _maxFileSize, _validContent);

            Assert.Throws<FileSizeException>(() => sut.Add(artifactDto));
        }
    }
}