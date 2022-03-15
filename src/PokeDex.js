import React from 'react'
import PokemonSelect from './PokemonSelect'
import { useAxios } from './hooks'
import PokemonCard from './PokemonCard'
import './PokeDex.css'

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, addPokemon, clearCards] = useAxios(
    'pokemon',
    'https://pokeapi.co/api/v2/pokemon/'
  )

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
        <button onClick={clearCards}>Release your Pokemon</button>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(card => (
          <PokemonCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}

export default PokeDex