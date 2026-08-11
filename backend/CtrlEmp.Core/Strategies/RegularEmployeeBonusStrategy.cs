using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.Strategies
{
    public class RegularEmployeeBonusStrategy : IBonusStrategy
    {
        public decimal CalculateBonus(decimal salary) => salary * 0.10m;
    }
}
