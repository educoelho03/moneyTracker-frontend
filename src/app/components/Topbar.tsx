import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import LogoutModal from "./LogoutModal";

import "../../styles/topbar.css";

export default function Topbar() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const userName = localStorage.getItem("name");
    const navigate = useNavigate();

    const closeModal = () => {
        setModalOpen(false);
    }

    const openModal = () => {
        setModalOpen(true);
    }

    return (
        <div className="topbar-container">
            <div className="topbar-content">
                <img src="src/assets/svg/money-tracker-logo.png" className="topbar-logo-image" alt="Logo" />
                <div className="topbar-links">
                    <button onClick={() => navigate("/dashboard")}>Dashboard</button> 
                    <button onClick={() => navigate("/transacoes")}>Transações</button>
                </div>
                <div className="topbar-user">
                    <button onClick={openModal}>Olá, {userName}</button>
                </div>
            </div>

            {modalOpen && <LogoutModal onClose={closeModal} />}
        </div>
    );
}