import { useEffect, useState } from 'react';
import {
    obtenerRoles,
    crearRol,
    actualizarRol,
    eliminarRol
} from '../services/roles';

function Roles() {
    const [roles, setRoles] = useState([]);
    const [nombre, setNombre] = useState('');
    const [idEditar, setIdEditar] = useState(null);
    const [cargando, setCargando] = useState(true);

    const cargarRoles = async () => {
        try {
            const respuesta = await obtenerRoles();
            setRoles(respuesta.data);
        } catch (error) {
            console.error('Error al cargar roles:', error);
            alert('No se pudieron cargar los roles');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarRoles();
    }, []);

    const guardarRol = async (e) => {
        e.preventDefault();

        try {
            if (idEditar) {
                await actualizarRol(idEditar, { nombre });
            } else {
                await crearRol({ nombre });
            }

            setNombre('');
            setIdEditar(null);
            cargarRoles();
        } catch (error) {
            console.error(error);
            alert('Error al guardar el rol');
        }
    };

    const editarRol = (rol) => {
        setIdEditar(rol.id);
        setNombre(rol.nombre);
    };

    const borrarRol = async (id) => {
        if (!window.confirm('¿Deseas eliminar este rol?')) return;

        try {
            await eliminarRol(id);
            cargarRoles();
        } catch (error) {
            console.error(error);
            alert('Error al eliminar el rol');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Roles</h2>

            <form onSubmit={guardarRol} className="mb-4">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre del rol"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <button className="btn btn-primary" type="submit">
                    {idEditar ? 'Actualizar rol' : 'Guardar rol'}
                </button>

                {idEditar && (
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setIdEditar(null);
                            setNombre('');
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <h4>Lista de roles</h4>

            {cargando ? (
                <p>Cargando roles...</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {roles.map((rol) => (
                            <tr key={rol.id}>
                                <td>{rol.id}</td>
                                <td>{rol.nombre}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editarRol(rol)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => borrarRol(rol.id)}
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

export default Roles;