import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    SelectInput
} from 'react-admin';
import { DEPARTMENT_CHOICES, POSITION_CHOICES } from '../../constants';

export const EmployeeEdit = () => {
    const transform = (data: any) => {
        const selectedPosition = POSITION_CHOICES.find(p => p.id === data.currentPositionId);
        return {
            ...data,
            currentPositionName: selectedPosition ? selectedPosition.name : 'Regular',
        };
    };

    return (
        <Edit transform={transform}>
            <SimpleForm>
                <TextInput source="id" label="ID Empleado" disabled fullWidth />
                <TextInput source="name" label="Nombre Completo" fullWidth required />
                <NumberInput source="salary" label="Salario Base (COP)" fullWidth required />
                
                <SelectInput 
                    source="currentPositionId" 
                    label="Cargo" 
                    choices={[...POSITION_CHOICES]} 
                    fullWidth 
                    required 
                />

                <SelectInput 
                    source="departmentId" 
                    label="Departamento" 
                    choices={[...DEPARTMENT_CHOICES]} 
                    fullWidth 
                    required 
                />
            </SimpleForm>
        </Edit>
    );
};