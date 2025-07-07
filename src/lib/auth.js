// Authentication utility functions

export const isAuthenticated = () => {
  try {
    const session = localStorage.getItem('barelytics_session');
    if (!session) return false;
    
    const parsedSession = JSON.parse(session);
    return !!parsedSession.access_token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const getAuthToken = () => {
  try {
    const session = localStorage.getItem('barelytics_session');
    if (session) {
      const parsedSession = JSON.parse(session);
      return parsedSession.access_token;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return null;
};

export const clearAuth = () => {
  localStorage.removeItem('barelytics_session');
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}; 