using CtrlEmp.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(int id);
        Task<Employee> CreateAsync(Employee employee, string positionName);
        Task<bool> UpdateAsync(int id, Employee employee, string positionName);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<Employee>> GetByDepartmentAndProjectsAsync(int departmentId);
    }
}
