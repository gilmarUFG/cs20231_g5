import React, { useState } from 'react';

const StarIcon = ({ style }) => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 784.11 815.53"
    style={{
      ...style,
      shapeRendering: 'geometricPrecision',
      textRendering: 'geometricPrecision',
      imageRendering: 'optimizeQuality',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      fill: '#FFFFFF',
    }}
    version="1.1"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs></defs>
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer"></metadata>
      <path
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
        className="fil0"
      ></path>
    </g>
  </svg>
);

const AvalieAqui = () => {
  const [isHovered, setIsHovered] = useState(false);

  const starContainerStyle = {
    position: 'absolute',
    transition: `all 1s ${isHovered ? '0s' : '0.3s'} cubic-bezier(0.05, 0.83, 0.43, 0.96)`, // Add transition property with a delay if not hovered
    opacity: isHovered ? 1 : 0, // Change opacity to make the stars visible instantly upon hovering
  };

  const star1Style = {
    ...starContainerStyle,
    top: isHovered ? '-80%' : '20%', // Change the initial position based on isHovered state
    left: isHovered ? '-30%' : '20%', // Change the initial position based on isHovered state
    width: '25px',
    height: 'auto',
    filter: isHovered ? 'drop-shadow(0 0 10px #fffdef)' : 'drop-shadow(0 0 0 #fffdef)', // Add filter property
  };

  const star2Style = {
    ...starContainerStyle,
    top: isHovered ? '-25%' : '45%', // Change the initial position based on isHovered state
    left: isHovered ? '10%' : '45%', // Change the initial position based on isHovered state
    width: '15px',
    height: 'auto',
    filter: isHovered ? 'drop-shadow(0 0 10px #fffdef)' : 'drop-shadow(0 0 0 #fffdef)', // Add filter property
  };

  const star3Style = {
    ...starContainerStyle,
    top: isHovered ? '55%' : '40%', // Change the initial position based on isHovered state
    left: isHovered ? '25%' : '40%', // Change the initial position based on isHovered state
    width: '5px',
    height: 'auto',
    filter: isHovered ? 'drop-shadow(0 0 10px #fffdef)' : 'drop-shadow(0 0 0 #fffdef)', // Add filter property
  };

  const star4Style = {
    ...starContainerStyle,
    top: isHovered ? '30%' : '20%', // Change the initial position based on isHovered state
    left: isHovered ? '80%' : '40%', // Change the initial position based on isHovered state
    width: '8px',
    height: 'auto',
    filter: isHovered ? 'drop-shadow(0 0 10px #fffdef)' : 'drop-shadow(0 0 0 #fffdef)', // Add filter property
  };

  const star5Style = {
    ...starContainerStyle,
    top: isHovered ? '25%' : '25%', // Change the initial position based on isHovered state
    left: isHovered ? '115%' : '45%', // Change the initial position based on isHovered state
    width: '15px',
    height: 'auto',
    filter: isHovered ? 'drop-shadow(0 0 10px #fffdef)' : 'drop-shadow(0 0 0 #fffdef)', // Add filter property
  };

  const star6Style = {
    ...starContainerStyle,
    top: isHovered ? '5%' : '5%', // Change the initial position based on isHovered state
    left: isHovered ? '60%' : '50%', // Change the initial position based on isHovered state
    width: '5px',
    height: 'auto',
    filter: isHovered ? 'drop-shadow(0 0 10px #fffdef)' : 'drop-shadow(0 0 0 #fffdef)', // Add filter property
  };

  const handleButtonHover = () => {
    setIsHovered(true);
  };

  const handleButtonLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    // Adicione a propriedade transition para suavizar as mudanças de estilo no botão
    position: 'relative',
    padding: '12px 35px',
    background: '#b0bada',
    fontSize: '17px',
    fontWeight: 500,
    color: '#181818',
    border: '3px solid #b0bada',
    borderRadius: '8px',
    boxShadow: '0 0 0 #fec1958c',
    transition: 'background .3s ease-in-out, color .3s ease-in-out, box-shadow .3s ease-in-out',
  };

  const buttonHoverStyle = {
    // Estilos quando o mouse estiver sobre o botão
    background: '#30404F', // Mudança para um cinza azulado escuro
    color: '#FEC195', // Mudança para a cor do fundo antigo
    boxShadow: '0 0 10px #FFFFFF', // Sombra branca
  };

  return (
    <button
      style={{ ...buttonStyle, ...(isHovered ? buttonHoverStyle : {}) }}
      onMouseEnter={handleButtonHover}
      onMouseLeave={handleButtonLeave}
      class="button"
    >
      AvalieAqui!!!
      <div className="star-1" style={star1Style}>
        <StarIcon style={star1Style} />
      </div>
      <div className="star-2" style={star2Style}>
        <StarIcon style={star2Style} />
      </div>
      <div className="star-3" style={star3Style}>
        <StarIcon style={star3Style} />
      </div>
      <div className="star-4" style={star4Style}>
        <StarIcon style={star4Style} />
      </div>
      <div className="star-5" style={star5Style}>
        <StarIcon style={star5Style} />
      </div>
      <div className="star-6" style={star6Style}>
        <StarIcon style={star6Style} />
      </div>
    </button>
  );
};

export default AvalieAqui;
