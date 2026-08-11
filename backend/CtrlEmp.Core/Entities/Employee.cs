using CtrlEmp.Core.Strategies;
using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int CurrentPositionId { get; set; }
        public decimal Salary { get; set; }

        public int DepartmentId { get; set; }
        public Department? Department { get; set; }

        public ICollection<PositionHistory> PositionHistories { get; set; } = new List<PositionHistory>();
        public ICollection<Project> Projects { get; set; } = new List<Project>();

        public decimal CalculateAnnualBonus(IBonusStrategy bonusStrategy)
        {
            return bonusStrategy.CalculateBonus(Salary);
        }
    }
}
