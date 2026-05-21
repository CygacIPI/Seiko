interface ArrowNoteProps {
  direction: 'left' | 'up' | 'down' | 'right';
  isStatic?: boolean;
  showKey?: string;
  size?: number;
}

export function ArrowNote({ direction, isStatic = false, showKey, size = 80 }: ArrowNoteProps) {
  // Colores basados en FNF
  const colors = {
    left: '#C24B99',  // Púrpura
    down: '#00FFFF',  // Cyan
    up: '#12FA05',    // Verde
    right: '#F9393F', // Rojo
  };

  const color = colors[direction];

  // SVG de la flecha estilo FNF
  const renderArrow = () => {
    const rotation = {
      left: 180,
      down: 90,
      up: 270,
      right: 0,
    };

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{
          transform: `rotate(${rotation[direction]}deg)`,
          filter: isStatic ? 'brightness(0.4)' : 'none',
        }}
      >
        {/* Fondo de la flecha */}
        <path
          d="M 20 10 L 80 50 L 20 90 L 35 50 Z"
          fill={isStatic ? '#404040' : color}
          stroke={isStatic ? '#202020' : '#000000'}
          strokeWidth="3"
        />

        {/* Borde interno */}
        <path
          d="M 30 25 L 65 50 L 30 75 L 40 50 Z"
          fill={isStatic ? '#303030' : color}
          opacity="0.7"
        />

        {/* Highlight */}
        {!isStatic && (
          <path
            d="M 35 30 L 55 50 L 35 70 L 42 50 Z"
            fill="white"
            opacity="0.3"
          />
        )}
      </svg>
    );
  };

  return (
    <div className="relative flex items-center justify-center">
      {renderArrow()}
      {showKey && (
        <div
          className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: '#000000',
            textShadow: '0 0 3px rgba(255,255,255,0.5)',
          }}
        >
          {showKey}
        </div>
      )}
    </div>
  );
}
