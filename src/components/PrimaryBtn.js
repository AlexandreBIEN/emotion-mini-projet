import React from 'react'

export default function PrimaryBtn(props) {
  return (
    <p className="text-center">
        <a className="btn" href={props.link}>{props.text}</a>
    </p>
  )
}
