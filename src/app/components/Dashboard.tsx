import { useState, useEffect } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { HiArrowTrendingUp, HiArrowTrendingDown  } from "react-icons/hi2";
import { PieChart } from '@mui/x-charts/PieChart';
import TransactionModal from "./TransactionModal";
import axios from "axios";

import "../../styles/dashboard.css";

interface Transaction {
    name: string;
    amount: number;
    transactionType: string;
    transactionCategory: string;
    date: string;
}

export default function Dashboard() {
    const [data, setData] = useState<Transaction[]>([])
    const [selectedMonth, setSelectedMonth] = useState<string>("Janeiro");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const getTransactions = async () => {
        try {
            const token = localStorage.getItem('jwtToken');

            const response = await axios.get('http://localhost:8080/api/transactions', {
                headers: {
                    'Authorization': token
                }
            });

            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);


    const totalDespesas = data
                            .filter(transaction => transaction.transactionType === 'DESPESA')
                            .reduce((total, transaction) => total + transaction.amount, 0);

    const totalReceitas = data
                            .filter(transaction => transaction.transactionType === 'DEPOSITO')
                            .reduce((total, transaction) => total + transaction.amount, 0);

    const totalAmount = totalDespesas + totalReceitas;


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
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false); 
    };

    return (
        <>
            {/* Cabeçalho */}
            <div className="dashboard-header-container">
                <div className="dashboard-title">
                    Dashboard
                </div>
                
            </div>

            {/* Container principal */}
            <div className="dashboard-main-container">
                <div className="dashboard-top-container">
                    <div className="dashboard-total-amount-container">
                        <div className="dashboard-total-amount-content">
                            <h3><IoWalletOutline /> Saldo</h3>
                            <div className="dashboard-total-number">
                                <p>R$ {totalAmount.toFixed(2)}</p>
                                <button className="add-transaction-button" onClick={addNewTransaction}>
                                    Adicionar transação
                                </button>
                            </div>
                        </div>
                        <div className="dashboard-amount-content">
                            <div className="amount-section">
                                <h3><HiArrowTrendingUp /> Receitas</h3>
                                <p>R$ {totalReceitas.toFixed(2)}</p>
                            </div>
                            <div className="amount-section">
                                <h3><HiArrowTrendingDown /> Despesas</h3>
                                <p>R$ {totalDespesas.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="dashboard-graphic-container">
                            {/* Grafico de pizza*/}
                            <div className="dashboard-graphic-content">
                            <PieChart
                                  series={[
                                    {
                                      data: [
                                        { id: 0, value: 10, label: 'Despesas', color: '#E93030' },
                                        { id: 1, value: 15, label: 'Receitas', color: '#55B02E' },
                                      ],
                                      innerRadius: 77,
                                      outerRadius: 100,
                                      paddingAngle: 0,
                                      cornerRadius: 0,
                                      startAngle: 0,
                                      endAngle: 360,
                                    },
                                  ]}
                                  width={400}
                                  height={200}
                                />
                            </div>
                        </div>
                    </div>



                    {/* Seção de Últimas Transações */}
                    <div className="dashboard-last-transactions-container">
                        <div className="dashboard-last-transactions-content">
                            <h3>Últimas Transações</h3>
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
                            <div className="last-transactions">
                                {data.map((transaction, index) => (
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

            {modalOpen && <TransactionModal onClose={closeModal} />}
        </>
    );
}