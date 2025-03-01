import { Routes, Route } from "react-router-dom";
import DefaultLogin from "./app/components/DefaultLogin";

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLogin isLoginPage={true} />} />
            <Route path="/login" element={<DefaultLogin isLoginPage={true} />} />
            <Route path="/signup" element={<DefaultLogin isLoginPage={false} />} />
        </Routes>
    );
}

export default App;