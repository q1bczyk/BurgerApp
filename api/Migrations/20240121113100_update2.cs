using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class update2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locals_Admins_Id",
                table: "Locals");

            migrationBuilder.DropForeignKey(
                name: "FK_Locals_Contacts_Id",
                table: "Locals");

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Locals_Id",
                table: "Admins",
                column: "Id",
                principalTable: "Locals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Locals_Id",
                table: "Contacts",
                column: "Id",
                principalTable: "Locals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Locals_Id",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Locals_Id",
                table: "Contacts");

            migrationBuilder.AddForeignKey(
                name: "FK_Locals_Admins_Id",
                table: "Locals",
                column: "Id",
                principalTable: "Admins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Locals_Contacts_Id",
                table: "Locals",
                column: "Id",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
