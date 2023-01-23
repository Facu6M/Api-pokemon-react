import React from 'react'
import Arrow from "./Arrow"
import styles from "../styles/Cart.css"

const Cart = ( {name, img} ) => {
  return (
    <>

     <div className='contenedor'>
     <div className='cart'>
      <p>{name}</p>
      <img src={img} alt="" />
    </div>
     </div>
    </>
  )
}

export default Cart