import {createContext, useContext, useState} from 'react'

export const SongContext = createContext()

export const SongContextProvider = ({children})=>{
    const [song , setSong] = useState({
                url: 'https://ik.imagekit.io/bhoomiimgkitt/Moodify/songs/Jatt_Mehkma__RiskyjaTT.CoM__HhuojPWWc.mp3',
                posterUrl: 'https://ik.imagekit.io/bhoomiimgkitt/Moodify/posters/Jatt_Mehkma__RiskyjaTT.CoM__p92w8OVir.jpeg',
                title: 'Jatt Mehkma (RiskyjaTT.CoM)',
                mood: 'Happy',
    

    })

    const [loading , setLoading] = useState(false)
    return (
        <SongContext.Provider value={{song, setSong, loading, setLoading}}>
            {children}
        </SongContext.Provider>
    )
}

export default SongContextProvider