import React, { useEffect, useRef, useState } from 'react'
import { setDoc, doc } from "firebase/firestore";
import db from '../Config';
import * as faceapi from 'face-api.js';
import Footer from '../components/Footer'
import Header from '../components/Header'
import PrimaryBtn from '../components/PrimaryBtn';
import { useNavigate } from 'react-router-dom';

export default function Session() {

    const navigate = useNavigate();

    // webcam
    const videoRef = useRef();
    // Résultat
    const canvasRef = useRef();
    // contient emoji correspondant à l'expression
    const[status, setStatus] = useState();

    // Titre du film
    const[filmTitle, setFilmTitle] = useState('Extrait : Alien, le huitième passager');

    // nom du status
    const[statusName, setStatusName] = useState();

    // valeur du status
    const[statusValue, setValueStatus] = useState();


    // lance les 2 fontions quand la page se charge
    // useEffect(() => {
    //     loadModels();
    //     startVideo();
    //   }, []);


    /**
     * Fonction qui lance la détection d'expression
     */
    const handlePlay = () => {
        loadModels();
        startVideo();
    }
    

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
        navigator.mediaDevices.getUserMedia({ video: true })
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

                        setStatusName(key);
                        setValueStatus(value);
                      }
                    }
                    setStatus(statusIcons[status]);
                });
            } else {
                setStatus(statusIcons["default"]);
            }
        }, 1000)
    }


    /**
     * Fonction qui ajoute les donnée dans la bdd
     */
    const changeFilmInfo = async (emotionName1, emotionValue1, filmTitle) => { 
        try {
          const docRef = await setDoc(doc(db, 'filmInfo', filmTitle), {
            title: filmTitle,
            emotionName1: emotionName1,
            emotionValue1: emotionValue1
          });
        //   On redirige vers la page suivante
          navigate('/session-end', { replace: true });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

  return (
    <div className='site-wrapper'>
        <Header />
        <main className="site-content">
            <div className="intro">
                <h1>{filmTitle}</h1>
                <div className="text-center">
                    <div className="video-wrapper">
                        <div className="emoticon-wrapper">
                            {status}
                        </div>
                        <video autoPlay controls onPlay={() => {handlePlay()}}>
                            <source src="./video/alien.mp4" type="video/mp4"/>
                        </video>
                        <div className='d-none'>
                            <video className='webcam' crossOrigin='anonymous' ref={videoRef} autoPlay></video>
                            <canvas ref={canvasRef} className='app__canvas webcam'/>
                        </div>
                    </div>
                </div>
                <div className='btnNext' onClick={() => {changeFilmInfo(statusName, statusValue, filmTitle)}}>
                    <PrimaryBtn text="Suite du parcours" link="#" />
                </div>
            </div>
        </main>
        <Footer />
    </div>
  )
}
