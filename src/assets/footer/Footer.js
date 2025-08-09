import styled from 'styled-components';

//ESTILIZAÇÃO

const FooterContainer = styled.footer`
  background-color: #990e04;
  color: #f1e7e3;
  text-align: center;
  padding: 1px 0;
  position: relative;
  bottom: 0;
  width: 100%;
  font-size: 14px;
`;

//COMPONENTE

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} NeoApp. Todos os direitos reservados.</p>
    </FooterContainer>
  );
}

export default Footer;