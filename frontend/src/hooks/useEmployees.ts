import { useState, useEffect, useCallback } from 'react';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';

export const useEmployees = (departmentId?: number) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await employeeService.getAll(departmentId);
            setEmployees(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar empleados');
        } finally {
            setLoading(false);
        }
    }, [departmentId]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const createEmployee = async (employee: Employee) => {
        await employeeService.create(employee);
        await fetchEmployees();
    };

    const updateEmployee = async (id: number, employee: Employee) => {
        await employeeService.update(id, employee);
        await fetchEmployees();
    };

    const deleteEmployee = async (id: number) => {
        await employeeService.delete(id);
        await fetchEmployees();
    };

    return {
        employees,
        loading,
        error,
        refetch: fetchEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
    };
};