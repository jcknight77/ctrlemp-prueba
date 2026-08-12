import type { AuthProvider } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL;

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const request = new Request(`${API_URL}/Auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Credenciales inválidas');
        }

        const { token } = await response.json();
        localStorage.setItem('token', token);
    },

    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => Promise.resolve(),
};