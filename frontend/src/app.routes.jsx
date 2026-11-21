import {createBrowserRouter} from 'react-router'

import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import Homepage from './features/home/pages/Homepage'
import Protected from './features/auth/components/Protected'

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Protected children={<Homepage/>}/>
    },
    {
        path:'/login',
        element : <LoginPage/>
    },
    {
        path:'/register',
        element : <RegisterPage/>
    }
])



