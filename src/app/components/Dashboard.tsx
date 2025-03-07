import { useState } from "react";
import "../../styles/dashboard.css";

export default function Dashboard() {
    const [selectedMonth, setSelectedMonth] = useState<string>("Janeiro");

    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    // Dados de exemplo para as últimas transações
    const latestTransactions = [
        { name: "Mercado", date: "03 de março de 2025", amount: -50.00 },
        { name: "Salário", date: "01 de março de 2025", amount: 2000.00 },
        { name: "Gasolina", date: "28 de fevereiro de 2025", amount: -150.00 },
        { name: "Gasolin2a", date: "28 de fevereiro de 2025", amount: -150.00 },
        { name: "Gasolin3a", date: "28 de fevereiro de 2025", amount: -150.00 },
        { name: "Gasolin4a", date: "28 de fevereiro de 2025", amount: -150.00 },
    ];

    const addNewTransaction = () => {
        console.log("open modal...");
    };

    return (
        <>
            {/* Cabeçalho */}
            <div className="dashboard-header-container">
                <div className="dashboard-title">
                    Dashboard
                </div>
                <div className="select-container">
                    <select
                        value={selectedMonth}
                        onChange={handleChangeMonth}
                        className="custom-select"
                    >
                        <option value="Janeiro">Janeiro</option>
                        <option value="Fevereiro">Fevereiro</option>
                        <option value="Março">Março</option>
                        <option value="Abril">Abril</option>
                        <option value="Maio">Maio</option>
                        <option value="Junho">Junho</option>
                        <option value="Julho">Julho</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Setembro">Setembro</option>
                        <option value="Outubro">Outubro</option>
                        <option value="Novembro">Novembro</option>
                        <option value="Dezembro">Dezembro</option>
                    </select>
                </div>
            </div>

            {/* Container principal */}
            <div className="dashboard-main-container">
                <div className="dashboard-top-container">
                    <div className="dashboard-total-amount-container">
                        <div className="dashboard-total-amount-content">
                            <h3>Saldo</h3>
                            <div className="dashboard-total-number">
                                <p>R$ 10,00</p>
                                <button className="add-transaction-button" onClick={addNewTransaction}>
                                    Adicionar transação
                                </button>
                            </div>
                        </div>
                        <div className="dashboard-amount-content">
                        <div className="amount-section">
                            <h3>Investido</h3>
                            <p>R$ 100</p>
                        </div>
                        <div className="amount-section">
                            <h3>Receitas</h3>
                            <p>R$ 200</p>
                        </div>
                        <div className="amount-section">
                            <h3>Despesas</h3>
                            <p>-R$ 400</p>
                        </div>
                        </div>
                    </div>

                    {/* Seção de Últimas Transações */}
                    <div className="dashboard-last-transactions-container">
                        <div className="dashboard-last-transactions-content">
                            <h3>Últimas Transações</h3>
                            <div className="last-transactions">
                                {latestTransactions.map((transaction, index) => (
                                    <div key={index}>
                                        <span>{transaction.name}</span>
                                        <span>{transaction.date}</span>
                                        <span>R$ {transaction.amount.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}