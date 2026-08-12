### Documentación

## Pasos Ejecución
1. Tener instalada una versión de nodeJS reciente (ej: 25.9.0)
2. Una vez clonado el repositorio de github, dentro de la carpeta frontend deberá renombrar el archivo .env-example con el nombre .env
3. Abrir una consola de Terminal o Símbolo del Sistema (CMD)
4. Ubicarse en la ruta de la carpeta frontend
5. Ejecutar la siguiente instrucción: npm install
6. Ejecutar el proyecto con la siguiente instrucción: npm run dev
7. Credenciales Inicio de Sesión:
  - Usuario con Role Admin:
    - Usuario: admin
    - Contraseña: admin123
  - Usuario con Role User:
    - Usuario: user
    - Contraseña: user123


## 🛠️ Stack Tecnológico

- **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Framework de Administración:** [React Admin v5](https://marmelab.com/react-admin/)
- **Herramienta de Construcción / Bundler:** [Vite 8](https://vitejs.dev/)
- **UI & Estilos:** [Material UI (MUI v9)](https://mui.com/) + Emotion
- **Linter:** [Oxlint](https://github.com/oxc-project/oxc)
- **Gestor de Paquetes:** `npm`

## 📁 Arquitectura y Estructura del Proyecto

El código fuente principal habita bajo la carpeta `src/`, organizada según el patrón **Modular por Dominio / Capas**, separando responsabilidades técnicas (servicios, proveedores, hooks) de los módulos funcionales del negocio (`modules/`).


Plaintext

```
src/
├── assets/                 # Recursos estáticos (imágenes, SVGs)
├── constants/              # Constantes globales y de módulos (ej. valores por defecto, enums)
│   ├── employee.constants.ts
│   └── index.ts
├── hooks/                  # Custom Hooks reutilizables de React
│   └── useEmployees.ts
├── modules/                # Módulos del negocio (Vistas y Componentes)
│   ├── dashboard/          # Componentes del Dashboard principal
│   │   └── DepartmentWidget.tsx
│   └── employees/          # Módulo de administración de empleados
│       ├── EmployeeCreate.tsx
│       ├── EmployeeCreateCustom.tsx
│       ├── EmployeeEdit.tsx
│       ├── EmployeeEditCustom.tsx
│       ├── EmployeeList.tsx
│       ├── EmployeeListCustom.tsx
│       └── index.ts
├── providers/              # Capa de integración con React Admin
│   ├── authProvider.ts     # Gestión de autenticación, tokens y sesiones
│   ├── dataProvider.ts     # Adaptador HTTP para conectar la API backend con React Admin
│   └── i18nProvider.ts     # Configuración de localización e idioma (Español)
├── services/               # Llamadas a API REST fuera del ciclo de React Admin
│   └── employeeService.ts
├── types/                  # Definiciones de TypeScript e interfaces del dominio
│   ├── employee.types.ts
│   └── index.ts
├── App.tsx                 # Configuración del componente <Admin> principal
├── App.css / index.css     # Estilos globales de la aplicación
├── main.tsx                # Punto de entrada de la aplicación React
└── ra-language-spanish.d.ts # Declaración de tipos para el paquete de idioma
```

## 🔑 Conceptos Clave de la Arquitectura

1. **Providers (React Admin):**
      - **`dataProvider.ts`:** Actúa como conector entre las solicitudes de React Admin (`getList`, `getOne`, `create`, `update`, `delete`) y la API backend configurada (`VITE_API_URL`).
    - **`authProvider.ts`:** Controla los permisos, login, logout y verificación de sesión en la aplicación.
    - **`i18nProvider.ts`:** Configura el soporte de traducción al español (`ra-language-spanish`).
        
2. **Módulos (`src/modules/`):**
    - **`employees`:** Contiene las vistas CRUD para empleados. Cuenta con implementaciones estándar de React Admin (`EmployeeList`, `EmployeeEdit`, `EmployeeCreate`) y vistas personalizadas (`*Custom.tsx`) para flujos complejos que requieren componentes a medida.
    - **`dashboard`:** Aloja widgets informativos para el panel inicial (ej. `DepartmentWidget.tsx`).
        
3. **Tipado Estricto (`src/types/`):**
    - Todas las entidades (empleados, departamentos, contratos, respuestas de API) están tipadas mediante TypeScript para garantizar seguridad durante el desarrollo.
        
          
        

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz de la carpeta `frontend/` (o modifica el existente):


Fragmento de código

```
# URL base de la API Backend (C# / .NET Core u otra API REST)
VITE_API_URL=http://localhost:5262/api
```

## 🚦 Comandos de Desarrollo

Asegúrate de tener instalado **Node.js** (versión LTS recomendada).

  

### 1. Instalación de dependencias

Bash

```
npm install
```

### 2. Iniciar el servidor de desarrollo

Lanza la aplicación localmente mediante Vite con HMR (_Hot Module Replacement_):

  

Bash

```
npm run dev
```


## 📜 Convenciones de Código

- **Archivos y Componentes:** Nombres en **PascalCase** para componentes React (`EmployeeList.tsx`, `DepartmentWidget.tsx`).
- **Archivos Utilitarios / Hooks:** Nombres en **camelCase** (`authProvider.ts`, `useEmployees.ts`).
- **Tipos e Interfaces:** Define exportaciones agrupadas desde `src/types/index.ts` para simplificar importaciones.