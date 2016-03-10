using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Miniprojekt.Controllers
{
    public class GameAsterixController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Data()
        {
            string[] s = {
                             "Hej!\nVad heter du?\nJag heter Kalle.",
                             //"Hur gammal är du?"
                         };
            return Json(s, JsonRequestBehavior.AllowGet);
        }
    }
}