import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../auth/auth';
import { login } from "./context/userApi/authAPI";
import { signUpFetch } from './context/userApi/userAPI'

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [signUp, setSignUp] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault()
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const signUpChange = () => {
    setSignUp(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if(signUp) {
        const data = await signUpFetch(loginData);
        return data;
      }else {

        const data = await login(loginData);
        console.log(data)
        Auth.login(data.token);
      }
  
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <>
    
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>submit</button>
      </form>
        <button
        onClick={signUpChange}
        >
          sign up
        </button>
    </div>
    </>
    
  )
};

export default Login;
