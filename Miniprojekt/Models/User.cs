using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Miniprojekt.Models
{
	public class User
	{
		[Key]
		public int id { get; set; }
		public string nickname { get; set; }
	}
}