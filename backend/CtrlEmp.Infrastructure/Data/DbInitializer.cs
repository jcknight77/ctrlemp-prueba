using CtrlEmp.Core.Entities;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace CtrlEmp.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (!await context.Departments.AnyAsync())
            {
                context.Departments.AddRange(
                    new Department { Name = "Ingeniería" },
                    new Department { Name = "Recursos Humanos" },
                    new Department { Name = "Finanzas" }
                );
                await context.SaveChangesAsync();
            }

            if (!await context.Users.AnyAsync())
            {
                context.Users.AddRange(
                    new ApplicationUser
                    {
                        Username = "admin",
                        PasswordHash = HashPassword("admin123"),
                        Role = "Admin"
                    },
                    new ApplicationUser
                    {
                        Username = "user",
                        PasswordHash = HashPassword("user123"),
                        Role = "User"
                    }
                );
                await context.SaveChangesAsync();
            }
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }
    }
}
