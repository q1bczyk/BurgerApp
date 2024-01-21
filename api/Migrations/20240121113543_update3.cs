using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class update3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Locals_Id",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Locals_Id",
                table: "Contacts");

            migrationBuilder.AlterColumn<string>(
                name: "LocalId",
                table: "Contacts",
                type: "character varying(36)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "LocalId",
                table: "Admins",
                type: "character varying(36)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_LocalId",
                table: "Contacts",
                column: "LocalId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Admins_LocalId",
                table: "Admins",
                column: "LocalId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Locals_LocalId",
                table: "Admins",
                column: "LocalId",
                principalTable: "Locals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Locals_LocalId",
                table: "Contacts",
                column: "LocalId",
                principalTable: "Locals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Locals_LocalId",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Locals_LocalId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_LocalId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Admins_LocalId",
                table: "Admins");

            migrationBuilder.AlterColumn<string>(
                name: "LocalId",
                table: "Contacts",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(36)");

            migrationBuilder.AlterColumn<string>(
                name: "LocalId",
                table: "Admins",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(36)");

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
    }
}
