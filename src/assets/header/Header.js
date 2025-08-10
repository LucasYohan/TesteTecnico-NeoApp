import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import logo from "../../images/logo.jpeg";

// Animação de fade + slide para baixo
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeaderContainer = styled.header`
  background-color: #990e04;
  color: #f1e7e3;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const LogoImg = styled.img`
  height: 70px;
  border-radius: 15%;
`;

const Icons = styled.div`
  display: flex;
  gap: 16px;
`;

const IconLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100%;
  background-color: #990e04;
  color: #fff;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;
  z-index: 1000;
`;

const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 16px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
`;

const SubMenuWrapper = styled.div`
  overflow: hidden;
  max-height: ${({ open }) => (open ? "500px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: max-height 0.3s ease, opacity 0.3s ease;
  animation: ${({ open }) => open && slideDown} 0.3s ease;
`;

const SubMenu = styled.ul`
  list-style: none;
  padding-left: 16px;
  margin: 4px 0;
`;

const SubMenuItem = styled.li`
  padding: 4px 0;
`;

const StyledLink = styled(Link)`
  color: #e7cec3;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #5b534c;
    border-radius: 4px;
    padding-left: 4px;
  }
`;

const categorias = [
  {
    nome: "Páginas",
    links: [
      { to: "/Home", label: "Página Inicial" },
      { to: "/Carrinho", label: "Carrinho" },
      { to: "/Conta", label: "Conta" },
    ],
  },
  {
    nome: "HQs",
    links: [
      { to: "/HQs", label: "Todas" },
      { to: "/HQs/Homem-Aranha", label: "Homem-Aranha" },
      { to: "/HQs/Venom", label: "Venom" },
      { to: "/HQs/Homem-de-Ferro", label: "Homem-de-Ferro" },
      { to: "/HQs/Hulk", label: "Hulk" },
      { to: "/HQs/X-Man", label: "X-Man" },
      { to: "/HQs/Vingadores", label: "Vingadores" },
    ],
  },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);

  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <FiMenu
            size={24}
            onClick={() => setMenuOpen(true)}
            style={{ cursor: "pointer" }}
          />
        </LeftSection>

        <Logo>
          <LogoLink to="/">
            <LogoImg src={logo} alt="Logo da loja" />
          </LogoLink>
        </Logo>

        <Icons>
          <IconLink to="/Carrinho">
            <FiShoppingBag size={22} />
          </IconLink>
          <IconLink to="/Conta">
            <FiUser size={22} />
          </IconLink>
        </Icons>
      </HeaderContainer>

      <SideMenu open={menuOpen}>
        <CloseBtn>
          <FiX onClick={() => setMenuOpen(false)} style={{ cursor: "pointer" }} />
        </CloseBtn>

        <MenuList>
          {categorias.map((categoria, index) => (
            <MenuItem
              key={categoria.nome}
              onClick={() =>
                setSubmenuOpen(submenuOpen === index ? null : index)
              }
            >
              {categoria.nome}
              <SubMenuWrapper open={submenuOpen === index}>
                <SubMenu>
                  {categoria.links.map((link) => (
                    <SubMenuItem key={link.to}>
                      <StyledLink
                        to={link.to}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </StyledLink>
                    </SubMenuItem>
                  ))}
                </SubMenu>
              </SubMenuWrapper>
            </MenuItem>
          ))}
        </MenuList>
      </SideMenu>
    </>
  );
}

export default Header;
