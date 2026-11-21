import React, { useEffect, useRef, useState } from 'react'
import { useSong } from '../hooks/useSong'
import './Player.scss'

const formatTime = (time) => {
  if (!Number.isFinite(time) || time < 0) return '0:00'

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const Icon = ({ name }) => {
  const paths = {
    play: <path d="M8 5v14l11-7z" />,
    pause: (
      <>
        <path d="M6 5h4v14H6z" />
        <path d="M14 5h4v14h-4z" />
      </>
    ),
    back: (
      <>
        <path d="M7 7v10" />
        <path d="M16 7l-7 5 7 5z" />
      </>
    ),
    forward: (
      <>
        <path d="M17 7v10" />
        <path d="M8 7l7 5-7 5z" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const Player = () => {
  const { song } = useSong()
  const audioRef = useRef(null)
  const playRequestIdRef = useRef(0)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  const songUrl = song?.url || ''

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Invalidate any pending play() promise before pausing/reloading
    playRequestIdRef.current += 1
    audio.pause()
    audio.load()
    audio.playbackRate = playbackRate

    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [songUrl])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio || !songUrl) return

    if (audio.paused) {
      const requestId = ++playRequestIdRef.current
      try {
        await audio.play()
        if (requestId === playRequestIdRef.current) {
          setIsPlaying(true)
        }
      } catch (err) {
        if (err?.name !== 'AbortError') {
          console.error('Playback error:', err)
        }
        if (requestId === playRequestIdRef.current) {
          setIsPlaying(false)
        }
      }
    } else {
      playRequestIdRef.current += 1
      audio.pause()
      setIsPlaying(false)
    }
  }

  const seekBy = (seconds) => {
    const audio = audioRef.current
    if (!audio || !songUrl) return

    const maxDuration = Number.isFinite(duration) && duration > 0 ? duration : audio.duration || 0
    const nextTime = Math.min(Math.max(audio.currentTime + seconds, 0), maxDuration)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = nextTime
    }
    setCurrentTime(nextTime)
  }

  return (
    <div className="music-player">
    <audio
  ref={audioRef}
  src={songUrl || undefined}
  onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
  onEnded={() => setIsPlaying(false)}
/>

      <div className="music-player__art">
        {song?.posterUrl && <img src={song.posterUrl} alt="" />}
      </div>

      <div className="music-player__main">
        <div className="music-player__track">
          <div>
            <h3>{song?.title || 'Untitled Song'}</h3>
            {song?.mood && <p>{song.mood} mood</p>}
          </div>

          <label className="music-player__speed">
            <span>Speed</span>
            <select
              value={playbackRate}
              onChange={(event) => setPlaybackRate(Number(event.target.value))}
              aria-label="Playback speed"
            >
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                <option key={speed} value={speed}>
                  {speed}x
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="music-player__timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            aria-label="Song progress"
            style={{ '--progress': `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="music-player__controls">
          <button type="button" onClick={() => seekBy(-5)} aria-label="Back 5 seconds">
            <Icon name="back" />
            <small>5</small>
          </button>
          <button
            type="button"
            className="music-player__play"
            onClick={togglePlayback}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} />
          </button>
          <button type="button" onClick={() => seekBy(5)} aria-label="Forward 5 seconds">
            <Icon name="forward" />
            <small>5</small>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Player