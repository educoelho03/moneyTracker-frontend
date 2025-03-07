import "../../styles/defaultLogin.css";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React from 'react';

export default function Signup() {
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

    const handleShowSuccessAlert = (message: string, onCloseCallback?: () => void) => {
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

        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const repeatPassword = (document.getElementById("repeat-password") as HTMLInputElement).value;

        console.log("Valores do formulário:", { name, email, password, repeatPassword });

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

            handleShowSuccessAlert("Cadastro realizado com sucesso!", () => {
                handleRedirectToLogin(); // Redireciona para a página de login
            });
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error);
            handleShowAlert("Falha ao realizar o cadastro.");
        }
    };

    return (
        <>
        <ToastContainer /> 
                <main>
            <section className="form-section">
                <img src="src/assets/svg/logo.svg" alt="Logo" />
                <h2>Signup your Account</h2>

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
                        <button type="submit" className="btn-primary">
                            Sign Up
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
                <h1>You should, moveIT!</h1>
                <img src="src/assets/svg/main-ilustration.svg" alt="Main Illustration" />
            </section>
        </main>
        </>
    );
}