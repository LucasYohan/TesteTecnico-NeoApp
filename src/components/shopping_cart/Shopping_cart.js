import styled from "styled-components";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { coupons } from "../../utils/untils";

// ESTILIZAÇÃO
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
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
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
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;

export default function CartForm() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCoupons = localStorage.getItem("appliedCoupons");
    const savedDiscount = localStorage.getItem("discount");

    if (savedCoupons) setAppliedCoupons(JSON.parse(savedCoupons));
    if (savedDiscount) setDiscount(parseFloat(savedDiscount));
  }, []);

  useEffect(() => {
    localStorage.setItem("appliedCoupons", JSON.stringify(appliedCoupons));
    localStorage.setItem("discount", discount.toString());
  }, [appliedCoupons, discount]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const couponData = coupons[code];

    if (!couponData) {
      alert("Cupom inválido!");
      return;
    }
    if (appliedCoupons.includes(code)) {
      alert("Cupom já utilizado!");
      return;
    }

    let applicableItems;
    if (couponData.type === "rare") {
      applicableItems = cartItems.filter((item) => item.rare);
    } else {
      applicableItems = cartItems.filter((item) => !item.rare);
    }

    if (applicableItems.length === 0) {
      alert("Nenhum item elegível para este cupom!");
      return;
    }

    const discountValue = applicableItems.reduce(
      (sum, item) => sum + item.price * couponData.discount,
      0
    );

    setDiscount((prev) => prev + discountValue);
    setAppliedCoupons((prev) => [...prev, code]);
    setCoupon("");
  };

  const handleCheckout = () => {
    clearCart();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setDiscount(0);
    setAppliedCoupons([]);
    localStorage.removeItem("appliedCoupons");
    localStorage.removeItem("discount");
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
                {item.title} ({item.rare ? "Raro" : "Comum"}) - R${item.price.toFixed(2)}
                <RemoveButton onClick={() => removeFromCart(item.id)}>✖</RemoveButton>
              </CartItem>
            ))}
          </CartList>

          <div style={{ marginTop: "15px" }}>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Digite seu cupom"
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "70%",
                marginRight: "5px",
              }}
            />
            <button
              onClick={handleApplyCoupon}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background: "#f1e7e3",
                color: "#990e04",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Aplicar
            </button>
          </div>

          {appliedCoupons.length > 0 && (
            <div style={{ marginTop: "10px", fontSize: "14px" }}>
              Cupons usados: {appliedCoupons.join(", ")}
            </div>
          )}

          <Total>Subtotal: R${subtotal.toFixed(2)}</Total>
          <Total>Desconto: -R${discount.toFixed(2)}</Total>
          <Total>Total: R${total.toFixed(2)}</Total>

          <CheckoutButton onClick={handleCheckout}>Finalizar Compra</CheckoutButton>
        </>
      )}
      {success && <SuccessMessage>✅ Compra realizada com sucesso!</SuccessMessage>}
    </CartContainer>
  );
}
