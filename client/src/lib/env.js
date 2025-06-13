const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "Please define the VITE_API_URL environment variable inside .env<development/production>.local"
  );
}

const AUTH_BASE = `${API_URL}/api/v1/auth`;
const USER_BASE = `${API_URL}/api/v1/users`;
const TASK_BASE = `${API_URL}/api/v1/tasks`;

export { AUTH_BASE, USER_BASE, TASK_BASE };
