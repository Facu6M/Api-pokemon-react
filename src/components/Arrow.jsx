import React from 'react'
import styles from "../styles/Arrow.css"

const Arrow = ( {arrow, handleClic} ) => {
  return (

    <button className='boton'
     onClick={handleClic}
    >{arrow}</button>

  )
}

export default Arrow