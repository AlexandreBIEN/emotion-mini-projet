import React from 'react'

export default function ResultCard(props) {
  return (
    <div className="result-item">
      <h2 className="movie">{props.title}</h2>
      <ol className="data-resume">
          <li>
              <span>{props.emoji} :</span>
              <progress id="file" max="100" value={props.expressionValue * 100}> {props.expressionValue * 100}% </progress>
          </li>
          <li>
              <span>&#128533; :</span>
              <progress id="file" max="100" value="30"> 30% </progress>
          </li>
          <li>
              <span>&#128512; :</span>
              <progress id="file" max="100" value="10"> 10% </progress>
          </li>
      </ol>
    </div>
  )
}
