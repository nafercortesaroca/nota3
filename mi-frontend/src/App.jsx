
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Roles from './pages/Roles';
import Tareas from './pages/Tareas';

function Inicio() {
    return (
        <div className="container mt-4">
            <h2>Bienvenido a mi Gestor de Tareas</h2>
            <p>Administra tus roles y tareas desde esta aplicación.</p>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="container mt-4">
                <h1>Gestor de Tareas</h1>

                <nav className="mb-3">
                    <Link to="/" className="me-3">Inicio</Link>
                    <Link to="/roles" className="me-3">Roles</Link>
                    <Link to="/tareas">Tareas</Link>
                </nav>

                <hr />

                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/tareas" element={<Tareas />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
