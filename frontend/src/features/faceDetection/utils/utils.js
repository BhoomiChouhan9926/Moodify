 import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';

// 1. Initialize MediaPipe FaceLandmarker (setFaceLandmarker ko parameter banaya hai)
export const initFaceLandmarker = async (setFaceLandmarker) => {
  try {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    
    const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: 'GPU'
      },
      outputFaceBlendshapes: true,
      runningMode: 'VIDEO',
      numFaces: 1
    });

    setFaceLandmarker(landmarker);
  } catch (error) {
    console.error("Error initializing FaceLandmarker:", error);
  }
};

// 2. Advanced Expression Classification Logic (Isme koi change ki zarurat nahi hai)
export const classifyExpression = (shapes) => {
  const shapeMap = {};
  shapes.forEach((s) => {
    shapeMap[s.categoryName] = s.score;
  });

  const smileLeft = shapeMap['mouthSmileLeft'] || 0;
  const smileRight = shapeMap['mouthSmileRight'] || 0;
  const avgSmile = (smileLeft + smileRight) / 2;

  const jawOpen = shapeMap['jawOpen'] || 0;
  const browRaise = ((shapeMap['browInnerUp'] || 0) + (shapeMap['browOuterUpLeft'] || 0)) / 2;

  const browInnerUp = shapeMap['browInnerUp'] || 0;
  const browDownLeft = shapeMap['browDownLeft'] || 0;
  const browDownRight = shapeMap['browDownRight'] || 0;
  const mouthFrownLeft = shapeMap['mouthFrownLeft'] || 0;
  const mouthFrownRight = shapeMap['mouthFrownRight'] || 0;
  const mouthPressLeft = shapeMap['mouthPressLeft'] || 0;
  const mouthPressRight = shapeMap['mouthPressRight'] || 0;
  
  const avgFrown = (mouthFrownLeft + mouthFrownRight) / 2;
  const avgBrowDown = (browDownLeft + browDownRight) / 2;
  const avgMouthPress = (mouthPressLeft + mouthPressRight) / 2;

  if (avgSmile > 0.4) {
    return 'Happy';
  } 
  else if (avgFrown > 0.10 || (browInnerUp > 0.15 && (avgFrown > 0.1 || avgMouthPress > 0.10)) || (browInnerUp > 0.35 && avgBrowDown > 0.15)) {
    return 'Sad';
  } 
  else if (jawOpen > 0.4) {
    return 'Surprised';
  } 
  else if (browRaise > 0.4) {
    return  'Surprised';
  } 
  else {
    return '😐 Neutral';
  }
};