import { useState, useEffect, type SyntheticEvent, type ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    MenuItem, 
    Box, 
    Typography, 
    Alert,
    CircularProgress 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { employeeService } from '../../services/employeeService';
import { DEPARTMENT_CHOICES, POSITION_CHOICES } from '../../constants';
import type { Employee } from '../../types';
import { useSnackbar } from '../../hooks/useSnackbar';

export const EmployeeEditCustom = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const [formData, setFormData] = useState<Employee | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            employeeService.getById(Number(id))
                .then(data => {
                    setFormData(data);
                })
                .catch(err => {
                  showSnackbar(err.message || 'Error al obtener la información del empleado', 'error');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        
        setFormData(prev => prev ? ({
            ...prev,
            [name]: name === 'salary' || name === 'currentPositionId' || name === 'departmentId' 
                ? Number(value) 
                : value
        }) : null);
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id || !formData) return;

        setSubmitting(true);

        try {
            const selectedPosition = POSITION_CHOICES.find(p => p.id === formData.currentPositionId);
            const payload: Employee = {
                ...formData,
                currentPositionName: selectedPosition ? selectedPosition.name : 'Regular',
            };

            await employeeService.update(Number(id), payload);
            showSnackbar('Empleado actualizado satisfactoriamente', 'success');
            navigate('/employees');
        } catch (err: unknown) {
          const errorMessage = err instanceof Error 
              ? err.message 
              : 'Error al actualizar el empleado';

          showSnackbar(errorMessage, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!formData && !loading) {
        return (
            <Box sx={{ maxWidth: 600, margin: '2rem auto' }}>
                <Alert severity="error">{'No se encontró el empleado solicitado.'}</Alert>
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={() => navigate('/employees')}
                    sx={{ mt: 2 }}
                >
                    Volver
                </Button>
            </Box>
        );
    }

    return (
        <Card sx={{ maxWidth: 600, margin: '2rem auto' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5">Editar Empleado #{id}</Typography>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/employees')}>
                        Volver
                    </Button>
                </Box>

                {formData && (
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="ID"
                                value={formData.id ?? id}
                                disabled
                                fullWidth
                            />

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
                                {submitting ? 'Guardando Cambios...' : 'Actualizar Empleado'}
                            </Button>
                        </Box>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};