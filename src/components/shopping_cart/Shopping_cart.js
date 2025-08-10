import styled from "styled-components";
import { useState } from "react";
import { useCart } from "./CartContext";

const CartContainer = styled.div`
  background-color: #990e04;
  color: #f1e7e3;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartItem = styled.li`
  background-color: #e7cec3;
  color: #990e04;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #990e04;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: #c4150a;
  }
`;

const Total = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
  text-align: right;
`;

const CheckoutButton = styled.button`
  background-color: #f1e7e3;
  color: #990e04;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e7cec3;
    transform: scale(1.03);
  }
`;

const SuccessMessage = styled.div`
  background-color: #28a745;
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default function CartForm() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    clearCart();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <CartContainer>
      <Title>Seu Carrinho</Title>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Seu carrinho está vazio.</p>
      ) : (
        <>
          <CartList>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                {item.title} - R${item.price.toFixed(2)}
                <RemoveButton onClick={() => removeFromCart(item.id)}>✖</RemoveButton>
              </CartItem>
            ))}
          </CartList>
          <Total>Total: R${total.toFixed(2)}</Total>
          <CheckoutButton onClick={handleCheckout}>Finalizar Compra</CheckoutButton>
        </>
      )}

      {success && <SuccessMessage>✅ Compra realizada com sucesso!</SuccessMessage>}
    </CartContainer>
  );
}
