import "../../styles/defaultLogin.css";

interface DefaultLoginProps {
    isLoginPage: boolean;
}

export default function DefaultLogin({ isLoginPage }: DefaultLoginProps) {
    return (
        <main>
            <section className="form-section">
                <img src="src/assets/svg/logo.svg" alt="Logo" />
                <h2>{isLoginPage ? "Login into your account" : "Signup your Account"}</h2>
                <div className="btn-wrapper">
                    <button className="btn-primary">{isLoginPage ? "Login Now" : "Sign Up"}</button>
                    <div className="divider">
                        <div></div>
                            <span>or</span>
                        <div></div>
                    </div>
                    <button className="btn-secundary">{isLoginPage ? "Create your Account" : "Login"}</button>
                </div>
            </section>
            <section className="main-section">
                <h1>You should, moveIT!</h1>
                <img src="src/assets/svg/main-ilustration.svg" alt="Main Illustration" />
            </section>
        </main>
    );
}