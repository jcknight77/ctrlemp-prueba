import { Admin, Resource } from 'react-admin';
import UserIcon from '@mui/icons-material/People';
import { dataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';
import { i18nProvider } from './providers/i18nProvider';
import { DepartmentWidget } from './modules/dashboard/DepartmentWidget';
import { EmployeeCreateCustom, EmployeeEditCustom, EmployeeListCustom } from './modules/employees';

export const App = () => (
    <Admin dashboard={DepartmentWidget} dataProvider={dataProvider} authProvider={authProvider} i18nProvider={i18nProvider} title="Gestión de Empleados">
        <Resource
            name="employees"
            list={EmployeeListCustom}
            create={EmployeeCreateCustom}
            edit={EmployeeEditCustom}
            icon={UserIcon}
            options={{ label: 'Empleados' }}
        />
    </Admin>
);

export default App;