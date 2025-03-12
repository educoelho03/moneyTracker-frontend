import  React, { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from "axios";

import "../../styles/defaultLogin.css";


export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    const handleRedirectToLogin = () => {
        navigate('/login'); 
    };

    const handleShowAlert = (message: string, onCloseCallback?: () => void) => {
        toast.error(message, {
            position: "top-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
            onClose: onCloseCallback, 
        });
    };
    


    const handleShowSuccess = (message: string, onCloseCallback?: () => void) => {
        toast.success(message, {
            position: "top-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
            onClose: onCloseCallback, 
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)


        const newPassword = (document.getElementById("password") as HTMLInputElement).value;
        const confirmNewPassword = (document.getElementById("repeat-password") as HTMLInputElement).value;
        const recoverEmail = localStorage.getItem('email');


        if (newPassword !== confirmNewPassword) {
            handleShowAlert("As senhas precisam ser iguais.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/user/reset-password", {
                email: recoverEmail,
                newPassword,
                confirmNewPassword
            });

            handleShowSuccess("Senha Alterada com sucesso!", () => {
                handleRedirectToLogin(); 
            });
        } catch (error: any) {
            console.log(error);
            handleShowAlert("Falha ao alterar a senha.");
        } finally {
            setIsLoading(false)
            localStorage.clear();
        }
    };

    return (
        <>
        <ToastContainer /> 
            <main>
            <section className="form-section">
                <img src="src/assets/svg/money-tracker-logo.png" className="logo-sigunp-image" alt="Logo" />
                <h2 style={{marginBottom: '15px'}}>Reset Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <div className="input-container">
                            <input
                                type="password"
                                id="password"
                                placeholder="New password"
                                required
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                id="repeat-password"
                                placeholder="Repeat your new password"
                                required
                            />
                        </div>
                    </div>

                    <div className="btn-wrapper">
                        <button type="submit" className="btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress size={20} sx={{ color: 'white' }} />
                                </Box>
                            ) : (
                                "Confirm"
                            )}
                        </button>
                    </div>
                </form>
            </section>
            <section className="main-section">
                <h1>Track your money, Now !!</h1>
                <img src="src/assets/svg/main-ilustration.svg" alt="Main Illustration" />
            </section>
        </main>
        </>
    );
}