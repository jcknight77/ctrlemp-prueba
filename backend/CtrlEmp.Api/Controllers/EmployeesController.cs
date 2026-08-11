using CtrlEmp.Core.DTOs;
using CtrlEmp.Core.Entities;
using CtrlEmp.Core.Enums;
using CtrlEmp.Core.Interfaces;
using CtrlEmp.Core.Strategies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CtrlEmp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;

        public EmployeesController(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        private static IBonusStrategy GetStrategy(int positionId)
        {
            PositionType position = (PositionType)positionId;

            switch (position)
            {
                case PositionType.Manager:
                    return new ManagerBonusStrategy();

                case PositionType.SeniorManager:
                    return new SeniorManagerBonusStrategy();

                case PositionType.Regular:
                default:
                    return new RegularEmployeeBonusStrategy();
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _repository.GetAllAsync();
            var response = employees.Select(MapToResponseDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _repository.GetByIdAsync(id);
            if (employee == null) return NotFound(new { message = "Empleado no encontrado" });

            return Ok(MapToResponseDto(employee));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateEmployeeDto dto)
        {
            var employee = new Employee
            {
                Name = dto.Name,
                CurrentPositionId = dto.CurrentPositionId,
                Salary = dto.Salary,
                DepartmentId = dto.DepartmentId
            };

            var created = await _repository.CreateAsync(employee, dto.CurrentPositionName);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, MapToResponseDto(created));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto dto)
        {
            var employee = new Employee
            {
                Name = dto.Name,
                CurrentPositionId = dto.CurrentPositionId,
                Salary = dto.Salary,
                DepartmentId = dto.DepartmentId
            };

            var updated = await _repository.UpdateAsync(id, employee);
            if (!updated) return NotFound(new { message = "Empleado no encontrado" });

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _repository.DeleteAsync(id);
            if (!deleted) return NotFound(new { message = "Empleado no encontrado" });

            return NoContent();
        }

        [HttpGet("by-department/{departmentId}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetByDepartment(int departmentId)
        {
            var employees = await _repository.GetByDepartmentAndProjectsAsync(departmentId);
            return Ok(employees.Select(MapToResponseDto));
        }

        private static EmployeeResponseDto MapToResponseDto(Employee e)
        {
            var strategy = GetStrategy(e.CurrentPositionId);
            return new EmployeeResponseDto(
                e.Id,
                e.Name,
                e.CurrentPositionId,
                e.Salary,
                e.CalculateAnnualBonus(strategy),
                e.DepartmentId,
                e.Department?.Name ?? "Sin Departamento",
                e.PositionHistories.Select(ph => new PositionHistoryDto(ph.Position, ph.StartDate, ph.EndDate)).ToList(),
                e.Projects.Select(p => p.Name).ToList()
            );
        }
    }
}
