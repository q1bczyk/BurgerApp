using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class allEntitiesupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientsContact_Order_OrderId",
                table: "ClientsContact");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryDetail_ClientsContact_ClientsContactId",
                table: "DeliveryDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_IngredientProduct_Ingredient_IngredientId",
                table: "IngredientProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_IngredientProduct_Product_ProductId",
                table: "IngredientProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Locals_LocalId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderProduct_Order_OrderId",
                table: "OrderProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderProduct_Product_ProductId",
                table: "OrderProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Product",
                table: "Product");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderProduct",
                table: "OrderProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Order",
                table: "Order");

            migrationBuilder.DropPrimaryKey(
                name: "PK_IngredientProduct",
                table: "IngredientProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredient",
                table: "Ingredient");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeliveryDetail",
                table: "DeliveryDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClientsContact",
                table: "ClientsContact");

            migrationBuilder.RenameTable(
                name: "Product",
                newName: "Products");

            migrationBuilder.RenameTable(
                name: "OrderProduct",
                newName: "OrderProducts");

            migrationBuilder.RenameTable(
                name: "Order",
                newName: "Orders");

            migrationBuilder.RenameTable(
                name: "IngredientProduct",
                newName: "IngredientProducts");

            migrationBuilder.RenameTable(
                name: "Ingredient",
                newName: "Ingredients");

            migrationBuilder.RenameTable(
                name: "DeliveryDetail",
                newName: "DeliveryDetails");

            migrationBuilder.RenameTable(
                name: "ClientsContact",
                newName: "ClientsContacts");

            migrationBuilder.RenameIndex(
                name: "IX_OrderProduct_ProductId",
                table: "OrderProducts",
                newName: "IX_OrderProducts_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_LocalId",
                table: "Orders",
                newName: "IX_Orders_LocalId");

            migrationBuilder.RenameIndex(
                name: "IX_IngredientProduct_ProductId",
                table: "IngredientProducts",
                newName: "IX_IngredientProducts_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_DeliveryDetail_ClientsContactId",
                table: "DeliveryDetails",
                newName: "IX_DeliveryDetails_ClientsContactId");

            migrationBuilder.RenameIndex(
                name: "IX_ClientsContact_OrderId",
                table: "ClientsContacts",
                newName: "IX_ClientsContacts_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderProducts",
                table: "OrderProducts",
                columns: new[] { "OrderId", "ProductId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IngredientProducts",
                table: "IngredientProducts",
                columns: new[] { "IngredientId", "ProductId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeliveryDetails",
                table: "DeliveryDetails",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClientsContacts",
                table: "ClientsContacts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientsContacts_Orders_OrderId",
                table: "ClientsContacts",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryDetails_ClientsContacts_ClientsContactId",
                table: "DeliveryDetails",
                column: "ClientsContactId",
                principalTable: "ClientsContacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IngredientProducts_Ingredients_IngredientId",
                table: "IngredientProducts",
                column: "IngredientId",
                principalTable: "Ingredients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IngredientProducts_Products_ProductId",
                table: "IngredientProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProducts_Orders_OrderId",
                table: "OrderProducts",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProducts_Products_ProductId",
                table: "OrderProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Locals_LocalId",
                table: "Orders",
                column: "LocalId",
                principalTable: "Locals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientsContacts_Orders_OrderId",
                table: "ClientsContacts");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryDetails_ClientsContacts_ClientsContactId",
                table: "DeliveryDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_IngredientProducts_Ingredients_IngredientId",
                table: "IngredientProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_IngredientProducts_Products_ProductId",
                table: "IngredientProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderProducts_Orders_OrderId",
                table: "OrderProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderProducts_Products_ProductId",
                table: "OrderProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Locals_LocalId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderProducts",
                table: "OrderProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_IngredientProducts",
                table: "IngredientProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeliveryDetails",
                table: "DeliveryDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClientsContacts",
                table: "ClientsContacts");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Product");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "Order");

            migrationBuilder.RenameTable(
                name: "OrderProducts",
                newName: "OrderProduct");

            migrationBuilder.RenameTable(
                name: "Ingredients",
                newName: "Ingredient");

            migrationBuilder.RenameTable(
                name: "IngredientProducts",
                newName: "IngredientProduct");

            migrationBuilder.RenameTable(
                name: "DeliveryDetails",
                newName: "DeliveryDetail");

            migrationBuilder.RenameTable(
                name: "ClientsContacts",
                newName: "ClientsContact");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_LocalId",
                table: "Order",
                newName: "IX_Order_LocalId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderProducts_ProductId",
                table: "OrderProduct",
                newName: "IX_OrderProduct_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_IngredientProducts_ProductId",
                table: "IngredientProduct",
                newName: "IX_IngredientProduct_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_DeliveryDetails_ClientsContactId",
                table: "DeliveryDetail",
                newName: "IX_DeliveryDetail_ClientsContactId");

            migrationBuilder.RenameIndex(
                name: "IX_ClientsContacts_OrderId",
                table: "ClientsContact",
                newName: "IX_ClientsContact_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Product",
                table: "Product",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Order",
                table: "Order",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderProduct",
                table: "OrderProduct",
                columns: new[] { "OrderId", "ProductId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredient",
                table: "Ingredient",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IngredientProduct",
                table: "IngredientProduct",
                columns: new[] { "IngredientId", "ProductId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeliveryDetail",
                table: "DeliveryDetail",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClientsContact",
                table: "ClientsContact",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientsContact_Order_OrderId",
                table: "ClientsContact",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryDetail_ClientsContact_ClientsContactId",
                table: "DeliveryDetail",
                column: "ClientsContactId",
                principalTable: "ClientsContact",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IngredientProduct_Ingredient_IngredientId",
                table: "IngredientProduct",
                column: "IngredientId",
                principalTable: "Ingredient",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IngredientProduct_Product_ProductId",
                table: "IngredientProduct",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Locals_LocalId",
                table: "Order",
                column: "LocalId",
                principalTable: "Locals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProduct_Order_OrderId",
                table: "OrderProduct",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProduct_Product_ProductId",
                table: "OrderProduct",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
