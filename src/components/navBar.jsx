import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navBar.css'

export default function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>

          <Nav.Item>
                    <Nav.Link href='/' className='link_personalizado'>
                        Pokemons
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" href='/createPokemon' className='link_personalizado'>
                        Criar Pokemon
                    </Nav.Link>
                </Nav.Item>
        </Container>
      </Navbar>
    )
}
