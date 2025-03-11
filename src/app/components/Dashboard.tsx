import { useState, useEffect } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
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

    
    const addNewTransaction = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false); 
    };


    const totalDespesas = data
                            .filter(transaction => transaction.transactionType === 'DESPESA')
                            .reduce((total, transaction) => total + transaction.amount, 0);

    const totalReceitas = data
                            .filter(transaction => transaction.transactionType === 'DEPOSITO')
                            .reduce((total, transaction) => total + transaction.amount, 0);

    const totalAmount =  totalReceitas + (-totalDespesas);


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }).replace('.', '');
      };

    return (
        <>
            <div className="dashboard-header-container">
                <div className="dashboard-title">
                    Dashboard
                </div>
            </div>

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
                                <h3><HiArrowTrendingUp color="green"/> Receitas</h3>
                                <p>R$ {totalReceitas.toFixed(2)}</p>
                            </div>
                            <div className="amount-section">
                                <h3><HiArrowTrendingDown color="red"/> Despesas</h3>
                                <p>R$ {totalDespesas.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="dashboard-graphic-container">
                            <div className="dashboard-graphic-content">
                            <PieChart
                                  series={[
                                    {
                                      data: [
                                        { id: 0, value: totalDespesas, label: 'Despesa' , color: '#E93030' },
                                        { id: 1, value: totalReceitas, label: 'Receitas', color: '#55B02E' },
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
                            {data.length > 0 ? (
                                data.map((transaction, index) => (
                                    <div key={index}>
                                        <div style={{gap: '1rem', alignItems: 'center'}}>
                                            <FaRegMoneyBillAlt />
                                            {transaction.name}
                                            <div style={{marginLeft: '1rem'}}>
                                                {formatDate(transaction.date)}
                                            </div>
                                        </div>
                                        <span>
                                            {transaction.transactionType === "DESPESA" ? "-" : ""}
                                            R$ {transaction.amount.toFixed(2)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: "20px", color: "#666" }}>
                                    Nenhum registro encontrado.
                                </div>
                            )}
                            </div>  
                        </div>
                    </div>
                </div>
            </div>

            {modalOpen && <TransactionModal onClose={closeModal} />}
        </>
    );
}