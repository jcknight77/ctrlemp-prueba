using CtrlEmp.Core.Entities;
using CtrlEmp.Core.Interfaces;
using CtrlEmp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.PositionHistories)
                .Include(e => e.Projects)
                .ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.PositionHistories)
                .Include(e => e.Projects)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Employee> CreateAsync(Employee employee, string positionName)
        {
            employee.PositionHistories.Add(new PositionHistory
            {
                Position = positionName,
                StartDate = DateTime.UtcNow
            });

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<bool> UpdateAsync(int id, Employee employee, string positionName)
        {
            var existing = await _context.Employees.Include(e => e.PositionHistories).FirstOrDefaultAsync(e => e.Id == id);
            if (existing == null) return false;

            if (existing.CurrentPositionId != employee.CurrentPositionId)
            {
                var now = DateTime.UtcNow;

                foreach (var history in existing.PositionHistories.Where(ph => ph.EndDate == null))
                {
                    history.EndDate = now;
                }

                existing.PositionHistories.Add(new PositionHistory
                {
                    Position = positionName,
                    StartDate = now
                });
            }

            existing.Name = employee.Name;
            existing.CurrentPositionId = employee.CurrentPositionId;
            existing.Salary = employee.Salary;
            existing.DepartmentId = employee.DepartmentId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return false;

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Employee>> GetByDepartmentAndProjectsAsync(int departmentId)
        {
            return await _context.Employees
                .Where(e => e.DepartmentId == departmentId && e.Projects.Any())
                .Include(e => e.Department)
                .Include(e => e.Projects)
                .Include(e => e.PositionHistories)
                .ToListAsync();
        }
    }
}
