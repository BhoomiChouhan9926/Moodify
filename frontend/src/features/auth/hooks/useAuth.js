import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login , getMe , logout } from "../services/auth.api";

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const {user , setUser , loading , setLoading} = context

    async function handelRegister ({email , username , password}){
        setLoading(true)
        const data =await register({email , username,password})
        setUser(data.user)
        setLoading(false)

    }

    async function handelLogin({email,username , password}) {
        setLoading(true)
        const data  = await login({email,username , password})
        setUser(data.user)
        setLoading(false)

        
    }

    async function handelGetMe(){
        setLoading(true);
    try {
        const data = await getMe();
        setUser(data.user);
    } catch (err) {
        setUser(null);
    } finally {
        setLoading(false);
    }
        
    }
    async function handelLogout (){
        setLoading(true)
        const data =  await logout()
        setUser(null)
        setLoading(false)
    }
    useEffect(()=>{
        handelGetMe()
    },[])
    return ({
        user , loading ,handelRegister, handelLogin, handelGetMe,handelLogout
    })

}