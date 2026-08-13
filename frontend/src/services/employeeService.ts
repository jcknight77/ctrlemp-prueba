import type { Employee } from "../types";
import { getAuthHeaders, handleHttpResponse } from "../utils";

const API_URL = import.meta.env.VITE_API_URL;

export const employeeService = {
    async getAll(departmentId?: number): Promise<Employee[]> {
        const url = departmentId 
            ? `${API_URL}/Employees/by-department/${departmentId}`
            : `${API_URL}/Employees`;

        const response = await fetch(url, { headers: getAuthHeaders() });
        await handleHttpResponse(response, 'Error al obtener la lista de empleados');
        return response.json();
    },

    async getById(id: number): Promise<Employee> {
        const response = await fetch(`${API_URL}/Employees/${id}`, { headers: getAuthHeaders() });
        await handleHttpResponse(response, 'Error al obtener el empleado');
        return response.json();
    },

    async create(employee: Employee): Promise<Employee> {
        const response = await fetch(`${API_URL}/Employees`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(employee),
        });
        await handleHttpResponse(response, 'Error al crear el empleado');
        return response.json();
    },

    async update(id: number, employee: Employee): Promise<void> {
        const response = await fetch(`${API_URL}/Employees/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(employee),
        });
        await handleHttpResponse(response, 'Error al actualizar el empleado');
    },

    async delete(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/Employees/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        await handleHttpResponse(response, 'Error al eliminar el empleado');
    }
};