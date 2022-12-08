import { useState, useEffect } from 'react';
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import {FaUser} from 'react-icons/fa'
import './dashboard.css'
import axios from 'axios'

const DashBoard = () => {
  const [clients, setClients] = useState([]);
  const [revenue, setRevenue] = useState('');
  const [orders, setOrders] = useState([]);

  // Fetch number of clients
  useEffect(() => {
    const fetchClients = async () => {
      const response = await axios.get('http://localhost:5000/admin/clients');
      setClients(response.data);
    };

    fetchClients();
  }, []);

  // Fetch number of orders and revenue
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('http://localhost:5000/admin/orders');
      setRevenue(response.data.earning);
      setOrders(response.data.orders)
    }

    fetchOrders();
  },[])
  console.log(orders)
  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-main">
          <h1>Dashboard</h1>
          <div className="dashboard-info">
            <div className="dashboard-items">
              <div className="dashboard-items-item" id="users">
                <h4>Clients</h4>
                <p>{clients.length}</p>
                <span><FaUser style={{color: "#000", fontSize: "20px"}}/></span>
              </div>
              <div className="dashboard-items-item" id="users">
                <h4>Earnings</h4>
                <p>{new Intl.NumberFormat('vn-Vn', {style: 'currency', currency: 'VND'}).format(revenue)}</p>
                <span><FaUser style={{color: "#000", fontSize: "20px"}}/></span>
              </div>
              <div className="dashboard-items-item" id="users">
                <h4>Orders</h4>
                <p>{orders.length}</p>
                <span><FaUser style={{color: "#000", fontSize: "20px"}}/></span>
              </div>
            </div>
            <div className="dashboard-history">
              <h4>History</h4>
              <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <th>ID User</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Delivery</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.map(order => (
                    <tr key={order._id}>
                      <td>{order.user.userId}</td>
                      <td>{order.user.name}</td>
                      <td>{order.user.phone}</td>
                      <td>{order.user.address}</td>
                      <td>{new Intl.NumberFormat('vn-Vn', {style: 'currency', currency: 'VND'}).format(order.totalBill)}</td>
                      <td>{order.orderDelivery === 'processing'? 'Chưa vận chuyển' : 'Đang vận chuyển'}</td>
                      <td>{order.orderStatus === 'Waiting for pay'? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                      <td><button>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard