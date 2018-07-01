﻿// <auto-generated />
using System;
using DailyHabits.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DailyHabits.Model.Migrations
{
    [DbContext(typeof(DailyHabitsDataContext))]
    [Migration("20180615200729_Habit description")]
    partial class Habitdescription
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.0-rtm-30799");

            modelBuilder.Entity("DailyHabits.Model.Entities.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("HabitId");

                    b.Property<DateTime>("Timestamep");

                    b.HasKey("Id");

                    b.HasIndex("HabitId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("DailyHabits.Model.Entities.Habit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BaseColor");

                    b.Property<string>("FinalColor");

                    b.Property<string>("Icon");

                    b.Property<string>("InitialColor");

                    b.Property<string>("Name");

                    b.Property<int>("Target");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Habits");
                });

            modelBuilder.Entity("DailyHabits.Model.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DailyHabits.Model.Entities.Event", b =>
                {
                    b.HasOne("DailyHabits.Model.Entities.Habit", "Habit")
                        .WithMany("Events")
                        .HasForeignKey("HabitId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DailyHabits.Model.Entities.Habit", b =>
                {
                    b.HasOne("DailyHabits.Model.Entities.User", "User")
                        .WithMany("Habits")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
