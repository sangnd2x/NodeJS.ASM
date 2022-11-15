import { useState, useEffect } from "react";
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar';
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import './transaction.css';


const TransactionDashboard = () => {
    const location = useLocation();
    const [user, setUser] = useState(location.state.user);
    const [transactions, setTransactions] = useState([]);
    const [hotel, setHotel] = useState(location.state.hotel);
    const [roomBooked, setRoomBooked] = useState(location.state.roomNumber);

    // console.log(transactions);

    useEffect(() => {
        const data = {
            user: user.username
        };

        const post = () => {
            fetch('http://localhost:5000/transactions', {
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
        <div>
            <Navbar user={user} />
            <div className="transaction-header">
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
            </div>
            <div className="transactions">
                <h1>Your Transactions</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hotel</th>
                            <th>Room</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((trans, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{trans.hotel.name}</td>
                                <td>{trans.room.join(',')}</td>
                                <td>{trans.dateStart.replace(/T.*/,'').split('-').reverse().join('/')} - {trans.dateEnd.replace(/T.*/,'').split('-').reverse().join('/')}</td>
                                <td>${trans.price}</td>
                                <td>{trans.payment}</td>
                                <td style={{color: "white"}}><span style={trans.status === 'booked'? {backgroundColor:"#38D039"} : {backgroundColor:"white"} }>{trans.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <MailList />
            <Footer />
        </div>
    )
};

export default TransactionDashboard;
