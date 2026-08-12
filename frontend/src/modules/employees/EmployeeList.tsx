import {
    List,
    Datagrid,
    TextField,
    NumberField,
    Filter,
    SelectInput
} from 'react-admin';
import { DEPARTMENT_CHOICES } from '../../constants';

const EmployeeFilter = (props: any) => (
    <Filter {...props}>
        <SelectInput 
            label="Departamento" 
            source="departmentId" 
            choices={[...DEPARTMENT_CHOICES]} 
            alwaysOn 
        />
    </Filter>
);

export const EmployeeList = () => (
    <List filters={<EmployeeFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="name" label="Nombre" />
            <TextField source="departmentName" label="Departamento" />
            <NumberField 
                source="salary" 
                label="Salario Base" 
                options={{ style: 'currency', currency: 'COP' }} 
            />
            <NumberField 
                source="annualBonus" 
                label="Bono Anual Calculado" 
                options={{ style: 'currency', currency: 'COP' }} 
            />
        </Datagrid>
    </List>
);