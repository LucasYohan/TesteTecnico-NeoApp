import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HqCard from "../hqs/HqCard";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import spidermanImg from "../../images/spidermanImg.webp";

const mockHqs = [
  { id: 1, title: "Spider-Man: Life Story", price: 220.9, image: spidermanImg, hero: "Homem-Aranha" },
  { id: 2, title: "X-Men #1", price: 35.5, image: "/images/xmen1.jpg", hero: "X-Man" },
  { id: 3, title: "Batman #1", price: 27.9, image: "/images/batman1.jpg", hero: "Batman" },
  { id: 4, title: "Superman #1", price: 32.0, image: "/images/superman1.jpg", hero: "Superman" },
  { id: 5, title: "Avengers #1", price: 40.0, image: "/images/avengers1.jpg", hero: "Vingadores" },
  { id: 6, title: "Flash #1", price: 28.5, image: "/images/flash1.jpg", hero: "Flash" },
  { id: 7, title: "Iron Man #1", price: 30.0, image: "/images/ironman1.jpg", hero: "Homem-de-Ferro" },
  { id: 8, title: "Thor #1", price: 29.0, image: "/images/thor1.jpg", hero: "Thor" },
];

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

export default function Hqs() {
  const { hero } = useParams(); // vem da rota /HQs/:hero
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
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
          <Link
            to={`/hq/${hq.id}`}
            key={hq.id}
            style={{ textDecoration: "none" }}
          >
            <HqCard
              image={hq.image}
              title={hq.title}
              price={hq.price}
              hero={hq.hero}
              onAddToCart={() => alert(`Adicionado: ${hq.title}`)}
            />
          </Link>
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
    </Container>
  );
}