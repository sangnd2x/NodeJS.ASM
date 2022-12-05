import { useState } from 'react'
import axios from 'axios'
import Header from '../../components/header/header'
import './signup.css'

const Signup = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const handleSignUp = () => {
    const data = {
      fullname: fullname,
      email: email,
      password: password,
      phone: phone
    }

    const postSignUp = async () => {
      const response = await axios.post('http://localhost:5000/admin/signup', data);
      console.log(response);
    }

    postSignUp();
  }

  return (
    <div className='signup-container'>
      <Header />
      <div className="signup-form">
        <form className='signup-form__center'>
          <h1>Sign In</h1>
          <div className="signup-form__form-control">
            <label htmlFor="fullname">Fullname</label>
            <input type="fullname" name="fullname" placeholder="Fullname" onChange={(e) => setFullname(e.target.value)}/>
          </div>
          <div className="signup-form__form-control">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="signup-form__form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="signup-form__form-control">
            <label htmlFor="phone">Phone</label>
            <input type="phone" name="phone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
          </div>
          <div className="singup-form__buttons">
            <button className='btn' onClick={() => handleSignUp()}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup