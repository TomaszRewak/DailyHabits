using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyHabits.Model.Migrations
{
    public partial class Habitsorder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Habits",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "Habits");
        }
    }
}
