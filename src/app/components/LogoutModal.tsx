import { useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../../styles/logoutModal.css";

interface LogoutModalProps {
    onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const name = localStorage.getItem("name") ?? "Usuário";
    const email = localStorage.getItem("email") ?? "E-mail não disponível";

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        onClose();
    };

    return (
        <div className="modal-container">
            <div className="logout-modal-content">
                <div className="user-preview">
                    <span className="user-name">{name}</span>
                    <span className="user-email">{email}</span>
                </div>
                <button className="btn-sign-out" onClick={handleLogout}>
                    <MdLogout className="logout-icon" />
                    <span>Sign out</span>
                </button>
            </div>
        </div>
    );
};

export default LogoutModal;