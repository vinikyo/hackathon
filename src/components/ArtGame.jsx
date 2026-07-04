import React, { useState } from 'react';

// Dicionário de Cores para cada Dificuldade
const PALETTES = {
  easy: [
    { id: 'red', hex: '#EF4444', name: 'Vermelho' },
    { id: 'yellow', hex: '#EAB308', name: 'Amarelo' },
    { id: 'blue', hex: '#3B82F6', name: 'Azul' },
  ],
  medium: [
    { id: 'red', hex: '#EF4444', name: 'Vermelho' },
    { id: 'yellow', hex: '#EAB308', name: 'Amarelo' },
    { id: 'blue', hex: '#3B82F6', name: 'Azul' },
    { id: 'white', hex: '#FFFFFF', name: 'Branco' },
    { id: 'black', hex: '#111827', name: 'Preto' },
  ],
  hard: [
    { id: 'red', hex: '#EF4444', name: 'Vermelho' },
    { id: 'yellow', hex: '#EAB308', name: 'Amarelo' },
    { id: 'blue', hex: '#3B82F6', name: 'Azul' },
    { id: 'white', hex: '#FFFFFF', name: 'Branco' },
    { id: 'black', hex: '#111827', name: 'Preto' },
  ]
};

// Banco de dados de fases separado por dificuldade
const ROUNDS_DATA = {
  easy: [
    { id: 1, shape: 'flower', targetColorHex: '#F97316', reqColors: ['red', 'yellow'], mixName: 'Laranja' },
    { id: 2, shape: 'leaf', targetColorHex: '#22C55E', reqColors: ['blue', 'yellow'], mixName: 'Verde' },
    { id: 3, shape: 'star', targetColorHex: '#A855F7', reqColors: ['red', 'blue'], mixName: 'Roxo' },
  ],
  medium: [
    { id: 1, shape: 'heart', targetColorHex: '#F472B6', reqColors: ['red', 'white'], mixName: 'Rosa (Claro)' },
    { id: 2, shape: 'drop', targetColorHex: '#7DD3FC', reqColors: ['blue', 'white'], mixName: 'Azul Claro' },
    { id: 3, shape: 'star', targetColorHex: '#7F1D1D', reqColors: ['red', 'black'], mixName: 'Vermelho Escuro' },
    { id: 4, shape: 'leaf', targetColorHex: '#9CA3AF', reqColors: ['white', 'black'], mixName: 'Cinza' },
  ],
  hard: [
    { id: 1, shape: 'flower', targetColorHex: '#78350F', reqColors: ['red', 'yellow', 'blue'], mixName: 'Marrom' },
    { id: 2, shape: 'leaf', targetColorHex: '#86EFAC', reqColors: ['blue', 'yellow', 'white'], mixName: 'Verde Claro' },
    { id: 3, shape: 'star', targetColorHex: '#9A3412', reqColors: ['red', 'yellow', 'black'], mixName: 'Laranja Escuro' },
    { id: 4, shape: 'heart', targetColorHex: '#D8B4FE', reqColors: ['red', 'blue', 'white'], mixName: 'Lilás' },
    { id: 5, shape: 'drop', targetColorHex: '#4C1D95', reqColors: ['red', 'blue', 'black'], mixName: 'Roxo Escuro' },
  ]
};

// Componente para desenhar SVG
const ShapeIcon = ({ type, fill, className }) => {
  const paths = {
    flower: "M12 2C9.5 2 8 4 8 6.5C8 7.3 8.2 8.1 8.6 8.8C6.1 8.2 3 9.5 3 12.5C3 15 5 16.5 7.5 16.5C8.3 16.5 9.1 16.3 9.8 15.9C9.2 18.4 10.5 21.5 13.5 21.5C16 21.5 17.5 19.5 17.5 17C17.5 16.2 17.3 15.4 16.9 14.7C19.4 15.3 22.5 14 22.5 11C22.5 8.5 20.5 7 18 7C17.2 7 16.4 7.2 15.7 7.6C16.3 5.1 15 2 12 2Z",
    leaf: "M12 2C12 2 4 6 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 6 12 2 12 2ZM12 19V10",
    star: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
    heart: "M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z",
    drop: "M12 2.69L17.55 8.35C19.5 10.33 20.61 12.89 20.61 15.61C20.61 20.24 16.76 24 12 24C7.24 24 3.39 20.24 3.39 15.61C3.39 12.89 4.5 10.33 6.45 8.35L12 2.69Z"
  };
  return (
    <svg viewBox="0 0 24 24" className={className} fill={fill} stroke={fill !== '#CBD5E1' ? 'none' : '#64748B'} strokeWidth="1">
      <path d={paths[type] || paths.flower} />
    </svg>
  );
};

