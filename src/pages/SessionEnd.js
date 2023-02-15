import React, { useEffect, useState } from 'react'
import db from '../Config';
import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 
import Footer from '../components/Footer'
import Header from '../components/Header'
import PrimaryBtn from '../components/PrimaryBtn';
import ResultCard from '../components/ResultCard';

export default function SessionEnd() {

    // Titre film
    const[filmTitle, setFilmTitle] = useState();

    // Valeur de l'expression
    const[expressionValue, setExpressionValue] = useState();

    const[expressionName, setExpressionName] = useState();

    useEffect(() => {
        getDocs();
      }, []);

    const getDocs = async () => {
        try {
            const querySnapshot = await getDoc(doc(db, "filmInfo", "Extrait : Alien, le huitième passager"));
            setFilmTitle(querySnapshot['_document']['data']['value']['mapValue']['fields']['title']['stringValue']);
            setExpressionName(querySnapshot['_document']['data']['value']['mapValue']['fields']['emotionName1']['stringValue']);
            setExpressionValue( querySnapshot['_document']['data']['value']['mapValue']['fields']['emotionValue1']['doubleValue']);
            // querySnapshot.map((doc) => {
            //     console.log(`${doc.id} => ${doc.data()}`);
            // });
        } catch (error) {
            console.log(error);
        }
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

    const getEmojiWithExpressionName = (expressionName) => {
        return statusIcons[expressionName];
    }
    
  return (
    <div className='site-wrapper'>
        <Header />
        <main className="site-content">
            <h1>Bilan de la session</h1>
            <p className="session-results-overview text-center">Sur l'ensemble des extraits, voici les émotions que l'AI a
                détecté :<br/>
                &#128552; : 8'25" / &#128533; : 4'48" / &#128512; : 2'12"
            </p>
            <div className="session-results mb">
                <ResultCard title={filmTitle} expressionValue={expressionValue} emoji={getEmojiWithExpressionName(expressionName)}/>
                <ResultCard title={filmTitle} expressionValue={expressionValue} emoji={getEmojiWithExpressionName(expressionName)}/>
                <ResultCard title={filmTitle} expressionValue={expressionValue} emoji={getEmojiWithExpressionName(expressionName)}/>
                <ResultCard title={filmTitle} expressionValue={expressionValue} emoji={getEmojiWithExpressionName(expressionName)}/>
                <ResultCard title={filmTitle} expressionValue={expressionValue} emoji={getEmojiWithExpressionName(expressionName)}/>
                <ResultCard title={filmTitle} expressionValue={expressionValue} emoji={getEmojiWithExpressionName(expressionName)}/>
            </div>
            <PrimaryBtn text="Voir les données consolidées" link="/data"/>
        </main>
        <Footer />
    </div>
  )
}
