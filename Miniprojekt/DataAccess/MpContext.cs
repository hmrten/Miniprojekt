using Miniprojekt.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Miniprojekt.DataAccess
{
	public class MpContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Game> Games { get; set; }
		public DbSet<Result> Results { get; set; }

		public MpContext() : base("miniproj") { }
	}
}