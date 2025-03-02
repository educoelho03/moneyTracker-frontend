import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './app/components/Login';
import Signup from './app/components/Signup';
import HomePage from './app/components/HomePage';

// Componente de rota privada
const PrivateRoute = () => {
    const token = localStorage.getItem('jwtToken'); // Verifica se o token JWT está armazenado
    return token ? <Outlet /> : <Navigate to="/login" />; // Se autenticado, renderiza o componente filho; se nao, redireciona para o login
};

function App() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Rotas protegidas */}
            <Route path="/home" element={<PrivateRoute />}>
                <Route index element={<HomePage />} /> {/* Rota padrão para /home */}
            </Route>
        </Routes>
    );
}

export default App;