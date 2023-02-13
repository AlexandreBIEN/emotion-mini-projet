import React from 'react'
import '../assets/css/styles.css';
import Footer from '../components/Footer'
import Header from '../components/Header'
import PrimaryBtn from '../components/PrimaryBtn';

export default function Home() {
  return (
    <div className='site-wrapper'>
      <Header />
      <main className="site-content">
            <h1>Bienvenue sur Emotion Data</h1>
            <p>Nous vous proposons de découvrir le monde de la data, en participant à une petite expérience qui ne
                vous prendra que quelques minutes. Vous allez visionner quelques séquences vidéo, durant lesquelles
                une AI
                va essayer de deviner votre état émotionnel en temps réel, et stocker cette information dans une
                base de
                données.</p>
            <p>Seules les données de l'état émotionnel sont conservées.<br/><br/></p>
            <PrimaryBtn text="Commencer l'expérience" link="/Ajust"/>
        </main>
      <Footer />
    </div>
  )
}