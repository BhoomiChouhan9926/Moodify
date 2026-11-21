import React, { useState } from 'react'
import '../style/login.scss'
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const LoginPage = () => {
   const navigate = useNavigate();
   const { user , loading , handelLogin} = useAuth();

  const [email , setEmail] = useState("")
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")

  async function handelSubmit(e){
     e.preventDefault();
     await handelLogin({email , password})
     navigate('/')
  }
   if(loading){
      return (
         <main>
            <h1>Loading.....</h1>
         </main>
      )
   }
  return (
 <main className='login-page'>
    <div className="form-container">
       <h1>Login</h1>
       <form onSubmit={handelSubmit}>
       <FormGroup
        value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}
         label="Email" placeholder=" Enter  email"/>
       <FormGroup 
       value={password}
       onChange={(e)=>{setPassword(e.target.value)}}
       label= "Password" placeholder="Enter password"/>
       <button className='button' type='submit'>Login</button>
       </form>
        <p>Don't have an account?  <Link to='/register'>Create one.</Link>   </p>
    </div>

 </main>

  )
}

export default LoginPage
