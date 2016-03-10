using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Miniprojekt.DataAccess
{
    public class GameColorController : Controller
    {
        private int points = 0;
        // GET: Color
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult GissaFarg()
        {
            return View();

        }
    }
}