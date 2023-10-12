import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import NavBar from "../components/navBar";
import PokemonService from "../services/pokemon.service";
import Tipos from "../data/tipos";
import Pokemons from "../data/pokemons";
import PokeApi from "../services/poke-api.service";
import "./criarPokemon.css";
import { Link } from "react-router-dom";

export default function criarPokemon() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const pokemonService = new PokemonService();
  const pokeApi = new PokeApi();
  const [clicked, setClicked] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    for (const [index, pokemonLoop] of Pokemons.entries()) {
      if (pokemonLoop === nome) {
        const newPokemon = pokemonService.post(
          index + 1, // pokedex
          nome,
          tipo,
        );
        setClicked(true);
        console.log("Novo Pokémon criado:", newPokemon);
        setTimeout(() => {
          setNome("");
          setTipo("");
          setClicked(false);
        }, 2500);
      }
    }

    await pokeApi.getPokemon(nome.toLowerCase());
  }

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center p-3">
        <h1>Cadastre o Pokemon aqui.</h1>
      </div>
      <main
        className=" d-flex justify-content-center"
        style={{ height: "100%" }}
      >
        <div className="p-5 container-input">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Pokemon</Form.Label>
              <Form.Select
                value={nome}
                required
                className="bg-light"
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
      </main>
    </>
  );
}
