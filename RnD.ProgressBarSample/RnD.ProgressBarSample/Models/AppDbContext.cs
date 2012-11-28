using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace RnD.ProgressBarSample.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }

    }

    #region Initial data

    // Change the base class as follows if you want to drop and create the database during development:
    //public class DBInitializer : DropCreateDatabaseAlways<AppDbContext>
    //public class DBInitializer : CreateDatabaseIfNotExists<AppDbContext>
    public class DBInitializer : DropCreateDatabaseIfModelChanges<AppDbContext>
    {
        protected override void Seed(AppDbContext context)
        {
            // Create default catrgories.
            var categories = new List<Category>
                            {
                                new Category { CategoryId=1, Name = "Fuirt"},
                                new Category {CategoryId=2, Name = "Car"}
                            };

            categories.ForEach(c => context.Categories.Add(c));

            context.SaveChanges();

            // Create some products.
            var products = new List<Product> 
                        {
                            new Product {ProductId=1, Name="Apple", Price=15, CategoryId=1},
                            new Product {ProductId=2, Name="Mango", Price=20, CategoryId=1},
                            new Product {ProductId=3, Name="Toyota", Price=150, CategoryId=2},
                            new Product {ProductId=4, Name="Nissan", Price=200, CategoryId=2},
                            new Product {ProductId=5, Name="Tata", Price=500, CategoryId=2}
                        };

            products.ForEach(p => context.Products.Add(p));

            context.SaveChanges();

        }
    }

    #endregion
}