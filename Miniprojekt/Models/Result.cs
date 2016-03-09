using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Miniprojekt.Models
{
	public class Result
	{
		[Key]
		public int id { get; set; }

		public int game_id { get; set; }
		[ForeignKey("game_id")]
		public virtual Game game { get; set; }

		public int user_id { get; set; }
		[ForeignKey("user_id")]
		public virtual User user { get; set; }

		public int score { get; set; }
	}
}