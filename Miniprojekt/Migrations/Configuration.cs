namespace Miniprojekt.Migrations
{
	using Miniprojekt.Models;
	using System;
	using System.Data.Entity;
	using System.Data.Entity.Migrations;
	using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Miniprojekt.DataAccess.MpContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Miniprojekt.DataAccess.MpContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
			context.Games.AddOrUpdate(
				g => g.id,
				new []	{
							new Game { id = 1, name = "Gissa bilden" },
							new Game { id = 2, name = "Skiljetecken" },
							new Game { id = 3, name = "Vilken färg?" },
							new Game { id = 4, name = "Bygga meningar av ord" },
							new Game { id = 5, name = "15 blandade frågor" },
							new Game { id = 6, name = "5 frågor ur kategori" }
						}
				);
			context.SaveChanges();

        }
    }
}
