using System;
using NUnit.Framework;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Helpers;
using Platform.Infrastructure.ViewModels.Student;

namespace Platform.Domain.Tests.ViewModels
{
    [TestFixture]
    internal class ViewModelVerifyTests
    {
        [TestCase("John", "Doe", "mock@email.com", 1, 10001, 9)]
        [TestCase("John", "      ", "mock@email.com", 1, 110001, 9)]
        [TestCase("John", "Doe", "mock@email.com", 1, 110001, -9)]
        [TestCase("John", "Doe", null, 1, 110001, 9)]
        public void VerifyModel_WhenNotAllowedValues_ThenShouldThrowError(
            string firstName, string lastName, string email, int id, int albumNumber, int majorId)
        {
            var vm = new StudentViewModel
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Id = id,
                MajorId = majorId,
                AlbumNumber = albumNumber
            };

            Assert.Catch<ArgumentException>(() => vm.Verify());
        }

        [TestCase("John", "Doe", "mock@email.com", 1, 555444, 1)]
        [TestCase("John", "Doe", "mock@email.com", 1, 333444, 9123123)]
        [TestCase("John", "Doe", "mock@email.com", 1123, 100000, 9)]
        [TestCase("John", "Doe", "mock@email.com", 1, 999999, 9)]
        [TestCase("J", "D", "mock@email.com", 122, 333999, 9)]
        public void VerifyModel_WhenCorrect_ThenShouldReturnTrue(
            string firstName, string lastName, string email, int id, int albumNumber, int majorId)
        {
            var vm = new StudentViewModel
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Id = id,
                MajorId = majorId,
                AlbumNumber = albumNumber
            };

            Assert.DoesNotThrow(() => vm.Verify());
        }

        [Test]
        public void VerifyModelWithArray_WhenCorrect_ThenShouldReturnTrue()
        {
            var vm = new ArrayViewModel<StudentViewModel>
            {
                Array = new[]
                {
                    new StudentViewModel
                    {
                        FirstName = "J",
                        LastName = "D",
                        Email = "mock@email.com",
                        Id = 122,
                        MajorId = 9,
                        AlbumNumber = 333999
                    },
                    new StudentViewModel
                    {
                        FirstName = "John",
                        LastName = "Doe",
                        Email = "mock2@email.com",
                        Id = 123,
                        MajorId = 10,
                        AlbumNumber = 334000
                    }
                },
                TotalCount = 2
            };

            Assert.DoesNotThrow(() => vm.Verify());
        }

        [Test]
        public void VerifyModelWithArray_WhenNotAllowedNull_ThenShouldThrowError()
        {
            var vm1 = new ArrayViewModel<StudentViewModel>
            {
                Array = new[]
                {
                    new StudentViewModel
                    {
                        FirstName = "J",
                        LastName = "D",
                        Email = "mock@email.com",
                        Id = 122,
                        MajorId = 9,
                        AlbumNumber = 333999
                    },
                    null
                },
                TotalCount = 2
            };

            var vm2 = new ArrayViewModel<StudentViewModel>
            {
                Array = null,
                TotalCount = 0
            };

            Assert.Catch<ArgumentException>(() => vm1.Verify());
            Assert.Catch<ArgumentException>(() => vm2.Verify());
        }

        [Test]
        public void VerifyModelWithArray_WhenNotAllowedValues_ThenShouldThrowError()
        {
            var vm = new ArrayViewModel<StudentViewModel>
            {
                Array = new[]
                {
                    new StudentViewModel
                    {
                        FirstName = "J",
                        LastName = "D",
                        Email = "mock@email.com",
                        Id = 122,
                        MajorId = 9,
                        AlbumNumber = 333999
                    },
                    new StudentViewModel
                    {
                        FirstName = "John",
                        LastName = "Doe",
                        Email = "mock2@email.com",
                        Id = 123,
                        MajorId = -10,
                        AlbumNumber = 334000
                    }
                },
                TotalCount = 2
            };

            Assert.Catch<ArgumentException>(() => vm.Verify());
        }
    }
}