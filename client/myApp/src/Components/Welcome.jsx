import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
axios.defaults.withCredentials = true

function Welcome() {
    const [user,setUser] = useState();
  const getData = async() =>{
      const res = await axios.get('http://localhost:5000/api/user',{
          withCredentials:true
      }).catch((err) => console.log(err));
      const data = await res.data;
      return data;
  }
  useEffect(()=>{
    getData().then((data) => setUser(data.data.user))
  },[])
  return (
    <div>
      {user && <h1>{user.name}</h1>}
    </div>
  )
}

export default Welcome
