import { useState, useEffect } from 'react';
import { useNagivate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import './dashboard.css';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const data = {
            user: 'sang'
        };

        const post = () => {
            fetch('http://localhost:5000/transaction', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => setTransactions(data))
                .catch(err => console.log(err));
        };

        post();
    }, []);
    
    return (
        <div className="home">
            <div className="nav">
                <h3 style={{color: "#6F41FF"}}>Admin Page</h3>
                <hr style={{border: "1px solid lightgray"}} />
            </div>
            <div className="home__container">
                <Sidebar className="sidebar"/>
                <div className='info'>
                    <div className="info__container">
                        <h4>Latest Transactions</h4>
                        <div className="info__container-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" /></th>
                                        <th><span></span>ID</th>
                                        <th><span></span>User</th>
                                        <th><span></span>Hotel</th>
                                        <th><span></span>Room</th>
                                        <th><span></span>Date</th>
                                        <th><span></span>Price</th>
                                        <th><span></span>Payment Method</th>
                                        <th><span></span>Status</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((trans, i) => (
                                        <tr key={i}>
                                            <td><input type="checkbox" /></td>
                                            <td>{trans._id}</td>
                                            <td>{trans.user}</td>
                                            <td>{trans.hotel}</td>
                                            <td>{trans.room.join(',')}</td>
                                            <td>{trans.dateStart.replace(/T.*/, '').split('-').reverse().join('/')} - {trans.dateEnd.replace(/T.*/, '').split('-').reverse().join('/')}</td>
                                            <td>{trans.price}</td>
                                            <td>{trans.payment}</td>
                                            <td>{trans.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;