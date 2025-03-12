import React, { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

import "../../styles/defaultLogin.css";
import ResetPassword from "./ResetPassword";


export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const handleShowAlert = (message: string, type: 'success' | 'error') => {
        toast[type](message, {
            position: "top-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post('http://localhost:8080/api/mail/send', {
                email: email,
            });
            console.log(email);
            localStorage.setItem('email', email); // Armazena o email no localStorage

            handleShowAlert('Instruções enviadas com sucesso!', 'success');
        } catch (err) {
            console.log(err);
            handleShowAlert('Falha ao enviar o email. Tente novamente.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <main>
                <section className="form-section">
                    <img src="src/assets/svg/money-tracker-logo.png" className="logo-login-image" alt="Logo" />
                    <h3>Enter your email address and we will send you instructions to reset your password</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <div className="input-container">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    "Send"
                                )}
                            </button>
                        </div>
                    </form>
                </section>
                <section className="main-section">
                    <h1>Track your money, Now!!</h1>
                    <img src="src/assets/svg/main-ilustration.svg" alt="Main Illustration" />
                </section>
            </main>
        </>
    );
}