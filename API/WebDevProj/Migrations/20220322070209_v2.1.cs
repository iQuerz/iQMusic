using Microsoft.EntityFrameworkCore.Migrations;

namespace WebDevProj.Migrations
{
    public partial class v21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Link",
                table: "Concerts",
                newName: "Url");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Concerts",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Concerts");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Concerts",
                newName: "Link");
        }
    }
}
