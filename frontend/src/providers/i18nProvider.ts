import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from 'ra-language-spanish';

const customSpanishMessages = {
    ...spanishMessages,
    ra: {
        ...spanishMessages.ra,
        auth: {
            ...spanishMessages.ra?.auth,
            auth_check_error: 'Error de autenticación. Por favor vuelva a iniciar sesión.',
            user_menu: 'Perfil',
            logout: 'Cerrar sesión',
        },
        action: {
            ...spanishMessages.ra?.action,
            export: 'Exportar',
            create: 'Crear',
            edit: 'Editar',
            delete: 'Eliminar',
            save: 'Guardar',
            cancel: 'Cancelar',
            show: 'Mostrar',
            list: 'Listar',
            search: 'Buscar',
            clear_input_value: 'Limpiar',
        },
        page: {
            ...spanishMessages.ra?.page,
            list: 'Lista de %{name}',
            edit: '%{name} #%{id}',
            create: 'Crear %{name}',
            show: '%{name} #%{id}',
        },
        navigation: {
            ...spanishMessages.ra?.navigation,
            page_rows_per_page: 'Filas por página:',
        }
    },
};

export const i18nProvider = polyglotI18nProvider(
    () => customSpanishMessages,
    'es'
);