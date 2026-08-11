using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.Strategies
{
    public class ManagerBonusStrategy : IBonusStrategy
    {
        public decimal CalculateBonus(decimal salary) => salary * 0.20m;
    }
}
