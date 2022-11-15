import { useState, useEffect } from 'react';
import { useNagivate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import axios from 'axios';
import { FaThLarge, FaUser, FaHotel, FaBed, FaMoneyCheckAlt, FaFirstOrder, FaMoneyBill, FaBalanceScale } from 'react-icons/fa'
import './dashboard.css';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/admin/users')
            .then(res => setTotalUsers(res.data))
            .catch(err => console.log(err));
    },[])

    useEffect(() => {
        axios.get('http://localhost:5000/admin/latest-transactions')
            .then(res => setTransactions(res.data))
            .catch(err => console.log(err));
    },[]);
    
    return (
        <div className="home">
            <div className="nav">
                <h3 style={{color: "#6F41FF"}}>Admin Page</h3>
                <hr style={{border: "1px solid lightgray"}} />
            </div>
            <div className="dashboard__container">
                <Sidebar className="dashboard-sidebar" />
                <div className='dashboardInfo'>
                    <div className="dashboardInfo__board-items">
                        <div className="dashboardInfo__board-item" id="users">
                            <h4>Users</h4>
                            <p>{totalUsers.length}</p>
                            <span><FaUser style={{color: "#FECCCD", fontSize: "30px"}}/></span>
                        </div>
                        <div className="dashboardInfo__board-item" id="orders">
                            <h4>Transactions</h4>
                            <p>{transactions.length}</p>
                            <span><FaFirstOrder style={{color: "#F7EDD2", fontSize: "30px"}}/></span>
                        </div>
                        <div className="dashboardInfo__board-item" id="earnings">
                            <h4>Earnings</h4>
                            <p>$ {transactions.map(transaction => transaction.price).reduce((prev, curr) => prev + curr, 0)}</p>
                            <span><FaMoneyBill style={{color: "#CCE7CD", fontSize: "30px"}}/></span>
                        </div>
                        <div className="dashboardInfo__board-item" id="balance">
                            <h4>Balance</h4>
                            <p>100</p>
                            <span><FaBalanceScale style={{color: "#E7CDE5", fontSize: "30px"}}/></span>
                        </div>
                    </div>
                    <div className="dashboardInfo__board">
                        <h4>Latest Transactions</h4>
                        <div className="dashboardInfo__board-table">
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
                                            <td>{trans.hotel.name}</td>
                                            <td>{trans.room.join(',')}</td>
                                            <td>{trans.dateStart.replace(/T.*/, '').split('-').reverse().join('/')} - {trans.dateEnd.replace(/T.*/, '').split('-').reverse().join('/')}</td>
                                            <td>{trans.price}</td>
                                            <td>{trans.payment}</td>
                                            <td><span className="dashboardInfo__board-table__status">{trans.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;