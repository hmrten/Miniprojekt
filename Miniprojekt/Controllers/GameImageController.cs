using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Miniprojekt.ViewModels;

namespace Miniprojekt.DataAccess
{
    public class GameImageController : Controller
    {

        // GET: GameImage
        public ActionResult Index()
        {
			var model = new ImageViewModel();
            return View(model);
        }
    }
}