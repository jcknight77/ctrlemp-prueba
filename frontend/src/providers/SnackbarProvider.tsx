import React, { useState, type ReactNode } from 'react';
import { Snackbar, Alert, type AlertColor } from '@mui/material';
import { SnackbarContext } from '../context/SnackbarContext';

interface SnackbarProviderProps {
    children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<AlertColor>('success');

    const showSnackbar = (msg: string, sev: AlertColor = 'success') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};