export default function ArtGame({ onBack }) {
  const [difficulty, setDifficulty] = useState(null); // null = Menu inicial
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedColors, setSelectedColors] = useState([]);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [resultColor, setResultColor] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // Funções do Menu
  const startGame = (level) => {
    setDifficulty(level);
    setCurrentRound(0);
    setScore(0);
    setSelectedColors([]);
    setResultColor(null);
  };

  // Se não escolheu dificuldade, mostra o Menu
  if (!difficulty) {
    return (
      <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">🎨 Cores Mágicas</h1>
          <p className="text-slate-500 mb-8">Escolha a dificuldade para começar a pintar!</p>
          
          <div className="flex flex-col gap-4">
            <button onClick={() => startGame('easy')} className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg transition-transform hover:scale-105">
              Fácil (Apenas Primárias)
            </button>
            <button onClick={() => startGame('medium')} className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg transition-transform hover:scale-105">
              Médio (Luz e Sombra)
            </button>
            <button onClick={() => startGame('hard')} className="p-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-lg transition-transform hover:scale-105">
              Difícil (Mistura Tripla)
            </button>
          </div>

          <button onClick={onBack} className="mt-8 text-slate-400 hover:text-slate-600 font-semibold underline">
            Voltar ao Menu Principal
          </button>
        </div>
      </div>
    );
  }

  // Lógica do Jogo Rodando
  const rounds = ROUNDS_DATA[difficulty];
  const roundData = rounds[currentRound];
  const isGameOver = currentRound >= rounds.length;
  const currentPalette = PALETTES[difficulty];
  const colorsNeeded = roundData?.reqColors.length || 2; // Quantas bolinhas precisa clicar

  const handleColorClick = (colorId) => {
    if (isAnimating || selectedColors.length >= colorsNeeded) return;

    const newSelection = [...selectedColors, colorId];
    setSelectedColors(newSelection);

    // Valida apenas quando o jogador escolher a quantidade certa de cores para a fase
    if (newSelection.length === colorsNeeded) {
      setIsAnimating(true);
      
      // Verifica se todas as cores exigidas foram selecionadas
      const hasCorrectColors = newSelection.every(c => roundData.reqColors.includes(c));
      
      if (hasCorrectColors) {
        setResultColor(roundData.targetColorHex);
        setFeedbackText("Correto! 🎉");
        setScore(s => s + (100 / rounds.length)); // Divide 100 pts pelo nº de rodadas
      } else {
        setResultColor("#4B5563"); // Cor de burro quando foge (Cinza/Lama)
        setFeedbackText("Mistura errada!");
      }

      setTimeout(() => {
        setCurrentRound(r => r + 1);
        setSelectedColors([]);
        setResultColor(null);
        setFeedbackText("");
        setIsAnimating(false);
      }, 2500);
    }
  };

  if (isGameOver) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
        <h1 className="text-4xl font-bold mb-4">Fim de Jogo! 🎨</h1>
        <p className="text-2xl mb-8">Sua pontuação: <span className="text-yellow-400 font-bold">{Math.round(score)} / 100</span></p>
        <div className="flex gap-4">
          <button onClick={() => setDifficulty(null)} className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-bold">Trocar Dificuldade</button>
          <button onClick={onBack} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold">Sair</button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-slate-100 overflow-hidden flex flex-col">
      <div className="p-4 bg-white shadow flex justify-between items-center z-10">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Cores Mágicas</h2>
          <p className="text-sm text-slate-500">Nível: {difficulty.toUpperCase()} | Rodada {currentRound + 1} de {rounds.length}</p>
        </div>
        <div className="text-xl font-bold text-rose-500">Pontos: {Math.round(score)}</div>
        <button onClick={() => setDifficulty(null)} className="text-slate-500 hover:text-red-500 underline font-semibold">Desistir</button>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center">
        
        {/* IMAGEM OBJETIVO (Gabarito) */}
        <div className="absolute top-8 left-8 bg-white p-3 rounded-2xl shadow-lg border-2 border-slate-200 flex flex-col items-center">
          <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Objetivo</p>
          <ShapeIcon type={roundData.shape} fill={roundData.targetColorHex} className="w-16 h-16 drop-shadow-md" />
        </div>

        {/* IMAGEM CENTRAL */}
        <div className="relative mb-12 transition-transform duration-500 hover:scale-105">
          {feedbackText && (
            <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 font-bold text-2xl ${resultColor === roundData.targetColorHex ? 'text-green-500' : 'text-red-500'} animate-bounce w-max`}>
              {feedbackText}
            </div>
          )}
          
          <ShapeIcon 
            type={roundData.shape} 
            fill={resultColor || '#CBD5E1'} 
            className="w-64 h-64 transition-colors duration-1000 ease-in-out drop-shadow-xl"
          />
        </div>

        {/* ÁREA DE CONTROLE (Bolinhas) */}
        <div className="bg-white px-10 py-8 rounded-3xl shadow-xl flex flex-col items-center z-10 border border-slate-200 max-w-2xl w-full">
          <p className="font-bold text-slate-600 mb-2 text-lg">
            Misture <span className="text-rose-500">{colorsNeeded} cores</span> para chegar ao objetivo!
          </p>
          <p className="text-sm text-slate-400 mb-6">Selecione as cores na paleta abaixo.</p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {currentPalette.map(color => {
              const isSelected = selectedColors.includes(color.id);
              // Lógica extra para a bolinha branca ter borda para não sumir no fundo branco
              const extraClasses = color.hex === '#FFFFFF' ? 'border-2 border-slate-200' : '';

              return (
                <button
                  key={color.id}
                  onClick={() => handleColorClick(color.id)}
                  disabled={isAnimating || isSelected}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 transform 
                    ${isSelected ? 'scale-125 ring-4 ring-offset-4 ring-rose-400 opacity-50' : 'hover:scale-110 hover:-translate-y-2 cursor-pointer'} 
                    shadow-lg ${extraClasses}
                  `}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}