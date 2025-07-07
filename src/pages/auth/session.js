// src/features/auth/session.js
export const saveSession = (session) => {
    localStorage.setItem('barelytics_session', JSON.stringify(session));
  };
  
  export const loadSession = () => {
    const data = localStorage.getItem('barelytics_session');
    return data ? JSON.parse(data) : null;
  };
  
  export const clearSession = () => {
    localStorage.removeItem('barelytics_session');
  };