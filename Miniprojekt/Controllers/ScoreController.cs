using Miniprojekt.DataAccess;
using Miniprojekt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Miniprojekt.Controllers
{
    public class ScoreController : Controller
    {
        private MpContext db = new MpContext();

        public ViewResult Index()
        {
            return View(db.Results);
        }

        [HttpPost]
        public HttpStatusCodeResult Register(string nickname, int score, int game_id)
        {
            var user = db.Users.Where(u => String.Compare(u.nickname, nickname, true) == 0).SingleOrDefault();
            if (user == null)
            {
                user = db.Users.Add(new User { nickname = nickname });
                db.SaveChanges();
            }

            db.Results.Add(new Result { game_id = game_id, user_id = user.id, score = score });
            db.SaveChanges();
            return new HttpStatusCodeResult(200);
        }

        public JsonResult Games()
        {
            var gs = db.Games.Select(g => new
            {
                id = g.id,
                name = g.name
            });
            return Json(gs.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Results()
        {
            var rs = db.Results.Select(r => new
            {
                id = r.id,
                game_id = r.game_id,
                game_name = r.game.name,
                user_id = r.user_id,
                user_nickname = r.user.nickname,
                score = r.score
            });

            return Json(rs.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}