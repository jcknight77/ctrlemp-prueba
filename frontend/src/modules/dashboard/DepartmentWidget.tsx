import { useState } from 'react';
import { Card, CardContent, Typography, Select, MenuItem } from '@mui/material';
import { useEmployees } from '../../hooks/useEmployees';
import { DEPARTMENT_CHOICES } from '../../constants';

export const DepartmentWidget = () => {
    const [selectedDept, setSelectedDept] = useState<number>(1);
    const { employees, loading } = useEmployees(selectedDept);

    return (
        <Card sx={{ maxWidth: 400, m: 2 }}>
            <CardContent>
                <Typography variant="h6">Empleados por Departamento (con proyectos)</Typography>
                
                <Select 
                    value={selectedDept} 
                    onChange={(e) => setSelectedDept(Number(e.target.value))}
                    fullWidth
                    sx={{ my: 2 }}
                >
                  {DEPARTMENT_CHOICES.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                          {option.name}
                      </MenuItem>
                  ))}
                </Select>

                {loading ? (
                    <Typography>Cargando...</Typography>
                ) : (
                    <Typography variant="h4" color="primary">
                        Total: {employees.length} empleados
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};