import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HqCard from "../hqs/HqCard";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { hqs as mockHqs } from "./HqData";
import { useCart } from "../shopping_cart/CartContext";

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #990e04;
  border-radius: 12px;
  color: #f1e7e3;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1e7e3;
  border-radius: 8px;
  padding: 6px 10px;
  margin-bottom: 20px;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: #333;
    font-size: 16px;
    padding-left: 8px;
  }

  svg {
    color: #990e04;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
`;


const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;

  button {
    background: #f1e7e3;
    color: #990e04;
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: #e7cec3;
    }
  }
`;


const Toast = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #222;
  color: #fff;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.3);
  animation: fadeInOut 2s forwards;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(20px); }
  }
`;

export default function Hqs() {
  const { hero } = useParams();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);
  const itemsPerPage = 6;

  const filteredHqs = useMemo(() => {
    return mockHqs.filter((hq) => {
      const matchesSearch = hq.title.toLowerCase().includes(search.toLowerCase());
      const matchesHero = hero ? hq.hero.toLowerCase() === hero.toLowerCase() : true;
      return matchesSearch && matchesHero;
    });
  }, [search, hero]);

  const totalPages = Math.ceil(filteredHqs.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = filteredHqs.slice(startIndex, startIndex + itemsPerPage);

  function handleAddToCart(hq) {
    addToCart(hq);
    setToast(`"${hq.title}" foi adicionado ao carrinho!`);

    setTimeout(() => {
      setToast(null);
    }, 2000);
  }


  return (
    <Container>
      <SearchBar>
        <FiSearch size={18} />
        <input
          type="text"
          placeholder="Buscar HQ..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </SearchBar>

      <Grid>
        {currentItems.map((hq) => (
          <HqCard
            key={hq.id}
            id={hq.id}
            image={hq.image}
            title={hq.title}
            price={hq.price}
            hero={hq.hero}
            onAddToCart={() => handleAddToCart(hq)}
            linkTo={`/hq/${hq.id}`}
          />
        ))}
      </Grid>

      {totalPages > 1 && (
        <Pagination>
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            <FiChevronLeft size={20} />
          </button>
          <span>Página {page} de {totalPages}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
            <FiChevronRight size={20} />
          </button>
        </Pagination>
      )}

      {toast && <Toast>{toast}</Toast>}
    </Container>
  );
}