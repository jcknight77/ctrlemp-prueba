using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.Entities
{
    public class PositionHistory
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public string Position { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
