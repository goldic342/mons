const API_URL = import.meta.env.VITE_API_URL;

export const authProvider = {
  login: async ({ username, password }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    return Promise.resolve();
  },

  logout: async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return Promise.resolve();
  },

  checkAuth: async () => {
    const res = await fetch(`${API_URL}/auth/check`, {
      method: "GET",
      credentials: "include",
    });

    return res.ok ? Promise.resolve() : Promise.reject();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};
