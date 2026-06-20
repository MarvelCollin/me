import { createContext, useContext } from 'react';

export const ToastCtx = createContext<(message: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);
