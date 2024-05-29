export const isAuthenticated = () => {
  return !!localStorage.getItem('username');
};

export const login = (username: string) => {
  localStorage.setItem('username', username);
};

export const logout = () => {
  localStorage.removeItem('username');
};
