import React, { useState } from 'react'
import '../style/register.scss'
import FormGroup from '../components/FormGroup'
import {Link} from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const RegisterPage = () => {
  const navigate = useNavigate()
  const {loading , handelRegister , user} = useAuth()
  
    const [email , setEmail] = useState("")
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

  async function handelSubmit(e){
    e.preventDefault()
    await handelRegister({email , username,password})
    navigate('/')
  }
  if(loading){
    return (
      <main>
        <h1>Loading......</h1>
      </main>
    )
  }
  return (
    <main className='register-page'>
      <div className="form-container">
        <h1>Register</h1>
        <form  onSubmit={handelSubmit}>
          <FormGroup 
          value={email}
          onChange={(e)=>{ setEmail(e.target.value) }}
          label="Email" placeholder=" Enter  email"/>
          <FormGroup 
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          label="Username" placeholder=" Enter  username"/>
         <FormGroup
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
          label= "Password" placeholder="Enter password"/>
        <button className='button' type='submit'>Register</button>
        </form>
        <p>Already have an account ? <Link to='/login'>Login here</Link></p>
      </div>

    </main>
  )
}

export default RegisterPage
