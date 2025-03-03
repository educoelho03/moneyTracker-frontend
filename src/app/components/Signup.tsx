import "../../styles/defaultLogin.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Signup() {
    const navigate = useNavigate();

    const handleRedirectToLogin = () => {
        navigate('/login'); // Redireciona para a rota /login
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const repeatPassword = (document.getElementById("repeat-password") as HTMLInputElement).value;
    
        if (password !== repeatPassword) {
            alert("As senhas precisam ser iguais!");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:8080/api/register", {
                name,
                email,
                password,
            });

            alert("Cadastro realizado com sucesso!");
            handleRedirectToLogin(); // Redireciona para a página de login
        } catch (error: any) {
            alert(error.message);
        }
    };
    

    return (
        <main>
            <section className="form-section">
                <img src="src/assets/svg/logo.svg" alt="Logo" />
                <h2>Signup your Account</h2>

                <form onSubmit={handleSubmit}>
                    {/* Campo de nome */}
                    <div className="input-wrapper">
                        <label htmlFor="name">Name</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="name"
                                placeholder="Your name"
                            />
                        </div>
                    </div>

                    {/* Campo de e-mail */}
                    <div className="input-wrapper">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-container">
                            <input
                                type="email"
                                id="email"
                                placeholder="yourEmail@email.com"
                            />
                        </div>
                    </div>

                    {/* Campo de senha */}
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <div className="input-container">
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                id="repeat-password"
                                placeholder="Repeat your password"
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
    );
}