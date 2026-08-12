using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.DTOs
{
    public record CreateEmployeeDto(
        string Name,
        int CurrentPositionId,
        decimal Salary,
        int DepartmentId,
        string CurrentPositionName
    );

    public record UpdateEmployeeDto(
        string Name,
        int CurrentPositionId,
        decimal Salary,
        int DepartmentId,
        string CurrentPositionName
    );

    public record EmployeeResponseDto(
        int Id,
        string Name,
        int CurrentPositionId,
        decimal Salary,
        decimal AnnualBonus,
        int DepartmentId,
        string DepartmentName,
        List<PositionHistoryDto> PositionHistories,
        List<string> Projects
    );

    public record PositionHistoryDto(
        string Position,
        DateTime StartDate,
        DateTime? EndDate
    );
}
