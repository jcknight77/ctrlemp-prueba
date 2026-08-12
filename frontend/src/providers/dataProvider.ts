import type { DataProvider } from 'react-admin';
import { fetchUtils } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL;

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    if (token) {
        (options.headers as Headers).set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        let url = `${API_URL}/${resource}`;

        if (params.filter && params.filter.departmentId) {
            url = `${API_URL}/${resource}/by-department/${params.filter.departmentId}`;
        }

        const { json } = await httpClient(url);

        return {
            data: json,
            total: json.length,
        };
    },

    getOne: async (resource, params) => {
        const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`);
        return { data: json };
    },

    getMany: async (resource, params) => {
        const { json } = await httpClient(`${API_URL}/${resource}`);
        return { data: json.filter((item: any) => params.ids.includes(item.id)) };
    },

    getManyReference: async (resource, params) => {
        const { json } = await httpClient(`${API_URL}/${resource}`);
        return { data: json, total: json.length };
    },

    create: async (resource, params) => {
        const { json } = await httpClient(`${API_URL}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return { data: json };
    },

    update: async (resource, params) => {
        const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        const updatedData = json ?? { ...params.data, id: params.id };
        return { data: updatedData as any };
    },

    updateMany: async (resource, params) => {
        await Promise.all(
            params.ids.map(id =>
                httpClient(`${API_URL}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        );
        return { data: params.ids };
    },

    delete: async (resource, params) => {
        await httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: params.previousData as any };
    },

    deleteMany: async (resource, params) => {
        await Promise.all(
            params.ids.map(id =>
                httpClient(`${API_URL}/${resource}/${id}`, { method: 'DELETE' })
            )
        );
        return { data: params.ids };
    }
};