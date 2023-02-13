// import { FaceDetection, FaceExpressionNet, FaceLandmark68Net, FaceRecognitionNet, tinyFaceDetector } from 'face-api.js';
import * as faceapi from 'face-api.js';
import React, { useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PrimaryBtn from '../components/PrimaryBtn';

export default function Ajust() {

    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        startVideo();

        videoRef && loadModels();
      }, []);

    const loadModels = () => {
       Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
       ]).then(() => {
        faceDetection();
       })
    };
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true    })
        .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
             }).catch((err) => {
                console.error(err)
        });
     }

    const faceDetection = async () => {
        setInterval(async() => {
          const detections = await faceapi.detectAllFaces
               (videoRef.current, new faceapi.TinyFaceDetectorOptions())
               .withFaceLandmarks().withFaceExpressions();
        canvasRef.current.innerHtml = faceapi.
             createCanvasFromMedia(videoRef.current);
        faceapi.matchDimensions(canvasRef.current, {
            width: 600,
            height: 300,
        })
        const resized = faceapi.resizeResults(detections, {
            width: 600,
            height: 300,
        });
        // to draw the detection onto the detected face i.e the box
        faceapi.draw.drawDetections(canvasRef.current, resized);
        // to analyze and output the current expression by the detected face
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
        }, 1000)
    }
  return (
    <div className='site-wrapper'>
        <Header />
        <main className="site-content">
            <h1>Ajustement de la webcam</h1>
            <p>Placez-vous devant l'ordinateur de façon à ce que la webcam puisse voir tout votre visage. Vous allez
                constater que l'Ai peut déjà lire vos expressions.</p>
            <div className="text-center">
                <div className="video-wrapper">
                    <div className="emoticon-wrapper">
                        &#128512;
                    </div>
                    <video className='webcam' crossOrigin='anonymous' ref={videoRef} autoPlay></video>
                    <canvas ref={canvasRef} className='app__canvas webcam'/>
                </div>
            </div>
            <PrimaryBtn text="Suite du parcours" link="/session"/>
        </main>
        <Footer />
    </div>
  )
}
