import React from 'react'
import FaceExpressionTracker from '../../faceDetection/components/FaceExpressionTracker'
import Player from '../components/Player'
import {useSong} from '../hooks/useSong'
import './Homepage.scss'

const Homepage = () => {
  const { song , loading , handelGetSongs} = useSong()

  return (
    <main className="homepage">
      <div className="homepage__glow homepage__glow--one" />
      <div className="homepage__glow homepage__glow--two" />

      <header className="homepage__header">
        <a className="homepage__brand" href="/" aria-label="Moodify home">
          <span className="homepage__brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Moodify</span>
        </a>

        <div className={`homepage__status${loading ? ' is-loading' : ''}`}>
          <span className="homepage__status-dot" />
          {loading ? 'Finding your song' : 'Ready to listen'}
        </div>
      </header>

      <section className="homepage__content">
        <div className="homepage__intro">
          <p className="homepage__eyebrow">Your mood, your soundtrack</p>
          <h1>How are you <em>feeling</em> today?</h1>
          <p className="homepage__description">
            Let Moodify read your expression and match the moment with the perfect song.
          </p>
        </div>

        <div className="homepage__detector">
          <FaceExpressionTracker onClick={(expression) => {
            handelGetSongs({mood: expression})
          }}/>
        </div>
      </section>

      <Player/>
    </main>
  )
}

export default Homepage
