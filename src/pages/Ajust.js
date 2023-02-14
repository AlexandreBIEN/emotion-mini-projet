import * as faceapi from 'face-api.js';
import React, { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PrimaryBtn from '../components/PrimaryBtn';

export default function Ajust() {

    // webcam
    const videoRef = useRef();

    // Résultat
    const canvasRef = useRef();

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
    let statusIcons = {
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
                    // Si la valeur de l'expression est supérieur à la précédente
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

            // Modification des dimensions
            faceapi.matchDimensions(canvasRef.current, {
                width: 600,
                height: 300,
            })
            const resized = faceapi.resizeResults(detections, {
                width: 600,
                height: 300,
            });
            // affiche boite de détection de visage
            faceapi.draw.drawDetections(canvasRef.current, resized);
            // analyse et affiche en sortie l'expression du visage
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
                        {status}
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
