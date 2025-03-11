import { useState, useEffect } from "react";
import axios from "axios";

import "../../styles/transaction.css";


interface Transaction {
    name: string;
    amount: number;
    transactionType: string;
    transactionCategory: string;
    date: string;
}

export default function Transaction() {
    const [transactionData, setTransactionData] = useState<Transaction[]>([]);

    const loadTransactions = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            console.log(token);

            const response = await axios.get('http://localhost:8080/api/transactions', {
                headers: {
                    'Authorization': token
                }
            });

            setTransactionData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    const addNewTransaction = () => {
        console.log("add new transactions");
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div>
            <div className="transaction-container">
                <div className="transaction-content">
                    <div className="transaction-header">
                        <div className="title">Transações</div>
                        <button className="transaction-button" onClick={addNewTransaction}>
                            Adicionar transação
                        </button>
                    </div>

                    <div className="transaction-table">
                        <table className="transaction">
                            <thead>
                                <tr>
                                    <th>NOME</th>
                                    <th>Tipo</th>
                                    <th>Categoria</th>
                                    <th>Data</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionData.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="no-records-message">
                                            Nenhum registro encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    transactionData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.transactionType}</td>
                                            <td>{item.transactionCategory}</td>
                                            <td>{formatDate(item.date)}</td>
                                            <td>R$ {item.amount.toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}