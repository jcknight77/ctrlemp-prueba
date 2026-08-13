import { useState, useEffect, useCallback } from 'react';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';
import { useSnackbar } from './useSnackbar';

export const useEmployees = (departmentId?: number) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();

    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await employeeService.getAll(departmentId);
            setEmployees(data);
        } catch (err: unknown) {
          const message = err instanceof Error 
              ? err.message 
              : 'Error al cargar empleados';
              
          setError(message);
          showSnackbar(message, 'error');
        } finally {
            setLoading(false);
        }
    }, [departmentId, showSnackbar]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const createEmployee = async (employee: Employee): Promise<void> => {
        try {
            await employeeService.create(employee);
            showSnackbar('Empleado creado con éxito', 'success');
            await fetchEmployees();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error al crear el empleado';
            showSnackbar(message, 'error');
            throw err;
        }
    };

    const updateEmployee = async (id: number, employee: Employee): Promise<void> => {
        try {
            await employeeService.update(id, employee);
            showSnackbar('Empleado actualizado con éxito', 'success');
            await fetchEmployees();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error al actualizar el empleado';
            showSnackbar(message, 'error');
            throw err;
        }
    };

    const deleteEmployee = async (id: number): Promise<void> => {
        try {
            await employeeService.delete(id);
            await fetchEmployees();
            // setEmployees(prev => prev.filter(emp => emp.id !== id));
            showSnackbar('Empleado eliminado correctamente', 'success');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error al eliminar el empleado';
            showSnackbar(message, 'error');
            throw err;
        }
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