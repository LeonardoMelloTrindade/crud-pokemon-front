import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import PokemonService from "../services/pokemon.service";

export default function criarPokemon() {
  const [tiposPokemon, setTiposPokemon] = useState([
    "Normal",
    "Fogo",
    "Água",
    "Planta",
    "Elétrico",
    "Gelo",
    "Lutador",
    "Voador",
    "Venenoso",
    "Terra",
    "Pedra",
    "Inseto",
    "Fantasma",
    "Aço",
    "Psíquico",
    "Noturno",
    "Dragão",
    "Fada",
  ]);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [pokedex, setPokedex] = useState("");
  const pokemonService = new PokemonService();
  const [clicked, setClicked] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await pokemonService.create(nome, tipo, pokedex);
    console.log(result);

    if (result.status == 200) {
      setClicked(true);
      setNome("");
      setPokedex("");
    } else {
      setClicked(false);
      console.log(result);
    }
  }

  return (
    <div className=" d-flex justify-content" style={{ height: "100%" }}>
      <div className="nav flex-shrink-1">
        <NavBar />
      </div>

      <div className="p-2 w-100">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome do Pokemon</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>N° da Pokedex</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Pokedex"
              value={pokedex}
              onChange={(e) => setPokedex(e.target.value)}
            />
          </Form.Group>
          <Form.Select
            defaultValue={tipo}
            required
            className="bg-light"
            aria-label="Default select example"
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value={""}>Selecione o tipo</option>
            {tiposPokemon.map((tipo) => {
              return (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              );
            })}
          </Form.Select>
          <Button className="m-3" variant="primary" type="submit">
            Criar Pokemon
          </Button>
          {clicked && (
            <Alert key="success" variant="success">
              Pokemon criado com sucesso.
            </Alert>
          )}
        </Form>
      </div>
    </div>
  );
}
