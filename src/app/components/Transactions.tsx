import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "./Topbar"
import "../../styles/transaction.css";


export default function Transactions() {
    const [transactionData, setTransactionData] = useState([])

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

    // Carrega as transações quando o componente é montado
    useEffect(() => {
        loadTransactions();
    }, []); 

    const addNewTransaction = () => {
        console.log("add new transactions");
        
    };

    return (
        <div>
            <Topbar />
            <div className="transaction-container">
                <div className="transaction-content">
                    <div className="transaction-header">
                        <div className="title">Transações</div>
                        <button className="transaction-button" onClick={addNewTransaction}>
                            Adicionar transação
                        </button>
                    </div>
                </div>
            </div>


            <div className="transaction-container">
                <div className="transaction-content">
                    <div className="transaction-table">
                        teste
                    </div>
                </div>

            </div>
        </div>
    );
}