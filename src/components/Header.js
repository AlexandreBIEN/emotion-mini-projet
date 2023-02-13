import React from 'react'

export default function Header() {
  return (
    <header className="site-header">
        <nav>
            <a href="/home" className="link-home">Emotion data</a>
            <a href="/ajust-webcam">Ajustement webcam</a>
            <a href="/data">Datas</a>
        </nav>
    </header>
  )
}
