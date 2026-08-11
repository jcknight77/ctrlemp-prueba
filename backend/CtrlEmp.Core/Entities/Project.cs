using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
