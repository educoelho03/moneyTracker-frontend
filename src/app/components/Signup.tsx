import  React, { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from "axios";

import "../../styles/defaultLogin.css";


export default function Signup() {
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

        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const repeatPassword = (document.getElementById("repeat-password") as HTMLInputElement).value;7

        if (password !== repeatPassword) {
            handleShowAlert("As senhas precisam ser iguais.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/register", {
                name,
                email,
                password,
            });

            localStorage.setItem("name", name);

            handleShowSuccess("Cadastro realizado com sucesso!", () => {
                handleRedirectToLogin(); 
            });
        } catch (error: any) {
            handleShowAlert("Falha ao realizar o cadastro.");
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
        <ToastContainer /> 
            <main>
            <section className="form-section">
                <img src="src/assets/svg/money-tracker-logo.png" className="logo-sigunp-image" alt="Logo" />
                <h2 style={{marginBottom: '15px'}}>Signup your Account</h2>

                <form onSubmit={handleSubmit}>
                    {/* Campos do formulário */}
                    <div className="input-wrapper">
                        <label htmlFor="name">Name</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="name"
                                placeholder="Your name"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-container">
                            <input
                                type="email"
                                id="email"
                                placeholder="yourEmail@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <div className="input-container">
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                id="repeat-password"
                                placeholder="Repeat your password"
                                required
                            />
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="btn-wrapper">

                        <button type="submit" className="btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress size={20} sx={{ color: 'white' }} />
                                </Box>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                        <div className="divider">
                            <div></div>
                            <span>or</span>
                            <div></div>
                        </div>
                        <button
                            type="button" // Evita que o botão envie o formulário
                            className="btn-secondary"
                            onClick={handleRedirectToLogin}
                        >
                            Login
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