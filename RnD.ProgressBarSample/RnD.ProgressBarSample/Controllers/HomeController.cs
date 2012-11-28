using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RnD.ProgressBarSample.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        //GetMethod
        public ActionResult GetMethod()
        {
            System.Threading.Thread.Sleep(3000);

            bool errorReturn = true;

            if (errorReturn)
            {
                // data
                return Json("Hello World!", JsonRequestBehavior.AllowGet);
            }
            else
            {
                // error
                return Json("False", JsonRequestBehavior.AllowGet);
            }

        }

        //PostMethod
        public ActionResult PostMethod(int postId)
        {
            System.Threading.Thread.Sleep(3000);

            bool errorReturn = true;

            if (errorReturn)
            {
                // data save
                return Json("Hello World!", JsonRequestBehavior.AllowGet);
            }
            else
            {
                // 
                return Json("False", JsonRequestBehavior.AllowGet);
            }
        }

    }
}
