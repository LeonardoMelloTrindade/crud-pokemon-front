import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import PokemonService from "../services/pokemon.service";
import NavBar from "../components/navBar";
import { BsPencilSquare } from "react-icons/bs";
import BtnDelete from "../components/btnDelete";
import "./listarPokemons.css";
import "./editarPokemon.css";
import '../data/tiposColor.css'

export default function ListarPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const pokemonService = new PokemonService();

  useEffect(() => {
    const pokemonsFromLocalStorage = pokemonService.get();
    setPokemons(pokemonsFromLocalStorage);
  }, []);

  return (
    <>
      <NavBar />

      {pokemons.length === 0 ? (
        <div className="d-flex justify-content-center flex-column">
          <h1 className="text-center mt-3">Nenhum pokemon salvo.</h1>
          <section className="d-flex justify-content-center">
            <Button
              href="/createPokemon"
              variant="primary"
              className="mt-3 btn-add-pokemon"
            >
              Adiocionar um novo pokemon
            </Button>
          </section>
        </div>
      ) : (
        <main
          className="d-flex justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="p-2 cotainer-principal">
            <section className="titulo d-flex justify-content-center">
              <h1>Meus Pokemons</h1>
            </section>
            <Table striped bordered hover>
              <thead>
                <tr className="align-items-center">
                  <th>Nome</th>
                  <th className="text-center">Tipo</th>
                  <th className="text-center">Imagem</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pokemons.map((pokemon) => {
                  return (
                    <tr key={pokemon.nome}>
                      <td className="align-middle showNome">{pokemon.nome}</td>
                      <td key={pokemon.tipo} className="align-middle showTipo">
                        <p className={`${pokemon.tipo} text-center config-font`}>
                          {pokemon.tipo}
                        </p>
                      </td>
                      <td key={pokemon.pokedex} className="text-center">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex}.png`}
                          style={{ width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td className="text-center">
                        <BtnDelete
                          variant="danger"
                          pokedex={`${pokemon.pokedex}`}
                          nome={`${pokemon.nome}`}
                        />
                        <Button
                          href={`/editPokemon/${pokemon.pokedex}`}
                          className="m-3"
                          variant="outline-warning"
                        >
                          <BsPencilSquare />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </main>
      )}
    </>
  );
}
