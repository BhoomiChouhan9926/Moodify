import React, { useEffect, useRef, useState } from 'react';
import { initFaceLandmarker, classifyExpression } from '../utils/utils.js'// <-- Yahan import kiya

export default function FaceExpressionTracker({onClick = ()=>{}}) {
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
        onClick(detected); // <-- Callback to parent component
      } else {
        setExpression('No face detected');
      }
    } else {
      setExpression('Webcam not ready yet');
    }
  };

  return (
    <div className="face-detector">
      <div className="face-detector__heading">
        <div>
          <span className="face-detector__live"><i /> Live camera</span>
          <h2>Expression detector</h2>
        </div>
      </div>

      <div className="face-detector__camera">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          aria-label="Live webcam preview"
        />
        <span className="face-detector__corner face-detector__corner--one" />
        <span className="face-detector__corner face-detector__corner--two" />
        <span className="face-detector__corner face-detector__corner--three" />
        <span className="face-detector__corner face-detector__corner--four" />
      </div>

      <div className="face-detector__footer">
        <div className="face-detector__expression">
          <span>Detected mood</span>
          <strong>{expression}</strong>
        </div>

        <button
          className="face-detector__button"
          type="button"
          onClick={handleDetectClick}
        >
          <span aria-hidden="true">◎</span>
          Detect expression
        </button>
      </div>
    </div>
  );
}