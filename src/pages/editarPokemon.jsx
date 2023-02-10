import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/navBar";
import { useState, useEffect } from 'react';
import PokemonService from '../services/pokemon.service';
import { Link, useParams } from "react-router-dom";
import './editarPokemon.css'


export default function editarPokemon() {

  const { id } = useParams();
  const [pokemonId, setPokemonId] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [pokedex, setPokedex] = useState('Tipo não digitado')
  const [tiposPokemon, setTiposPokemon] = useState([]);
  const pokemonService = new PokemonService()

  useEffect(() => {
    pokemonService.buscar(id).then((res) => setPokemonId(res.data));
    pokemonService.getTipos().then((res) => setTiposPokemon(res.data));
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await pokemonService.edit(id, nome, tipo, pokedex);
    console.log(result);
  }

  return (
    <Container className="mt-3 pt-3" >
      <Row>

        <Col>
          <NavBar />
        </Col>

        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome do Pokemon</Form.Label>
              <Form.Control required type="text" placeholder="Digite o nome do pokemon" value={nome} onChange={(e) => setNome(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Digite n N° da Pokedex</Form.Label>
              <Form.Control required type="number" placeholder="N° da Pokedex" value={pokedex} onChange={(e) => setPokedex(e.target.value)} />
            </Form.Group>
            <Form.Select defaultValue={tipo} required className='bg-light' aria-label="Default select example" onChange={(e) => setTipo(e.target.value)}>
              <option value={""}>Selecione o tipo</option>
              {tiposPokemon.map(tipo => {
                return (
                  <option key={tipo} value={tipo}>{tipo}</option>
                )
              })}
            </Form.Select>

            <Button className='m-3' variant="danger" type="button">
              <Link to={'/showPokemon'}>Cancelar</Link>
            </Button>
            <Button className='m-3' variant="primary" type="submit">
              Salvar Pokemon
            </Button>
          </Form>
        </Col>

        <Col className="exibindo_Pokemon pt-3">
          
          <h4>Nome</h4>
          <p>{pokemonId.nome}</p>
          <hr/ >

          <h4>Tipo</h4>
          <p>{pokemonId.tipo}</p>
          <hr/ >

          <h4>Imagem</h4>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId.pokedex}.png`} style={{ width: "100px", display: "block" }} alt="" />




          <Button variant="outline-danger">Excluir</Button>

        </Col>
      </Row>

    </Container>

  )
}
