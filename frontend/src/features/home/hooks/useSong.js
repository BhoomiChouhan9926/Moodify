import {getSongs} from '../services/song.api'
import { useContext, useEffect } from 'react'
import { SongContext } from '../song.context'

export const useSong = ()=>{
    const context = useContext(SongContext)
    const {song , setSong , loading , setLoading} = context

const pickRandomSong = (songsList, currentSongId) => {
  if (!Array.isArray(songsList) || songsList.length === 0) return null;
  if (songsList.length === 1) return songsList[0];

  const filtered = songsList.filter((item) => item._id !== currentSongId);
  const pool = filtered.length > 0 ? filtered : songsList;
  const randomIndex = Math.floor(Math.random() * pool.length);

  return pool[randomIndex];
};

async function handelGetSongs({ mood }) {
  setLoading(true);
  try {
    const data = await getSongs({ mood });
    const songsList = Array.isArray(data?.songs) ? data.songs : [];

    if (songsList.length > 0) {
      setSong((prevSong) => pickRandomSong(songsList, prevSong?._id));
    } else {
      setSong(null);
    }

    console.log(data);
  } finally {
    setLoading(false);
  }
}


    // async function handelGetSongs({mood}){
    //     setLoading(true)
    //     const data = await getSongs({mood})
    //     const songsList = Array.isArray(data?.songs) ? data.songs : [];

    //     if (songsList.length > 0) {
    //     // Pehla song (ya random song: songsList[Math.floor(Math.random() * songsList.length)])
    //     setSong(songsList[0]);
    //     } else {
    //     setSong(null);
    //     }
            
    //     console.log(data)
    //     setLoading(false)
    // }

    return ({
        song , loading , handelGetSongs
    })
}