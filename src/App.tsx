import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DashboardPage from './app/pages/DashboardPage';
import TransactionPage from './app/pages/TransactionPage';
import LoginPage from './app/pages/LoginPage';
import SignupPage from './app/pages/SignupPage';
import ForgotPasswordPage from './app/pages/ForgotPasswordPage';
import ResetPasswordPage from './app/pages/ResetPasswordPage.tsx';

// Componente de rota privada
const PrivateRoute = () => {
    const token = localStorage.getItem('jwtToken'); // Verifica se o token JWT está armazenado
    return token ? <Outlet /> : <Navigate to="/login" />; // Se autenticado, renderiza o componente filho; se nao, redireciona para o login
};

function App() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Rotas protegidas */}
            <Route path="/dashboard" element={<PrivateRoute />}>
                <Route index element={<DashboardPage />} /> 
            </Route>
            <Route path="/transacoes" element={<PrivateRoute />}>
                <Route index element={<TransactionPage />} /> 
            </Route>
        </Routes>
    );
}

export default App;