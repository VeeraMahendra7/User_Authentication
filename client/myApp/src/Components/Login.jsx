import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const history = useNavigate()
  const [form,setForm] = useState({email:'',passwd:''})
  const sendRequest = async() => {
  await axios.post('http://localhost:5000/api/login',form)
    .then((data) => data)
    .catch((err) => console.log(err))
  }
  const handleInput = (e) => {
      e.preventDefault()
      sendRequest().then(() => history("/user"))
  }
  return (
    <div className='flex justify-center align-middle'>
      <form onSubmit={handleInput} >
        <div className='text-center'>
            <label>Email:</label>
            <input type='email' value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} /> <br />
            <label>Password:</label>
            <input type='password' value={form.passwd} onChange={(e) => setForm({...form,passwd:e.target.value})} /> <br />
            <input type='submit'/>
        </div>
      </form>
    </div>
  )
}

export default Login
