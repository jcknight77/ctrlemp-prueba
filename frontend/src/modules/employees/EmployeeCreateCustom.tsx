import { useState, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    MenuItem, 
    Box, 
    Typography, 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { employeeService } from '../../services/employeeService';
import { DEPARTMENT_CHOICES, POSITION_CHOICES } from '../../constants';
import { useSnackbar } from '../../hooks/useSnackbar';
import type { Employee } from '../../types';

export const EmployeeCreateCustom = () => {
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const [formData, setFormData] = useState<Employee>({
        name: '',
        salary: 0,
        currentPositionId: 1,
        departmentId: 1,
    });
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'salary' || name === 'currentPositionId' || name === 'departmentId' 
                ? Number(value) 
                : value
        }));
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const selectedPosition = POSITION_CHOICES.find(p => p.id === formData.currentPositionId);
            const payload: Employee = {
                ...formData,
                currentPositionName: selectedPosition ? selectedPosition.name : 'Regular',
            };

            await employeeService.create(payload);

            showSnackbar('Empleado guardado satisfactoriamente', 'success');
            navigate('/employees');
        } catch (err: unknown) {
          const errorMessage = err instanceof Error 
              ? err.message 
              : 'Error al guardar el empleado';

          showSnackbar(errorMessage, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card sx={{ maxWidth: 600, margin: '2rem auto' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">Crear Nuevo Empleado</Typography>
              <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/employees')}>
                  Volver
              </Button>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nombre Completo"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    disabled={submitting}
                />

                <TextField
                    label="Salario Base (COP)"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    fullWidth
                    disabled={submitting}
                />

                <TextField
                    select
                    label="Cargo"
                    name="currentPositionId"
                    value={formData.currentPositionId}
                    onChange={handleChange}
                    required
                    fullWidth
                    disabled={submitting}
                >
                    {POSITION_CHOICES.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Departamento"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                    fullWidth
                    disabled={submitting}
                >
                    {DEPARTMENT_CHOICES.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>

                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    disabled={submitting}
                    sx={{ mt: 2 }}
                >
                    {submitting ? 'Guardando...' : 'Guardar Empleado'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
    );
};