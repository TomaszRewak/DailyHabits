using DailyHabits.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Model
{
    public class DailyHabitsDataContext : DbContext
	{
		public DailyHabitsDataContext(DbContextOptions<DailyHabitsDataContext> options) : base(options)
		{
		}

		public DbSet<Habit> Habits { get; set; }

		public DbSet<Event> Events { get; set; }

		public DbSet<User> Users { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{ }
	}
}
