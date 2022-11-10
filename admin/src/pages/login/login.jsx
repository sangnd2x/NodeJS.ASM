import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
                    if (data.isAdmin) {
                        navigate('/dashboard');
                    } else if (!data.isAdmin) {
                        return alert('Not admin')
                    } else if (data.message === 'User Not Found') {
                        return alert(data.message);
                    } else {
                        return alert(data.message)
                    }
                })
                .catch(err => console.log(err));
        }

        post();
    }

    return (
        <div>
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