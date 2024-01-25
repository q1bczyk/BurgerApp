﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240125165151_allEntities")]
    partial class allEntities
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Admin", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("LocalId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("text");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("text");

                    b.Property<byte[]>("Password")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LocalId")
                        .IsUnique();

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("Contact", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LocalId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("StreetNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LocalId")
                        .IsUnique();

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("DayOff", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Date")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("DayOffs");
                });

            modelBuilder.Entity("DayOffLocal", b =>
                {
                    b.Property<string>("DayOffId")
                        .HasColumnType("character varying(36)");

                    b.Property<string>("LocalId")
                        .HasColumnType("character varying(36)");

                    b.HasKey("DayOffId", "LocalId");

                    b.HasIndex("LocalId");

                    b.ToTable("DayOffLocals");
                });

            modelBuilder.Entity("Local", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Locals");
                });

            modelBuilder.Entity("OpeningHour", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Closed")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Day")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsDayOff")
                        .HasColumnType("boolean");

                    b.Property<string>("Opened")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("OpeningHours");
                });

            modelBuilder.Entity("OpeningHourLocal", b =>
                {
                    b.Property<string>("LocalId")
                        .HasColumnType("character varying(36)");

                    b.Property<string>("OpeningHourId")
                        .HasColumnType("character varying(36)");

                    b.HasKey("LocalId", "OpeningHourId");

                    b.HasIndex("OpeningHourId");

                    b.ToTable("OpeningHourLocals");
                });

            modelBuilder.Entity("api._Entieties.ClientsContact", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OrderId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("OrderId")
                        .IsUnique();

                    b.ToTable("ClientsContact");
                });

            modelBuilder.Entity("api._Entieties.DeliveryDetail", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ClientsContactId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<string>("HouseNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ClientsContactId")
                        .IsUnique();

                    b.ToTable("DeliveryDetail");
                });

            modelBuilder.Entity("api._Entieties.Ingredient", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Ingredient");
                });

            modelBuilder.Entity("api._Entieties.IngredientProduct", b =>
                {
                    b.Property<string>("IngredientId")
                        .HasColumnType("character varying(36)");

                    b.Property<string>("ProductId")
                        .HasColumnType("character varying(36)");

                    b.HasKey("IngredientId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("IngredientProduct");
                });

            modelBuilder.Entity("api._Entieties.Order", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("LocalId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<string>("OrderStatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("LocalId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("api._Entieties.OrderProduct", b =>
                {
                    b.Property<string>("OrderId")
                        .HasColumnType("character varying(36)");

                    b.Property<string>("ProductId")
                        .HasColumnType("character varying(36)");

                    b.HasKey("OrderId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderProduct");
                });

            modelBuilder.Entity("api._Entieties.Product", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("ImgUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("OrderCount")
                        .HasColumnType("integer");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("Admin", b =>
                {
                    b.HasOne("Local", "Local")
                        .WithOne("Admin")
                        .HasForeignKey("Admin", "LocalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Local");
                });

            modelBuilder.Entity("Contact", b =>
                {
                    b.HasOne("Local", "Local")
                        .WithOne("Contact")
                        .HasForeignKey("Contact", "LocalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Local");
                });

            modelBuilder.Entity("DayOffLocal", b =>
                {
                    b.HasOne("DayOff", "DayOff")
                        .WithMany("DayOffLocals")
                        .HasForeignKey("DayOffId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Local", "Local")
                        .WithMany("DayOffLocals")
                        .HasForeignKey("LocalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DayOff");

                    b.Navigation("Local");
                });

            modelBuilder.Entity("OpeningHourLocal", b =>
                {
                    b.HasOne("Local", "Local")
                        .WithMany("OpeningHourLocals")
                        .HasForeignKey("LocalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OpeningHour", "OpeningHour")
                        .WithMany("OpeningHourLocals")
                        .HasForeignKey("OpeningHourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Local");

                    b.Navigation("OpeningHour");
                });

            modelBuilder.Entity("api._Entieties.ClientsContact", b =>
                {
                    b.HasOne("api._Entieties.Order", "Order")
                        .WithOne("ClientsContact")
                        .HasForeignKey("api._Entieties.ClientsContact", "OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");
                });

            modelBuilder.Entity("api._Entieties.DeliveryDetail", b =>
                {
                    b.HasOne("api._Entieties.ClientsContact", "ClientsContact")
                        .WithOne("DeliveryDetail")
                        .HasForeignKey("api._Entieties.DeliveryDetail", "ClientsContactId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ClientsContact");
                });

            modelBuilder.Entity("api._Entieties.IngredientProduct", b =>
                {
                    b.HasOne("api._Entieties.Ingredient", "Ingredient")
                        .WithMany("IngredientProducts")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api._Entieties.Product", "Product")
                        .WithMany("IngredientsProduct")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ingredient");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("api._Entieties.Order", b =>
                {
                    b.HasOne("Local", "Local")
                        .WithMany("Orders")
                        .HasForeignKey("LocalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Local");
                });

            modelBuilder.Entity("api._Entieties.OrderProduct", b =>
                {
                    b.HasOne("api._Entieties.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api._Entieties.Product", "Product")
                        .WithMany("OrderProducts")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("DayOff", b =>
                {
                    b.Navigation("DayOffLocals");
                });

            modelBuilder.Entity("Local", b =>
                {
                    b.Navigation("Admin");

                    b.Navigation("Contact");

                    b.Navigation("DayOffLocals");

                    b.Navigation("OpeningHourLocals");

                    b.Navigation("Orders");
                });

            modelBuilder.Entity("OpeningHour", b =>
                {
                    b.Navigation("OpeningHourLocals");
                });

            modelBuilder.Entity("api._Entieties.ClientsContact", b =>
                {
                    b.Navigation("DeliveryDetail");
                });

            modelBuilder.Entity("api._Entieties.Ingredient", b =>
                {
                    b.Navigation("IngredientProducts");
                });

            modelBuilder.Entity("api._Entieties.Order", b =>
                {
                    b.Navigation("ClientsContact")
                        .IsRequired();
                });

            modelBuilder.Entity("api._Entieties.Product", b =>
                {
                    b.Navigation("IngredientsProduct");

                    b.Navigation("OrderProducts");
                });
#pragma warning restore 612, 618
        }
    }
}
