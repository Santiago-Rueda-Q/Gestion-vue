//VITE_API_BACKEND=http://back.test/api

import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND, // Cambia por tu URL de Laravel
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  withCredentials: true,

  }
});

// Interceptor para requests (opcional - para tokens de autenticación)
api.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses (manejo de errores globales)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo global de errores
    if (error.response?.status === 401) {
      // Token expirado o no válido
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods para Users
export const userApi = {
  // Obtener lista de usuarios con filtros
  getUsers: async (params = {}) => {
    try {
      const response = await api.get('/users', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  },

  // Obtener datos para crear usuario
  getCreateData: async () => {
    try {
      const response = await api.get('/users/create');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo datos de creación:', error);
      throw error;
    }
  },

  // Crear nuevo usuario
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Para subir archivos
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creando usuario:', error);
      throw error;
    }
  },

  // Obtener usuario específico
  getUser: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  },

  // Obtener datos para editar usuario
  getEditData: async (id) => {
    try {
      const response = await api.get(`/users/${id}/edit`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo datos de edición:', error);
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  },

  // Eliminar usuario
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw error;
    }
  },

  // Cambiar estado del usuario
  toggleStatus: async (id) => {
    try {
      const response = await api.patch(`/users/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      console.error('Error cambiando estado:', error);
      throw error;
    }
  },

  // Obtener programas académicos por institución
  getAcademicPrograms: async (institutionId) => {
    try {
      const response = await api.get('/users/academic-programs', {
        params: { institution_id: institutionId }
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo programas:', error);
      throw error;
    }
  },

  // Operaciones masivas
  bulkAction: async (action, userIds) => {
    try {
      const response = await api.post('/users/bulk-action', {
        action,
        user_ids: userIds
      });
      return response.data;
    } catch (error) {
      console.error('Error en operación masiva:', error);
      throw error;
    }
  },

  // Obtener estadísticas
  getStatistics: async () => {
    try {
      const response = await api.get('/users/statistics');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }
};

export default api;