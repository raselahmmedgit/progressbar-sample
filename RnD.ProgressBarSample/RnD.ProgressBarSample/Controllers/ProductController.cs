using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RnD.ProgressBarSample.Models;
using RnD.ProgressBarSample.Helper;
using RnD.ProgressBarSample.ViewModels;

namespace RnD.ProgressBarSample.Controllers
{
    public class ProductController : Controller
    {
        private AppDbContext _db = new AppDbContext();

        //
        // GET: /Product/

        public ViewResult Index()
        {
            //var products = _db.Products.Include(p => p.Category);
            //return View(products.ToList());
            return View();
        }

        // for display datatable
        public ActionResult GetProducts(DataTableParamModel param)
        {
            var products = _db.Products.ToList();

            var viewProducts = products.Select(pro => new ProductTableModels() { ProductId = Convert.ToString(pro.ProductId), Name = pro.Name, Price = Convert.ToString(pro.Price), CategoryId = pro.Category == null ? null : Convert.ToString(pro.Category.CategoryId), CategoryName = pro.Category == null ? null : pro.Category.Name });

            IEnumerable<ProductTableModels> filteredProducts;

            if (!string.IsNullOrEmpty(param.sSearch))
            {
                filteredProducts = viewProducts.Where(pro => (pro.Name ?? "").Contains(param.sSearch) || (pro.Price ?? "").Contains(param.sSearch) || (pro.CategoryName ?? "").Contains(param.sSearch)).ToList();
            }
            else
            {
                filteredProducts = viewProducts;
            }

            var viewOdjects = filteredProducts.Skip(param.iDisplayStart).Take(param.iDisplayLength);

            var result = from proMdl in viewOdjects
                         select new[] { proMdl.ProductId, proMdl.Name, proMdl.Price, proMdl.CategoryId, proMdl.CategoryName };

            return Json(new
            {
                sEcho = param.sEcho,
                iTotalRecords = products.Count(),
                iTotalDisplayRecords = filteredProducts.Count(),
                aaData = result
            },
                            JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Product/Details/By ID

        public ActionResult Details(int id)
        {
            Product product = _db.Products.Find(id);

            //return View(product);
            return PartialView("_Details", product);
        }

        //
        // GET: /Product/Create

        public ActionResult Create()
        {
            ViewBag.CategoryId = new SelectList(_db.Categories, "CategoryId", "Name");

            //return View();
            return PartialView("_Create");
        }

        //
        // POST: /Product/Create

        [HttpPost]
        public ActionResult Create(Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _db.Products.Add(product);
                    _db.SaveChanges();

                    //return RedirectToAction("Index");
                    return Content(Boolean.TrueString);
                }

                ViewBag.CategoryId = new SelectList(_db.Categories, "CategoryId", "Name", product.CategoryId);

                //return View(product);
                //return View("_Create", product);
                return Content("Please review your form.");

            }
            catch (Exception ex)
            {
                return Content("Error Occured!");
            }
        }

        //
        // GET: /Product/Edit/By ID

        public ActionResult Edit(int id)
        {
            Product product = _db.Products.Find(id);
            ViewBag.CategoryId = new SelectList(_db.Categories, "CategoryId", "Name", product.CategoryId);

            //return View(product);
            return PartialView("_Edit", product);
        }

        //
        // POST: /Product/Edit/By ID

        [HttpPost]
        public ActionResult Edit(Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _db.Entry(product).State = EntityState.Modified;
                    _db.SaveChanges();

                    //return RedirectToAction("Index");
                    return Content(Boolean.TrueString);
                }

                ViewBag.CategoryId = new SelectList(_db.Categories, "CategoryId", "Name", product.CategoryId);

                //return View(product);
                //return View("_Edit", product);
                return Content("Please review your form.");
            }
            catch (Exception ex)
            {
                return Content("Error Occured!");
            }
        }

        //
        // GET: /Product/Delete/By ID

        public ActionResult Delete(int id)
        {
            Product product = _db.Products.Find(id);

            //return View(product);
            return PartialView("_Delete", product);
        }

        //
        // POST: /Product/Delete/By ID

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            try
            {
                Product product = _db.Products.Find(id);
                if (product != null)
                {
                    _db.Products.Remove(product);
                    _db.SaveChanges();

                    //return RedirectToAction("Index");
                    return Content(Boolean.TrueString);
                }
                return Content("Please review your form.");
            }
            catch (Exception ex)
            {
                return Content("Error Occured!");
            }
        }

        public PartialViewResult GetCategory(string proId)
        {
            int productId = Convert.ToInt32(proId);

            var product = _db.Products.Where(x => x.CategoryId == productId).FirstOrDefault();

            var category = product.Category;

            CategoryTableModels categoryTableModel = category == null ? null : new CategoryTableModels
            {
                Name = category.Name,
            };


            return PartialView("_Category", categoryTableModel);
        }

        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }
    }
}