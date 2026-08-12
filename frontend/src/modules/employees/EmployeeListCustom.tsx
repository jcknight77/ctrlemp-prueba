import { useNavigate } from 'react-router-dom';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    CircularProgress, 
    Alert, 
    Button, 
    IconButton, 
    Box, 
    Tooltip, 
    Stack 
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useEmployees } from '../../hooks/useEmployees';

export const EmployeeListCustom = () => {
    const navigate = useNavigate();
    const { employees, loading, error, deleteEmployee, refetch } = useEmployees();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/employees/create')}
                >
                    Crear Empleado
                </Button>

                <Button 
                    variant="outlined" 
                    startIcon={<RefreshIcon />} 
                    onClick={refetch}
                >
                    Recargar
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Departamento</TableCell>
                            <TableCell align="right">Salario Base</TableCell>
                            <TableCell align="right">Bono Anual</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow 
                                key={emp.id} 
                                hover
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/employees/${emp.id}`)}
                            >
                                <TableCell>{emp.id}</TableCell>
                                <TableCell>{emp.name}</TableCell>
                                <TableCell>{emp.departmentName}</TableCell>
                                <TableCell align="right">${emp.salary?.toLocaleString('es-CO')}</TableCell>
                                <TableCell align="right">${emp.annualBonus?.toLocaleString('es-CO')}</TableCell>
                                
                                <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                  <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                                      <Tooltip title="Editar">
                                          <IconButton 
                                              color="primary" 
                                              size="small"
                                              onClick={() => navigate(`/employees/${emp.id}`)}
                                          >
                                              <EditIcon fontSize="small" />
                                          </IconButton>
                                      </Tooltip>

                                      <Tooltip title="Eliminar">
                                          <IconButton 
                                              color="error" 
                                              size="small"
                                              onClick={() => emp.id && deleteEmployee(emp.id)}
                                          >
                                              <DeleteIcon fontSize="small" />
                                          </IconButton>
                                      </Tooltip>
                                  </Stack>
                              </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};