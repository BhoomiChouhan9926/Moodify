import React, { useEffect, useRef, useState } from 'react';
import { initFaceLandmarker, classifyExpression } from '../utils/utils.js'// <-- Yahan import kiya

export default function FaceExpressionTracker() {
  const videoRef = useRef(null);
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [expression, setExpression] = useState('Click button to detect');

  // 1. Initialize MediaPipe FaceLandmarker
  useEffect(() => {
    initFaceLandmarker(setFaceLandmarker); // <-- State setter pass kiya
  }, []);

  // 2. Setup Webcam Stream
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Webcam error: ", err));
  }, []);

  // 3. Handle Button Click to Capture and Analyze a Single Frame
  const handleDetectClick = () => {
    if (!faceLandmarker) {
      alert("Model is still loading, please wait a second...");
      return;
    }

    if (videoRef.current && videoRef.current.readyState === 4) {
      let startTimeMs = performance.now();
      const result = faceLandmarker.detectForVideo(videoRef.current, startTimeMs);

      if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
        const scores = result.faceBlendshapes[0].categories;
        const detected = classifyExpression(scores); // <-- Utility function call
        setExpression(detected);
      } else {
        setExpression('No face detected');
      }
    } else {
      setExpression('Webcam not ready yet');
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '20px' }}>
      <h2>Real-Time Face Expression Detection</h2>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: '640px', height: '480px', transform: 'scaleX(-1)', borderRadius: '8px' }}
        />
      </div>
      <h3 style={{ marginTop: '15px' }}>Current Expression: {expression}</h3>
      
      {/* Button to trigger detection manually */}
      <button 
        onClick={handleDetectClick}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Detect Expression
      </button>
    </div>
  );
}