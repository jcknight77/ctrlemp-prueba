import { createContext } from 'react';
import type { SnackbarContextType } from '../types';

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);