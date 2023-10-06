import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import NavBar from "../components/navBar";
import PokemonService from "../services/pokemon.service";
import Tipos from "../data/tipos";
import Pokemons from "../data/pokemons";
import PokeApi from "../services/poke-api.service";

export default function criarPokemon() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [pokedex, setPokedex] = useState("");
  const pokemonService = new PokemonService();
  const pokeApi = new PokeApi();
  const [clicked, setClicked] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const pokemon = await pokeApi.getPokemon(nome.toLowerCase());

      if (pokemon.id) {
        const result = await pokemonService.create(nome, tipo, pokemon.id);
        console.log(result);
        setPokedex("");
        setNome("");
        setPokedex("");

        if (result.status === 201) {
          setClicked(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          setClicked(false);
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
      <div className=" d-flex justify-content" style={{ height: "100%" }}>
        <div className="p-2 w-100">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome do Pokemon</Form.Label>
              <Form.Select
                defaultValue={nome}
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
              defaultValue={tipo}
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
    </>
  );
}
