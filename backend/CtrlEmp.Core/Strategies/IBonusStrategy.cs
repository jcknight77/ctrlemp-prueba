using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.Strategies
{
    public interface IBonusStrategy
    {
        decimal CalculateBonus(decimal salary);
    }
}
