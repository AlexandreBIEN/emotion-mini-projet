import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js';
import Footer from '../components/Footer'
import Header from '../components/Header'
import PrimaryBtn from '../components/PrimaryBtn';

export default function Session() {

    // webcam
    const videoRef = useRef();
    // Résultat
    const canvasRef = useRef();
    // contient emoji correspondant à l'expression
    const[status, setStatus] = useState();

    // lance les 2 fontions quand la page se charge
    useEffect(() => {
        loadModels();
        startVideo();
      }, []);

    /**
     * Fonction qui charge les modèles puis lance la détection
     */
    const loadModels = () => {
        Promise.all([
            faceapi.loadSsdMobilenetv1Model('/models'),
            faceapi.loadFaceLandmarkModel('/models'),
            faceapi.loadFaceExpressionModel('/models'),
        ]).then(() => {
            faceDetection();
        })
    };

    /**
     * Fonction qui démarre la webcam
     */
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true    })
        .then((currentStream) => {
            videoRef.current.srcObject = currentStream;
        }).catch((err) => {
            console.error(err)
        });
    }

    // Emojis des différents status
    const statusIcons = {
        default: '😶',
        neutral: '😶',
        happy: '😀',
        sad: '😢',
        angry: '🤬',
        fearful: '😨',
        disgusted: '🤢',
        surprised: '😳'
    }

    /**
     * Fonction qui lance la détection du visage et affiche les résultats
     */
    const faceDetection = async () => {
        // S'exécute toute les x secondes.
        setInterval(async() => {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceExpressions();
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);
            
            // Choisi le bon emoji pour l'expression
            if (detections.length > 0) {
                detections.map((element) => {
                    let status = "";
                    let valueStatus = 0.0;
                    for (const [key, value] of Object.entries(element.expressions)) {
                      if (value > valueStatus) {
                        status = key
                        valueStatus = value;
                      }
                    }
                    setStatus(statusIcons[status]);
                });
            } else {
                setStatus(statusIcons["default"]);
            }
        }, 1000)
    }
  return (
    <div className='site-wrapper'>
        <Header />
        <main className="site-content">
            <div className="intro">
                <h1>Extrait : Alien, le huitième passager</h1>
                <div className="text-center">
                    <div className="video-wrapper">
                        <div className="emoticon-wrapper">
                            {status}
                        </div>
                        <video autoPlay controls>
                            <source src="./video/alien.mp4" type="video/mp4"/>
                        </video>
                        <div className='d-none'>
                            <video className='webcam' crossOrigin='anonymous' ref={videoRef} autoPlay></video>
                            <canvas ref={canvasRef} className='app__canvas webcam'/>
                        </div>
                    </div>
                </div>
                <PrimaryBtn text="Suite du parcours" link="/session-end"/>
            </div>
        </main>
        <Footer />
    </div>
  )
}
