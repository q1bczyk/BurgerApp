using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class paymentUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "DeliveryDetails");

            migrationBuilder.AddColumn<bool>(
                name: "PaymentSuccess",
                table: "Orders",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentToken",
                table: "Orders",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentSuccess",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PaymentToken",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "DeliveryDetails",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
