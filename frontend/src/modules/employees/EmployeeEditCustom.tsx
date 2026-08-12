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

export const EmployeeEditCustom = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Employee | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            employeeService.getById(Number(id))
                .then(data => {
                    setFormData(data);
                })
                .catch(err => {
                    setErrorMsg(err.message || 'Error al obtener la información del empleado');
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
        setErrorMsg(null);

        try {
            // Mapear el nombre del cargo actualizado
            const selectedPosition = POSITION_CHOICES.find(p => p.id === formData.currentPositionId);
            const payload: Employee = {
                ...formData,
                currentPositionName: selectedPosition ? selectedPosition.name : 'Regular',
            };

            // 🚀 LLAMADA AL SERVICIO DIRECTO (PUT)
            await employeeService.update(Number(id), payload);

            // Redireccionar a la lista tras guardar exitosamente
            navigate('/employees');
        } catch (err: any) {
            setErrorMsg(err.message || 'Error al actualizar el empleado');
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
                <Alert severity="error">{errorMsg || 'No se encontró el empleado solicitado.'}</Alert>
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

                {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

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
                                {submitting ? 'Guardando Cambios...' : 'Actualizar Empleado'}
                            </Button>
                        </Box>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};