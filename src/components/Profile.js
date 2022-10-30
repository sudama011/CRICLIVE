import React from 'react'

export default function Profile(props) {
  return (
    <div>
          <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2>
    </div>
  )
}
