using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.Entities
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User"; // Roles: "Admin", "User"
    }
}
