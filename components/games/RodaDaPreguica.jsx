"use client";

import { useState, useEffect, useCallback } from "react";

// Base reduzida para garantir um ciclo de jogo focado e dinâmico na apresentação.
const RODA_DB = [
  { letter: "A", clue: "Maior floresta tropical do mundo.", answer: "Amazonas" },
  { letter: "B", clue: "Capital federal do nosso país.", answer: "Brasilia" },
  { letter: "C", clue: "Maior festa popular brasileira.", answer: "Carnaval" },
  { letter: "D", clue: "Óleo muito utilizado na culinária baiana.", answer: "Dende" },
  { letter: "E", clue: "Maior ave do Brasil, não voa mas corre muito rápido.", answer: "Ema" },
  { letter: "F", clue: "Prato típico feito com feijão preto e carnes.", answer: "Feijoada" },
  { letter: "G", clue: "Refrigerante muito popular, originário da Amazônia.", answer: "Guarana" },
  { letter: "I", clue: "Cataratas famosas localizadas no Paraná.", answer: "Iguacu" },
  { letter: "J", clue: "Fruta nativa da Mata Atlântica que cresce no tronco.", answer: "Jabuticaba" },
  { letter: "M", clue: "Raiz muito consumida no Brasil, também chamada de aipim.", answer: "Mandioca" },
  { letter: "P", clue: "Bioma brasileiro conhecido por suas áreas alagadas.", answer: "Pantanal" },
  { letter: "S", clue: "Gênero musical que é a cara do Brasil.", answer: "Samba" }
];

const MAX_ERRORS = 5;

const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export default function RodaDaPreguica({ onBack }) {
  const [lettersState, setLettersState] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [lives, setLives] = useState(MAX_ERRORS);
  const [gameStatus, setGameStatus] = useState("playing");
  const [errorMsg, setErrorMsg] = useState("");

  const startNewGame = useCallback(() => {
    setLettersState(RODA_DB.map(item => ({ ...item, status: "pending" })));
    setCurrentIndex(0);
    setInputValue("");
    setLives(MAX_ERRORS);
    setGameStatus("playing");
    setErrorMsg("");
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const advanceToNextPending = (newState, startIndex) => {
    let nextIndex = (startIndex + 1) % newState.length;
    let loopCount = 0;

    while (newState[nextIndex].status === "correct" && loopCount < newState.length) {
      nextIndex = (nextIndex + 1) % newState.length;
      loopCount++;
    }

    if (loopCount === newState.length) {
      setGameStatus("won");
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleGuess = (e) => {
    e?.preventDefault();
    if (gameStatus !== "playing") return;

    const trimmed = inputValue.trim();
    if (!trimmed) {
      setErrorMsg("Digite uma resposta.");
      return;
    }

    setErrorMsg("");
    const currentItem = lettersState[currentIndex];
    const isCorrect = normalizeText(trimmed) === normalizeText(currentItem.answer);

    const newState = [...lettersState];

    if (isCorrect) {
      newState[currentIndex].status = "correct";
      setLettersState(newState);
      setInputValue("");
      advanceToNextPending(newState, currentIndex);
    } else {
      newState[currentIndex].status = "error"; // Marca como erro temporal para a animação
      setLettersState(newState);
      setInputValue("");

      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameStatus("lost");
        } else {
          // Após errar, volta para pending depois de avançar (como a Roda tradicional)
          setTimeout(() => {
             const resetState = [...newState];
             resetState[currentIndex].status = "pending";
             setLettersState(resetState);
          }, 1000);
          advanceToNextPending(newState, currentIndex);
        }
        return newLives;
      });
    }
  };

  const handleSkip = () => {
    if (gameStatus !== "playing") return;
    setInputValue("");
    setErrorMsg("");
    advanceToNextPending(lettersState, currentIndex);
  };

  if (lettersState.length === 0) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">

        <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white text-sm underline transition"
          >
            Voltar ao Hub
          </button>
          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
            RODA DA PREGUIÇA
          </h1>
          <div className="flex gap-1 text-xl">
            {Array.from({ length: MAX_ERRORS }).map((_, i) => (
              <span key={i}>{i < lives ? "" : ""}</span>
            ))}
          </div>
        </div>

        {gameStatus === "playing" && (
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center mt-8">

            {/* Roda Visual */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center rounded-full border-4 border-slate-700 bg-slate-900 shadow-2xl shrink-0">
              {lettersState.map((item, idx) => {
                const angle = (idx / lettersState.length) * 360;
                const isActive = idx === currentIndex;

                let bgColor = "bg-slate-800 text-slate-400 border border-slate-700";
                if (isActive) bgColor = "bg-blue-500 text-white scale-125 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10 border-none";
                else if (item.status === "correct") bgColor = "bg-green-500 text-slate-900 border-none";
                else if (item.status === "error") bgColor = "bg-red-500 text-white border-none";

                return (
                  <div
                    key={item.letter}
                    className={`absolute w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${bgColor}`}
                    style={{
                      transform: `rotate(${angle - 90}deg) translate(140px) rotate(-${angle - 90}deg)`
                    }}
                  >
                    {item.letter}
                  </div>
                );
              })}

              <div className="text-7xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                {lettersState[currentIndex].letter}
              </div>
            </div>

            {/* Painel de Interação */}
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col items-center">
              <h3 className="text-emerald-400 font-bold tracking-widest text-sm mb-4">DICA ATUAL</h3>

              <div className="bg-slate-800 w-full min-h-[100px] p-4 rounded-xl mb-6 text-center text-lg sm:text-xl font-medium text-slate-200 flex items-center justify-center">
                {lettersState[currentIndex].clue}
              </div>

              <form onSubmit={handleGuess} className="w-full flex flex-col gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Sua resposta..."
                  className="w-full bg-slate-950 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition"
                  autoFocus
                />

                {errorMsg && <p className="text-red-400 text-sm text-center">{errorMsg}</p>}

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition"
                  >
                    Pular
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                  >
                    Responder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {gameStatus === "won" && (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-8 text-center mt-12 shadow-2xl max-w-lg mx-auto">
            <h2 className="text-4xl font-black mb-3">VITÓRIA!</h2>
            <p className="mb-6 text-lg font-medium text-emerald-50">
              Incrível! Você completou a Roda da Preguiça inteira.
            </p>
            <button
              onClick={startNewGame}
              className="bg-white text-emerald-700 font-bold px-8 py-3 rounded-full hover:scale-105 transition shadow-lg"
            >
              Jogar Novamente
            </button>
          </div>
        )}

        {gameStatus === "lost" && (
          <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-xl p-8 text-center mt-12 shadow-2xl max-w-lg mx-auto">
            <h2 className="text-4xl font-black mb-3">FIM DE JOGO</h2>
            <p className="mb-6 text-lg font-medium text-red-50">
              Você ficou sem vidas! Mais sorte na próxima vez.
            </p>
            <button
              onClick={startNewGame}
              className="bg-white text-red-700 font-bold px-8 py-3 rounded-full hover:scale-105 transition shadow-lg"
            >
              Tentar Novamente
            </button>
          </div>
        )}

      </div>
    </div>
  );
}