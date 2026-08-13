import { useContext } from 'react';
import { SnackbarContext } from '../context/SnackbarContext';
import type { SnackbarContextType } from '../types';

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar debe usarse dentro de un SnackbarProvider');
    }
    return context;
};