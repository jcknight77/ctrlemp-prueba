import { ApiError } from "../types";

export const handleHttpResponse = async (response: Response, defaultErrorMessage: string): Promise<void> => {
    if (!response.ok) {
        if (response.status === 403) {
            throw new ApiError('No tienes permisos para realizar esta acción', 403);
        }
        if (response.status === 401) {
            throw new ApiError('Sesión expirada o no autorizada', 401);
        }

        try {
            const errorData = await response.json();
            if (errorData?.message) {
                throw new ApiError(errorData.message, response.status);
            }
        } catch (_) {
        }

        throw new ApiError(defaultErrorMessage, response.status);
    }
};