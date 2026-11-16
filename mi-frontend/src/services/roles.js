import api from '../api/axiosConfig';

// Obtener todos los roles
export const obtenerRoles = () => api.get('/roles');

// Obtener un rol por ID
export const obtenerRol = (id) => api.get(`/roles/${id}`);

// Crear un rol
export const crearRol = (datos) => api.post('/roles', datos);

// Actualizar un rol
export const actualizarRol = (id, datos) => api.put(`/roles/${id}`, datos);

// Eliminar un rol
export const eliminarRol = (id) => api.delete(`/roles/${id}`);