import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PrimaryBtn from '../components/PrimaryBtn';

export default function Ajust() {
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
                    <video autoplay loop controls>
                        <source src="../assets/video/sample-webcam.mp4" type="video/mp4"/>
                    </video>
                </div>
            </div>
            <PrimaryBtn text="Suite du parcours" link="/session"/>
        </main>
        <Footer />
    </div>
  )
}
