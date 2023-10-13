import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="container-nav">
      <Container>
        <Nav.Item>
          <Link
            to={"/crudPokemonFront"}
            className="links-nav"
          >
            Pokemons
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to={"/crudPokemonFront/createPokemon"}
            className="links-nav"
          >
            Criar Pokemon
          </Link>
        </Nav.Item>
      </Container>
    </Navbar>
  );
}
