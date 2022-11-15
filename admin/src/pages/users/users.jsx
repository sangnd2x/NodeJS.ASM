import { useState, useEffect } from 'react';
import { useNagivate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import axios from 'axios';
import { FaThLarge, FaUser, FaHotel, FaBed, FaMoneyCheckAlt, FaFirstOrder, FaMoneyBill, FaBalanceScale } from 'react-icons/fa'
import './users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:5000/admin/users')
            .then(res => {
                console.log(res);
                setUsers(res.data);
            })
            .catch(err => console.log(err));
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
            <div className="users__container">
                <Sidebar className="users-sidebar" />
                <div className='usersInfo'>
                    <div className="usersInfo__board">
                        <h4>Users List</h4>
                        <div className="usersInfo__board-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" /></th>
                                        <th><span></span>ID</th>
                                        <th><span></span>User</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, i) => (
                                        <tr key={i}>
                                            <td><input type="checkbox" /></td>
                                            <td>{user._id}</td>
                                            <td>{user.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
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

export default Users;