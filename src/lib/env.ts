export const apiUrl = import.meta.env.VITE_API_URL as string;
export const frontendUrl = import.meta.env.VITE_FRONTEND_URL as string;
export const appName = import.meta.env.VITE_APP_NAME as string;
export const appDescription = import.meta.env.VITE_APP_DESCRIPTION as string;
export const backendUrl = apiUrl.replace('/api/v1','');