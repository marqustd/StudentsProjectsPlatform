using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Platform.Infrastructure.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Majors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Majors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    FirstName = table.Column<string>(nullable: false),
                    LastName = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    SystemId = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    Verified = table.Column<bool>(nullable: true),
                    AlbumNumber = table.Column<int>(nullable: true),
                    MajorId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Majors_MajorId",
                        column: x => x.MajorId,
                        principalTable: "Majors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Semesters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    SubjectId = table.Column<int>(nullable: true),
                    State = table.Column<int>(nullable: false),
                    Password = table.Column<string>(nullable: true),
                    MajorId = table.Column<int>(nullable: true),
                    Season = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Semesters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Semesters_Majors_MajorId",
                        column: x => x.MajorId,
                        principalTable: "Majors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Semesters_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Topics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: true),
                    SubjectId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Topics_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Artifacts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Guid = table.Column<string>(nullable: true),
                    ContentType = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    AuthorId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artifacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Artifacts_User_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TeachersSubjects",
                columns: table => new
                {
                    TeacherId = table.Column<int>(nullable: false),
                    SubjectId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeachersSubjects", x => new { x.TeacherId, x.SubjectId });
                    table.ForeignKey(
                        name: "FK_TeachersSubjects_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeachersSubjects_User_TeacherId",
                        column: x => x.TeacherId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentsSemesters",
                columns: table => new
                {
                    StudentId = table.Column<int>(nullable: false),
                    SemesterId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentsSemesters", x => new { x.SemesterId, x.StudentId });
                    table.ForeignKey(
                        name: "FK_StudentsSemesters_Semesters_SemesterId",
                        column: x => x.SemesterId,
                        principalTable: "Semesters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentsSemesters_User_StudentId",
                        column: x => x.StudentId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    IncludeArtifact = table.Column<bool>(nullable: false),
                    TopicId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTemplates_Topics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    TopicId = table.Column<int>(nullable: true),
                    SubjectId = table.Column<int>(nullable: true),
                    SemesterId = table.Column<int>(nullable: true),
                    State = table.Column<int>(nullable: false),
                    Capacity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sections_Semesters_SemesterId",
                        column: x => x.SemesterId,
                        principalTable: "Semesters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sections_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sections_Topics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SubjectArtifact",
                columns: table => new
                {
                    SubjectId = table.Column<int>(nullable: false),
                    ArtifactId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectArtifact", x => new { x.ArtifactId, x.SubjectId });
                    table.ForeignKey(
                        name: "FK_SubjectArtifact_Artifacts_ArtifactId",
                        column: x => x.ArtifactId,
                        principalTable: "Artifacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubjectArtifact_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TopicArtifact",
                columns: table => new
                {
                    TopicId = table.Column<int>(nullable: false),
                    ArtifactId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopicArtifact", x => new { x.ArtifactId, x.TopicId });
                    table.ForeignKey(
                        name: "FK_TopicArtifact_Artifacts_ArtifactId",
                        column: x => x.ArtifactId,
                        principalTable: "Artifacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TopicArtifact_Topics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    IncludeArtifact = table.Column<bool>(nullable: false),
                    ArtifactId = table.Column<int>(nullable: true),
                    ActivityTemplateId = table.Column<int>(nullable: true),
                    SectionId = table.Column<int>(nullable: true),
                    TopicId = table.Column<int>(nullable: true),
                    SemesterId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Activities_ActivityTemplates_ActivityTemplateId",
                        column: x => x.ActivityTemplateId,
                        principalTable: "ActivityTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Activities_Artifacts_ArtifactId",
                        column: x => x.ArtifactId,
                        principalTable: "Artifacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Activities_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Activities_Semesters_SemesterId",
                        column: x => x.SemesterId,
                        principalTable: "Semesters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Activities_Topics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StudentSections",
                columns: table => new
                {
                    StudentId = table.Column<int>(nullable: false),
                    SectionId = table.Column<int>(nullable: false),
                    Grade = table.Column<int>(nullable: true),
                    SubjectId = table.Column<int>(nullable: true),
                    TopicId = table.Column<int>(nullable: true),
                    SemesterId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentSections", x => new { x.SectionId, x.StudentId });
                    table.ForeignKey(
                        name: "FK_StudentSections_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentSections_Semesters_SemesterId",
                        column: x => x.SemesterId,
                        principalTable: "Semesters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentSections_User_StudentId",
                        column: x => x.StudentId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentSections_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentSections_Topics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ActivityChecks",
                columns: table => new
                {
                    StudentId = table.Column<int>(nullable: false),
                    ActivityId = table.Column<int>(nullable: false),
                    IsChecked = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityChecks", x => new { x.ActivityId, x.StudentId });
                    table.ForeignKey(
                        name: "FK_ActivityChecks_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActivityChecks_User_StudentId",
                        column: x => x.StudentId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Obsolete = table.Column<bool>(nullable: false),
                    AuthorId = table.Column<int>(nullable: true),
                    DateTime = table.Column<DateTime>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    ActivityId = table.Column<int>(nullable: true),
                    SectionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_User_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ActivityTemplateId",
                table: "Activities",
                column: "ActivityTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ArtifactId",
                table: "Activities",
                column: "ArtifactId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_SectionId",
                table: "Activities",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_SemesterId",
                table: "Activities",
                column: "SemesterId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_TopicId",
                table: "Activities",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityChecks_StudentId",
                table: "ActivityChecks",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTemplates_TopicId",
                table: "ActivityTemplates",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_Artifacts_AuthorId",
                table: "Artifacts",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ActivityId",
                table: "Comments",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AuthorId",
                table: "Comments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_SectionId",
                table: "Comments",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_SemesterId",
                table: "Sections",
                column: "SemesterId");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_SubjectId",
                table: "Sections",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_TopicId",
                table: "Sections",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_Semesters_MajorId",
                table: "Semesters",
                column: "MajorId");

            migrationBuilder.CreateIndex(
                name: "IX_Semesters_SubjectId",
                table: "Semesters",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentSections_SemesterId",
                table: "StudentSections",
                column: "SemesterId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentSections_StudentId",
                table: "StudentSections",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentSections_SubjectId",
                table: "StudentSections",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentSections_TopicId",
                table: "StudentSections",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentsSemesters_StudentId",
                table: "StudentsSemesters",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectArtifact_SubjectId",
                table: "SubjectArtifact",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TeachersSubjects_SubjectId",
                table: "TeachersSubjects",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TopicArtifact_TopicId",
                table: "TopicArtifact",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_SubjectId",
                table: "Topics",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "User",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_User_AlbumNumber",
                table: "User",
                column: "AlbumNumber",
                unique: true,
                filter: "[AlbumNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_User_MajorId",
                table: "User",
                column: "MajorId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email1",
                table: "User",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityChecks");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "StudentSections");

            migrationBuilder.DropTable(
                name: "StudentsSemesters");

            migrationBuilder.DropTable(
                name: "SubjectArtifact");

            migrationBuilder.DropTable(
                name: "TeachersSubjects");

            migrationBuilder.DropTable(
                name: "TopicArtifact");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropTable(
                name: "ActivityTemplates");

            migrationBuilder.DropTable(
                name: "Artifacts");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Semesters");

            migrationBuilder.DropTable(
                name: "Topics");

            migrationBuilder.DropTable(
                name: "Majors");

            migrationBuilder.DropTable(
                name: "Subjects");
        }
    }
}
