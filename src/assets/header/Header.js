import { Link } from 'react-router-dom';
import { FiShoppingBag, FiUser } from 'react-icons/fi';
import logo from '../../images/logo.jpeg';
import styled from 'styled-components';

//ESTILIZAÇÃO

const HeaderContainer = styled.header`
  background-color: #990e04;
  color: #f1e7e3;
  padding: 1px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Logo = styled.div``;

const LogoLink = styled(Link)`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
`;

const LogoImg = styled.img`
  height: 70px;
  width: auto;
  border-radius: 15%;
`;

const SearchBar = styled.div`
  flex: 1;
  margin: 0 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
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

//COMPONENTE

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <LogoLink to="/">
          <LogoImg src={logo} alt="Logo da loja" />
        </LogoLink>
      </Logo>

      <SearchBar>
        <SearchInput type="text" placeholder="Buscar produtos..." />
      </SearchBar>

      <Icons>
        <IconLink to="/carrinho">
          <FiShoppingBag size={22} />
        </IconLink>
        <IconLink to="/conta">
          <FiUser size={22} />
        </IconLink>
      </Icons>
    </HeaderContainer>
  );
}

export default Header;