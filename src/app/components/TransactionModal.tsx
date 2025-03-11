import { useState } from "react";
import axios from "axios";

import "../../styles/modal.css";

interface TransactionModalProps {
    onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ onClose }) => {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(50);
    const [selectedType, setSelectedType] = useState<string>("DESPESA");
    const [selectedCategory, setSelectedCategory] = useState<string>("SALARY");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(event.target.value));
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const addNewTransaction = async (name: string, amount: number, transactionType: string, transactionCategory: string) => {
        try {
            const token = localStorage.getItem('jwtToken');

            const transactionData = {
                transaction: {
                    name,
                    amount,
                    transactionType,
                    transactionCategory
                }
            };

            await axios.post('http://localhost:8080/api/transactions/add', transactionData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.log("Erro ao adicionar transação:", error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await addNewTransaction(name, amount, selectedType, selectedCategory);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adicionar Transação</h2>
                <h5>Insira as informações abaixo.</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-space">
                        <label className="teste">Nome:</label>
                        <input
                            type="text"
                            placeholder="Digite o nome"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <div className="form-space">
                        <label>Valor:</label>
                        <input
                            type="number"
                            placeholder="R$ 50"
                            value={amount}
                            onChange={handleAmountChange}
                            required
                        />
                    </div>
                    <div className="form-space">
                        <label>Tipo:</label>
                        <select
                            value={selectedType}
                            onChange={handleTypeChange}
                            required
                        >
                            <option value="DESPESA">Despesa</option>
                            <option value="DEPOSITO">Depósito</option>
                        </select>
                    </div>
                    <div className="form-space">
                        <label>Categoria:</label>
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="EDUCATION">Educação</option>
                            <option value="FOOD">Comida</option>
                            <option value="TRANSPORT">Transporte</option>
                            <option value="HOUSING">Moradia</option>
                            <option value="HEALTH">Saúde</option>
                            <option value="ENTERTAINMENT">Entreterimento</option>
                            <option value="TRAVEL">Viagem</option>
                            <option value="SALARY">Salário</option>
                        </select>
                    </div>
                    <div className="btn-container">
                        <button type="button" onClick={onClose}>Fechar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;