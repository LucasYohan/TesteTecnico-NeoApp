import styled, { keyframes } from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { image } from "framer-motion/client";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled.div`
  background-color: #990e04;
  color: #f1e7e3;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  animation: ${fadeIn} 0.4s ease-in-out;
  transition: transform 0.2s ease-in-out;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: scale(1.02);
  }
`;

const Cover = styled.img`
  width: 50%;
  max-width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const Info = styled.div`
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 5px 0;
`;

const Price = styled.p`
  font-weight: bold;
  margin: 5px 0;
`;

const CartButton = styled.button`
  background-color: #f1e7e3;
  color: #990e04;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e7cec3;
    transform: scale(1.05);
  }
`;

export default function HqCard({ id, image, title, price, hero, onAddToCart, onClick }) {
  return (
    <Card onClick={onClick}>
      <Cover src={image} alt={title} />
      <Info>
        <Title>{title}</Title>
        <Price>R$ {price.toFixed(2)}</Price>
        <CartButton
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(id);
          }}
        >
          <FiShoppingCart size={16} /> Adicionar
        </CartButton>
      </Info>
    </Card>
  );
}

