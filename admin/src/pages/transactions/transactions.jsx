import { useState, useEffect } from 'react';
import { useNagivate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import { FaThLarge, FaUser, FaHotel, FaBed, FaMoneyCheckAlt, FaFirstOrder, FaMoneyBill, FaBalanceScale } from 'react-icons/fa'
import './transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        const post = () => {
            fetch(`http://localhost:5000/admin/transactions?page=${page}`)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setTransactions(data.results);
                })
                .catch(err => console.log(err));
        };

        post();
    }, [page]);

    const handleNextPaging = () => {
        if (page < data.totalPage) {
            setPage(prev => prev + 1);
        } else {
            setPage(1);
        }
    }

    const handlePrevPaging = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        } else {
            setPage(data.totalPage);
        }
    }
    
    return (
        <div className="home">
            <div className="nav">
                <h3 style={{color: "#6F41FF"}}>Admin Page</h3>
                <hr style={{border: "1px solid lightgray"}} />
            </div>
            <div className="transactions__container">
                <Sidebar className="transactions-sidebar" />
                <div className='transactionsInfo'>
                    <div className="transactionsInfo__board">
                        <h4>Transactions List</h4>
                        <div className="transactionsInfo__board-table">
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
                                            <td>{trans.room.join(' ')}</td>
                                            <td>{trans.dateStart.replace(/T.*/, '').split('-').reverse().join('/')} - {trans.dateEnd.replace(/T.*/, '').split('-').reverse().join('/')}</td>
                                            <td>{trans.price}</td>
                                            <td>{trans.payment}</td>
                                            <td><span className='transactionsInfo__board-table__status'>{trans.status}</span></td>
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
                                        <td>{data.page} - {data.totalPage} of {data.totalPage}</td>
                                        <td>
                                            <button className='paging__button' onClick={() => handlePrevPaging()}>←</button>
                                            <button className='paging__button' onClick={() => handleNextPaging()}>→</button>
                                        </td>
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

export default Transactions;