import api from '../api/axiosConfig';

// Obtener todas las tareas
export const obtenerTareas = () => api.get('/tareas');

// Obtener una tarea por ID
export const obtenerTarea = (id) => api.get(`/tareas/${id}`);

// Crear una tarea
export const crearTarea = (datos) => api.post('/tareas', datos);

// Actualizar una tarea
export const actualizarTarea = (id, datos) => api.put(`/tareas/${id}`, datos);

// Eliminar una tarea
export const eliminarTarea = (id) => api.delete(`/tareas/${id}`);