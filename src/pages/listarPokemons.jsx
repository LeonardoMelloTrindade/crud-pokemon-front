import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'
import  PokemonService  from '../services/pokemon.service';
import NavBar from '../components/navBar';


export default function listarPokemons() {

  const [pokemons, setPokemons] = useState([])
  const pokemonService = new PokemonService()

  useEffect(() => {
    pokemonService.get().then((res) => setPokemons(res.data))
  }, [])

  return (
    <div className='d-flex justify-content-between'>

      <div className='p-2 flex-shrink-1'>
        <NavBar />
      </div>

      <div className='p-2 w-100'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Imagem</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map(pokemon => {
              return (
                <tr key={pokemon.nome}>
                  <td>
                    {pokemon.nome}
                  </td>
                  <td key={pokemon.tipo}>
                    {pokemon.tipo}
                  </td>
                  <td key={pokemon.pokedex}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex}.png`} style={{ width: "100px" }} alt="" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );

}