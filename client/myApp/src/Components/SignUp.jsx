import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function SignUp() {
    const history = useNavigate()
    const [form,setForm] = useState({name:'',email:'',passwd:''})
    const sendRequest = async() => {
      await axios.post('http://localhost:5000/api/signup',form)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))
      // const data = await res.data
      // return data
    }
    const handleInput = (e) => {
        e.preventDefault()
        sendRequest().then(() => history("/login"))
    }
  return (
    <div className='flex justify-center align-middle'>
      <form onSubmit={handleInput} >
        <h1 className='text-3xl my-4'>Registration Form</h1>
        <div className='text-center'>
            <label>Username:</label>
            <input type='text' value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} /> <br />
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

export default SignUp
