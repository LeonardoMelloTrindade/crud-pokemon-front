import React from 'react'
import Nav from 'react-bootstrap/Nav';
import './navBar.css'

export default function NavBar() {
    return (
        <div className='nav_container d-flex align-items-center'>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Item>
                    <Nav.Link href='/' className='link_personalizado'>
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" href='/createPokemon'>
                        Criar Pokemon
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" href='/showPokemon'>
                        Ver Pokemons
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}
