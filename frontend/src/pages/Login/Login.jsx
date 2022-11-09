import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        }

        const post = () => {
            fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    const statusText = data.message;
                    if (statusText === 'Successfully Logged In') {
                        navigate('/', { state: { user } });
                        // alert(statusText);
                    } else if (statusText === 'User Not Found') {
                        return alert(statusText);
                    } else {
                        return alert(statusText)
                    }
                })
                .catch(err => console.log(err));
        }

        post();
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Login</h1>
                <form action="" className="container">
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={(e) => handleLogin(e)}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;