import { useNavigate } from "react-router-dom"; 

import "../../styles/topbar.css";

export default function Topbar() {
    const userName = localStorage.getItem("name");
    const navigate = useNavigate();

    return (
        <div className="topbar-container">
            <div className="topbar-content">
                <img src="src/assets/svg/money-tracker-logo.png" className="topbar-logo-image" alt="Logo" />
                <div className="topbar-links">
                    <button onClick={() => navigate("/dashboard")}>Dashboard</button> 
                    <button onClick={() => navigate("/transacoes")}>Transações</button>
                </div>
                <div className="topbar-user">
                    <span>Olá, {userName}</span>
                </div>
            </div>
        </div>
    );
}