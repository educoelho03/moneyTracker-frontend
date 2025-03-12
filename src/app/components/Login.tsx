import React, { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

import "../../styles/defaultLogin.css";


export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleShowAlert = () => {
        toast.error('Credenciais invalidas', {
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
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email,
                password
            });

            const { token } = response.data;
            
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('email', email)
            navigate('/dashboard');
        } catch (err) {
            handleShowAlert();
        } finally {
            setIsLoading(false)
        }
    };

    const handleGoogleLogin = () => {
        // Logica login google
        console.log("Login with Google");
    };

    return (
        <>
            <ToastContainer />
            <main>
                <section className="form-section">
                    <img src="src/assets/svg/money-tracker-logo.png" className="logo-login-image" alt="Logo"/>
                    <h3>Welcome Back</h3>
                    <div className="btn-wrapper">
                        <button
                            className="btn-login-google"
                            onClick={handleGoogleLogin}
                        >
                            <FcGoogle className="mr-2 size-5" />
                            Sign in with Google
                        </button>

                        <div className="divider">
                            <div></div>
                            <span>OR</span>
                            <div></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <div className="input-container">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Your Password</label>
                            <div className="input-container">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <a href="/forgot-password">forgot your password?</a>
                        </div>
                        <div className="btn-wrapper">
                            <button type="submit" className="btn-primary" disabled={isLoading}>
                                {isLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CircularProgress size={20} sx={{ color: 'white' }} />
                                    </Box>
                                ) : (
                                    "Sign In"
                                )}
                            </button>

                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="/signup" style={{textDecoration:'none', color: 'var(--primary-color)'}} className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
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