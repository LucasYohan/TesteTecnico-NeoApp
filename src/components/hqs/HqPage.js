import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { hqs as mockHqs } from "./HqData";
import { useCart } from "../shopping_cart/CartContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const toastAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateY(20px); }
`;

const PageContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #990e04;
  color: #f1e7e3;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.4s ease-in-out;
  position: relative;
`;

const Toast = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f1e7e3;
  color: #990e04;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  animation: ${toastAnimation} 2s ease forwards;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #f1e7e3;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;

  &:hover {
    color: #e7cec3;
  }
`;

const HqContent = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const CoverImage = styled.img`
  width: 300px;
  border-radius: 8px;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const ReleaseDate = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
  opacity: 0.8;
`;

const Synopsis = styled.p`
  margin-bottom: 20px;
  line-height: 1.4;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const CartButton = styled.button`
  background-color: #f1e7e3;
  color: #990e04;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e7cec3;
    transform: scale(1.03);
  }
`;

export default function HqPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // <-- pega do contexto
  const [hq, setHq] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const found = mockHqs.find((item) => item.id === Number(id));
    setHq(found);
  }, [id]);

  if (!hq) {
    return (
      <PageContainer>
        <p>HQ não encontrada.</p>
      </PageContainer>
    );
  }

  const handleAddToCart = () => {
    addToCart(hq); // <-- agora sempre funciona
    setToast(`"${hq.title}" foi adicionado ao carrinho!`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FiArrowLeft /> Voltar
      </BackButton>

      <HqContent>
        <CoverImage src={hq.image} alt={hq.title} />
        <Info>
          <Title>{hq.title}</Title>
          <ReleaseDate>
            Data de lançamento:{" "}
            {new Date(hq.releaseDate).toLocaleDateString("pt-BR")}
          </ReleaseDate>
          <Synopsis>{hq.synopsis}</Synopsis>
          <Price>R$ {hq.price.toFixed(2)}</Price>
          <CartButton onClick={handleAddToCart}>
            <FiShoppingCart size={18} /> Adicionar ao Carrinho
          </CartButton>
        </Info>
      </HqContent>

      {toast && <Toast>{toast}</Toast>}
    </PageContainer>
  );
}
