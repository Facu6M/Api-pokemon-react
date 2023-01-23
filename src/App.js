import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Cart from './components/Cart';
import Arrow from './components/Arrow';

function App() {

  let [pokemonNumber, setPokemonNumber] = useState(1);

  function increaseNumber () {
    setPokemonNumber(pokemonNumber + 1)
    console.log("click")
    console.log(pokemonNumber)
  }

  function decreaseNumber () {
    if(pokemonNumber <= 1) {
      alert("no podes ir mas abajo")
    } else {
      setPokemonNumber(pokemonNumber - 1)
      console.log("click")
      console.log(pokemonNumber)
    }
  }

  let [pokemonEvolutions, setPokemonEvolutions] = useState([]);

  useEffect(() => {

getPokemonName()

  }, [pokemonNumber] )


async function getPokemonName() {
     const url = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonNumber}`)
     const data = await url.json()
     const pokemonArray = [];
     let pokemonName = data.chain.species.name
     let pokemonLv1Img = await getPokemonImg(pokemonName)
     pokemonArray.push([pokemonName,pokemonLv1Img])
      if(data.chain.evolves_to.length !== 0 ){
        let secondPokemon = data.chain.evolves_to[0].species.name
        let pokemonLv2Img = await getPokemonImg(secondPokemon)
        pokemonArray.push([secondPokemon,pokemonLv2Img])
        if(data.chain.evolves_to[0].evolves_to.length !== 0){
          let thirdPokemon = (data.chain.evolves_to[0].evolves_to[0].species.name)
          let pokemonLv3Img = await getPokemonImg(thirdPokemon)
          pokemonArray.push([thirdPokemon,pokemonLv3Img])
          setPokemonEvolutions(pokemonArray)
        }
      }
      console.log(pokemonEvolutions)
}

  async function getPokemonImg(name){
    const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await url.json()
    return data.sprites.other["official-artwork"].front_default;
  }





  return (
    <div className="App">
      <div className='main'>

    {
      pokemonEvolutions.map(pokemon =>
        <Cart
        key={pokemon[0]}
        name={pokemon[0]}
        img={pokemon[1]}
        />
      )}


</div>

<div className='boton_container'>
<Arrow
handleClic={() => {
  decreaseNumber()
}}
arrow="left"/>

<Arrow
handleClic={() => {
  increaseNumber()
  console.log("right")
}}
arrow="right"/>
</div>

    </div>
  )
}

export default App
