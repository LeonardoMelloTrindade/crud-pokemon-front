import React from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import NavBar from "../components/navBar";
import { useState, useEffect } from 'react';
import PokemonService from '../services/pokemon.service';
import {  useParams } from "react-router-dom";
import BtnDelete from '../components/btnDelete'
import './editarPokemon.css';



export default function editarPokemon() {

  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [tiposPokemon, setTiposPokemon] = useState([]);
  const pokemonService = new PokemonService();
  const [clicked, setClicked] = useState(false);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [pokedex, setPokedex] = useState('');
  const [statusEdit, setStatusEdit] = useState(0);

  useEffect(() => {
    pokemonService.buscar(id).then((res) => {
      setNome(res.data.nome);
      setPokedex(res.data.pokedex);
      setTipo(res.data.tipo)
      setPokemon(res.data)
    })
    pokemonService.getTipos().then((res) => setTiposPokemon(res.data));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await pokemonService.edit(id, nome, tipo, pokedex);
    console.log(result)
    setStatusEdit(result.status);

    if (result.status == 200) {
      setClicked(true);
      setNome('');
      setPokedex('');
    } else {
      setClicked(false);
    }
  }

  return (
    <>
      <Row className="altura_Maxima d-flex justify-content-between">

        <Col>
          <NavBar />
        </Col>

        <Col xs={7} className="input_Edit">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome do Pokemon</Form.Label>
              <Form.Control required type="text" placeholder="Digite o nome do pokemon" value={nome} onChange={(e) => setNome(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Digite n N° da Pokedex</Form.Label>
              <Form.Control required type="text" placeholder="N° da Pokedex" value={pokedex} onChange={(e) => setPokedex(e.target.value)} />
            </Form.Group>
            <Form.Select defaultValue={tipo} required className='bg-light' aria-label="Default select example" onChange={(e) => setTipo(e.target.value)}>
              <option value="">Selecione o tipo</option>
              {tiposPokemon.map(tipo => {
                return (
                  <option key={tipo} value={tipo}>{tipo}</option>
                )
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
