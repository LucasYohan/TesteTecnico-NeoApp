import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HqCard from "../hqs/HqCard";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { hqs as mockHqs } from "./HqData";

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
  const { hero } = useParams();
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