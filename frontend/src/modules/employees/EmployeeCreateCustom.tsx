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
    Alert 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { employeeService } from '../../services/employeeService';
import type { Employee } from '../../types';
import { DEPARTMENT_CHOICES, POSITION_CHOICES } from '../../constants';

export const EmployeeCreateCustom = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Employee>({
        name: '',
        salary: 0,
        currentPositionId: 1,
        departmentId: 1,
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        setErrorMsg(null);

        try {
            const selectedPosition = POSITION_CHOICES.find(p => p.id === formData.currentPositionId);
            const payload: Employee = {
                ...formData,
                currentPositionName: selectedPosition ? selectedPosition.name : 'Regular',
            };

            await employeeService.create(payload);

            navigate('/employees');
        } catch (err: any) {
            setErrorMsg(err.message || 'Error al guardar el empleado');
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

                {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Nombre Completo"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Salario Base (COP)"
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField
                            select
                            label="Cargo"
                            name="currentPositionId"
                            value={formData.currentPositionId}
                            onChange={handleChange}
                            required
                            fullWidth
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