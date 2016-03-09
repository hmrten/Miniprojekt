namespace Miniprojekt.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Games",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        name = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Results",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        game_id = c.Int(nullable: false),
                        user_id = c.Int(nullable: false),
                        score = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.Games", t => t.game_id, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.user_id, cascadeDelete: true)
                .Index(t => t.game_id)
                .Index(t => t.user_id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        nickname = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Results", "user_id", "dbo.Users");
            DropForeignKey("dbo.Results", "game_id", "dbo.Games");
            DropIndex("dbo.Results", new[] { "user_id" });
            DropIndex("dbo.Results", new[] { "game_id" });
            DropTable("dbo.Users");
            DropTable("dbo.Results");
            DropTable("dbo.Games");
        }
    }
}
