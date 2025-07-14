// src/features/auth/session.js
export const saveSession = (session) => {
    localStorage.setItem('pm_session', JSON.stringify(session));
  };
  
  export const loadSession = () => {
    const data = localStorage.getItem('pm_session');
    return data ? JSON.parse(data) : null;
  };
  
  export const clearSession = () => {
    localStorage.removeItem('pm_session');
  };