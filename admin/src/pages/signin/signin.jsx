import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/header/header'
import './signin.css'

const Signin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }

    const postSignIn = async () => {
      const response = await axios.post('http://localhost:5000/admin/signin', data);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/products');
      } else {
        alert(response.statusText);
      }
    }

    postSignIn();
  }

  const handleSignUp = () => {
    navigate('/signup');
  }

  return (
    <div className='signin-container'>
      <Header />
      <div className="signin-form">
        <form className='signin-form__center'>
          <h1>Sign In</h1>
          <div className="signin-form__form-control">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="signin-form__form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="signin-form__buttons">
            <button className='btn' onClick={(e) => handleSignIn(e)}>Sign In</button>
            <button className='btn' onClick={(e) => handleSignUp(e)}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin