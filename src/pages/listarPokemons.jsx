import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import PokemonService from '../services/pokemon.service';
import NavBar from '../components/navBar';
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';


export default function listarPokemons() {

  const [pokemons, setPokemons] = useState([])
  const pokemonService = new PokemonService()

  useEffect(() => {
    pokemonService.get().then((res) => setPokemons(res.data))
  }, [])

  async function deletePok(id) {
    const result = await pokemonService.delete(id);
    setPokemons(pokemons.filter(pokemon => pokemon._id !== id))
  }

  return (
    <div className='d-flex justify-content-between'>

      <div className='pl-5 flex-shrink-1'>
        <NavBar />
      </div>

      <div className='p-2 w-100'>
        <Table striped bordered hover>
          <thead>
            <tr className='align-items-center'>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Imagem</th>
              <th>Ações</th>
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
                  <td>
                    <Button onClick={() => deletePok(pokemon._id)} className='m-1' variant="outline-danger"><BsTrash /></Button>
                    <Button className='m-1' variant="outline-warning"><Link to={{pathname: `/editPokemon/${pokemon._id}`}}><BsPencilSquare /></Link></Button>
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