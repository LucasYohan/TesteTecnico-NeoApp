import Slider from 'react-slick';
import styled, { keyframes } from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const CatalogoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: transparent;
  border-radius: 16px;

  .slick-slide {
    display: flex !important;
    justify-content: center;
  }

  .slick-dots li button:before {
    font-size: 12px;
    color: #533d25;
    opacity: 0.6;
  }

  .slick-dots li.slick-active button:before {
    color: #e7cec3;
    opacity: 1;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 350px;
  border-radius: 16px;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

const CatalogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01);
  }
`;

function Catalogo() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    adaptiveHeight: false,
  };

  return (
    <CatalogoContainer>
      <Slider {...settings}>
        <div><ImageWrapper><CatalogoImage src={`${process.env.PUBLIC_URL}/images/banner1.jpg`} alt="Madrinhas de Rose" /></ImageWrapper></div>
        <div><ImageWrapper><CatalogoImage src={`${process.env.PUBLIC_URL}/images/banner2.jpg`} alt="Madrinhas de Fúcsia" /></ImageWrapper></div>
        <div><ImageWrapper><CatalogoImage src={`${process.env.PUBLIC_URL}/images/banner3.jpg`} alt="Madrinhas de Lavanda" /></ImageWrapper></div>
        <div><ImageWrapper><CatalogoImage src={`${process.env.PUBLIC_URL}/images/banner4.webp`} alt="Madrinhas de Tons Verdes" /></ImageWrapper></div>
        <div><ImageWrapper><CatalogoImage src={`${process.env.PUBLIC_URL}/images/banner5.jpg`} alt="Madrinhas de Tons Verdes" /></ImageWrapper></div>
        <div><ImageWrapper><CatalogoImage src={`${process.env.PUBLIC_URL}/images/banner6.webp`} alt="Madrinhas de Tons Verdes" /></ImageWrapper></div>
        <div><ImageWrapper><CatalogoImage src={`${process.env.PUBLIC_URL}/images/banner7.jpeg`} alt="Madrinhas de Tons Verdes" /></ImageWrapper></div>
      </Slider>

    </CatalogoContainer>
  );
}

export default Catalogo;
