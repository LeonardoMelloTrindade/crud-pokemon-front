import React from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import NavBar from "../components/navBar";
import { useState, useEffect } from 'react';
import PokemonService from '../services/pokemon.service';
import PokeApi from "../services/poke-api.service";
import { useParams } from "react-router-dom";
import BtnDelete from '../components/btnDelete'
import Tipos from "../data/tipos";
import Pokemons from "../data/pokemons";
import './editarPokemon.css';


export default function editarPokemon() {

  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const pokemonService = new PokemonService();
  const [clicked, setClicked] = useState(false);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [pokedex, setPokedex] = useState('');
  const pokeApi = new PokeApi();

  useEffect(() => {
    pokemonService.buscar(id).then((res) => {
      setNome(res.data.nome);
      setPokedex(res.data.pokedex);
      setTipo(res.data.tipo)
      setPokemon(res.data)
    })
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      const pokemon = await pokeApi.getPokemon(nome.toLowerCase());
  
      if (pokemon.id) {
        const result = await pokemonService.edit(id, nome, tipo, pokemon.id);
        console.log(result);
  
        if (result.status === 200) {
          setClicked(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
       }
      } else {
        console.error("Não foi possível obter o ID do Pokémon.");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao criar o Pokémon:", error);
    }
  }

  return (
    <>
      <NavBar />
      <Row className="altura_Maxima d-flex justify-content-between  bg">

        <Col xs={7} className="input_Edit">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome do Pokemon</Form.Label>
            <Form.Select
              value={nome}
              required
              className="bg-light"
              aria-label="Default select example"
              onChange={(e) => setNome(e.target.value)}
            >
              <option value={""}>Escolha o Pokemon</option>
              {Pokemons.map((pokemon) => {
                return (
                  <option key={pokemon} value={pokemon}>
                    {pokemon}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Label>Tipo do Pokemon</Form.Label>
          <Form.Select
            value={tipo}
            required
            className="bg-light"
            aria-label="Default select example"
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value={""}>Selecione o tipo</option>
            {Tipos.map((tipo) => {
              return (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              );
            })}
          </Form.Select>

            <Button className='m-3' variant="danger" type="button" href="/showPokemon">
              Cancelar
            </Button>
            <Button className='m-3' variant="primary" type="submit">
              Editar Pokemon
            </Button>
            {clicked && <Alert key="success" variant="success">Pokemon editado com sucesso.</Alert>}
          </Form>
        </Col>

        <Col className="exibindo_Pókemon pt-3">
          
          <h4>Nome</h4>
          <p>{pokemon.nome}</p>
          <hr/ >

          <h4>Tipo</h4>
          <p>{pokemon.tipo}</p>
          <hr/ >

          <h4>Imagem</h4>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex}.png`} style={{ width: "100px", display: "block" }} alt="" />
          <hr/ >
          
          <BtnDelete param1={`${pokemon._id}`} param2={`${pokemon.nome}`}/>

        </Col>
      </Row>

    </>

  )
}
