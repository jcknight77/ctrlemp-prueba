import type { Employee } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const employeeService = {
    async getAll(departmentId?: number): Promise<Employee[]> {
        const url = departmentId 
            ? `${API_URL}/Employees/by-department/${departmentId}`
            : `${API_URL}/Employees`;

        const response = await fetch(url, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Error al obtener la lista de empleados');
        return response.json();
    },

    async getById(id: number): Promise<Employee> {
        const response = await fetch(`${API_URL}/Employees/${id}`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Error al obtener el empleado');
        return response.json();
    },

    async create(employee: Employee): Promise<Employee> {
        const response = await fetch(`${API_URL}/Employees`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(employee),
        });
        if (!response.ok) throw new Error('Error al crear el empleado');
        return response.json();
    },

    async update(id: number, employee: Employee): Promise<void> {
        const response = await fetch(`${API_URL}/Employees/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(employee),
        });
        if (!response.ok) throw new Error('Error al actualizar el empleado');
    },

    async delete(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/Employees/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Error al eliminar el empleado');
    }
};