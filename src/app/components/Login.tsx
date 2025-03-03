import React, { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "../../styles/defaultLogin.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRedirectSignup = () => {
        navigate('/signup');
    };

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

        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email,
                password
            });

            const { token } = response.data;

            // Armazena o token no localStorage
            localStorage.setItem('jwtToken', token);
            console.log(response.data);
            navigate('/home');
        } catch (err) {
            handleShowAlert();
        }
    };

    return (
        <>
        <ToastContainer />
        <main>
            <section className="form-section">
                <img src="src/assets/svg/logo.svg" alt="Logo" />
                <h2>Login into your account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <div className="input-container">
                            <input
                                type="email"
                                id="email"
                                placeholder="johndoe@gmail.com"
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="btn-wrapper">
                        <button type="submit" className="btn-primary">
                            Login Now
                        </button>
                        <div className="divider">
                            <div></div>
                            <span>or</span>
                            <div></div>
                        </div>
                        <button
                            className="btn-secondary"
                            onClick={handleRedirectSignup}
                        >
                            Create your Account 
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