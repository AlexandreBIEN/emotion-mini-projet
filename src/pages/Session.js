import React from 'react'
import '../assets/css/styles.css';
import Footer from '../components/Footer'
import Header from '../components/Header'
import PrimaryBtn from '../components/PrimaryBtn';

export default function Session() {
  return (
    <div className='site-wrapper'>
        <Header />
        <main className="site-content">
            <div className="intro">
                <h1>Extrait : Alien, le huitième passager</h1>
                <div className="text-center">
                    <div className="video-wrapper">
                        <div className="emoticon-wrapper">
                            &#128512;
                        </div>
                        <video autoplay controls>
                            <source src="../assets/video/alien.mp4" type="video/mp4"/>
                        </video>
                    </div>
                </div>
                <PrimaryBtn text="Suite du parcours" link="/session-end"/>
            </div>
        </main>
        <Footer />
    </div>
  )
}
