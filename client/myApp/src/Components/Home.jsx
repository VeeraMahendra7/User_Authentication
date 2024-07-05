import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
      <div>
        <header className='w-100 h-[50px] bg-blue-700 text-white flex flex-row justify-between align-center'>
            <h1 className='pl-3 text-3xl pt-2'>Home</h1>
            <span className='w-50 flex flex-row justify-start gap-3 px-5 pt-3'>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>SignUp</Link>
            </span>
        </header>
            
      </div>
  )
}

export default Home
