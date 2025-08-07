import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components';
import { useState, useRef, useEffect } from 'react';

//ESTILIZAÇÃO

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  background-color: transparent;
  padding: 1px 0;
  position: relative;
  z-index: 10;
`

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  gap: 24px;
  margin: 0;
  padding: 0;
`

const NavItem = styled.li`
  position: relative;
  color: #990e04;
  font-weight: bold;
  cursor: pointer;
  padding: 8px;

  &:hover ul,
  &:focus-within ul {
    display: block;
  }
`

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const Dropdown = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #990e04;
  color: #f1e7e3;
  list-style: none;
  padding: 8px 0;
  border-radius: 4px;
  min-width: 140px;
  z-index: 1000;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  ${NavItem}:hover &,
  ${NavItem}:focus-within & {
    display: block;
    animation: ${slideDown} 0.3s ease forwards;
  }
`;


const DropdownItem = styled.li`
  padding: 8px 16px;
  white-space: nowrap;
`

const StyledLink = styled(Link)`
  color: #e7cec3;
  text-decoration: none;
  display: block;
  width: 100%;

  &:hover {
    background-color: #5b534cff;
    border-radius: 2%;
  }
`

const categorias = [
  {
    nome: 'HQs',
    links: [
      { to: '/HQs/Homem-Aranha', label: 'Homem-Aranha' },
      { to: '/HQs/Venom', label: 'Venom' },
      { to: '/HQs/Homem-de-Ferro', label: 'Homem-de-Ferro' },
      { to: '/HQs/Hulk', label: 'Hulk' },
      { to: '/HQs/X-Man', label: 'X-Man' },
      { to: '/HQs/Vingadores', label: 'Vingadores' }
    ]
  }
]

//COMPONENTE

function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const navRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <NavbarContainer ref={navRef}>
      <NavMenu>
        {categorias.map((categoria, index) => (
          <NavItem
            key={categoria.nome}
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            {categoria.nome}
            <Dropdown style={{ display: openIndex === index ? 'block' : 'none' }}>
              {categoria.links.map(link => (
                <DropdownItem key={link.to}>
                  <StyledLink to={link.to} onClick={() => setOpenIndex(null)}>
                    {link.label}
                  </StyledLink>
                </DropdownItem>
              ))}
            </Dropdown>
          </NavItem>
        ))}
      </NavMenu>
    </NavbarContainer>
  )
}

export default Navbar