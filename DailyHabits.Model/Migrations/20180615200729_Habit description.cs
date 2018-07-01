using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyHabits.Model.Migrations
{
    public partial class Habitdescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BaseColor",
                table: "Habits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FinalColor",
                table: "Habits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "Habits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitialColor",
                table: "Habits",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Target",
                table: "Habits",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BaseColor",
                table: "Habits");

            migrationBuilder.DropColumn(
                name: "FinalColor",
                table: "Habits");

            migrationBuilder.DropColumn(
                name: "Icon",
                table: "Habits");

            migrationBuilder.DropColumn(
                name: "InitialColor",
                table: "Habits");

            migrationBuilder.DropColumn(
                name: "Target",
                table: "Habits");
        }
    }
}
