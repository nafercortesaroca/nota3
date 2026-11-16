
import { useEffect, useState } from 'react';
import {
    obtenerTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea
} from '../services/tareas';

function Tareas() {
    const [tareas, setTareas] = useState([]);
    const [idEditar, setIdEditar] = useState(null);
    const [cargando, setCargando] = useState(true);

    const formularioInicial = {
        titulo: '',
        descripcion: '',
        fecha_entrega: '',
        estado: 'Pendiente',
        id_categoria: '',
        id_materia: '',
        id_usuario: ''
    };

    const [formulario, setFormulario] = useState(formularioInicial);

    const cargarTareas = async () => {
        try {
            const respuesta = await obtenerTareas();
            setTareas(respuesta.data.data);
        } catch (error) {
            console.error('Error al cargar tareas:', error);
            alert('No se pudieron cargar las tareas');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    const manejarCambio = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const guardarTarea = async (e) => {
        e.preventDefault();

        const datos = {
            ...formulario,
            id_categoria: Number(formulario.id_categoria),
            id_materia: Number(formulario.id_materia),
            id_usuario: Number(formulario.id_usuario)
        };

        try {
            if (idEditar !== null) {
                await actualizarTarea(idEditar, datos);
            } else {
                await crearTarea(datos);
            }

            setFormulario(formularioInicial);
            setIdEditar(null);
            await cargarTareas();

            alert('Tarea guardada correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al guardar la tarea. Revisa los campos obligatorios.');
        }
    };

    const editarTarea = (tarea) => {
        setIdEditar(tarea.id_tarea);

        setFormulario({
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fecha_entrega: tarea.fecha_entrega?.substring(0, 10),
            estado: tarea.estado,
            id_categoria: tarea.id_categoria,
            id_materia: tarea.id_materia,
            id_usuario: tarea.id_usuario
        });
    };

    const borrarTarea = async (id) => {
        if (!window.confirm('¿Deseas eliminar esta tarea?')) return;

        try {
            await eliminarTarea(id);
            await cargarTareas();
            alert('Tarea eliminada correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al eliminar la tarea');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Tareas</h2>

            <form onSubmit={guardarTarea} className="mb-4">

                <input
                    className="form-control mb-2"
                    name="titulo"
                    placeholder="Título de la tarea"
                    value={formulario.titulo}
                    onChange={manejarCambio}
                    required
                />

                <textarea
                    className="form-control mb-2"
                    name="descripcion"
                    placeholder="Descripción"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    required
                />

                <label>Fecha de entrega</label>
                <input
                    type="date"
                    className="form-control mb-2"
                    name="fecha_entrega"
                    value={formulario.fecha_entrega}
                    onChange={manejarCambio}
                    required
                />

                <select
                    className="form-control mb-2"
                    name="estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                    required
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completada">Completada</option>
                </select>

                <input
                    type="number"
                    className="form-control mb-2"
                    name="id_categoria"
                    placeholder="ID de categoría"
                    value={formulario.id_categoria}
                    onChange={manejarCambio}
                    required
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    name="id_materia"
                    placeholder="ID de materia"
                    value={formulario.id_materia}
                    onChange={manejarCambio}
                    required
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    name="id_usuario"
                    placeholder="ID de usuario"
                    value={formulario.id_usuario}
                    onChange={manejarCambio}
                    required
                />

                <button className="btn btn-primary" type="submit">
                    {idEditar !== null ? 'Actualizar tarea' : 'Guardar tarea'}
                </button>

                {idEditar !== null && (
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setIdEditar(null);
                            setFormulario(formularioInicial);
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <h4>Lista de tareas</h4>

            {cargando ? (
                <p>Cargando tareas...</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tareas.map((tarea) => (
                            <tr key={tarea.id_tarea}>
                                <td>{tarea.id_tarea}</td>
                                <td>{tarea.titulo}</td>
                                <td>{tarea.fecha_entrega}</td>
                                <td>{tarea.estado}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editarTarea(tarea)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => borrarTarea(tarea.id_tarea)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Tareas;
