import type { AlertColor } from '@mui/material';

export interface SnackbarContextType {
    showSnackbar: (message: string, severity?: AlertColor) => void;
}