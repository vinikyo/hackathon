"use client";

import { useState, useEffect, useCallback } from "react";

const COUNTRIES_DB = [
  {
    name: "Brasil",
    flag: "🇧🇷",
    continent: "América do Sul",
    hemisphere: "Ambos",
    population: 213000000,
    area: 8515767,
    language: "Português",
  },
  {
    name: "Japão",
    flag: "🇯🇵",
    continent: "Ásia",
    hemisphere: "Norte",
    population: 125000000,
    area: 377975,
    language: "Japonês",
  },
  {
    name: "França",
    flag: "🇫🇷",
    continent: "Europa",
    hemisphere: "Norte",
    population: 67000000,
    area: 551695,
    language: "Francês",
  },
  {
    name: "EUA",
    flag: "🇺🇸",
    continent: "América do Norte",
    hemisphere: "Norte",
    population: 331000000,
    area: 9833517,
    language: "Inglês",
  },
  {
    name: "Austrália",
    flag: "🇦🇺",
    continent: "Oceania",
    hemisphere: "Sul",
    population: 25700000,
    area: 7692024,
    language: "Inglês",
  },
];

const MAX_LIVES = 8;

function formatNumber(num) {
  return num.toLocaleString("pt-BR");
}

function compareNumeric(guessValue, targetValue) {
  if (guessValue === targetValue) {
    return { color: "bg-green-500", arrow: null };
  }
  return {
    color: "bg-red-500",
    arrow: targetValue > guessValue ? "up" : "down",
  };
}

function compareCategorical(guessValue, targetValue, partialCheck) {
  if (guessValue === targetValue) return "bg-green-500";
  if (partialCheck && partialCheck(guessValue, targetValue)) return "bg-yellow-400";
  return "bg-red-500";
}

function buildFeedback(guessCountry, targetCountry) {
  return {
    name: guessCountry.name,
    flag: guessCountry.flag,
    continentColor: compareCategorical(guessCountry.continent, targetCountry.continent),
    hemisphereColor: compareCategorical(
      guessCountry.hemisphere,
      targetCountry.hemisphere,
      (g, t) => g === "Ambos" || t === "Ambos"
    ),
    population: {
      value: guessCountry.population,
      ...compareNumeric(guessCountry.population, targetCountry.population),
    },
    area: {
      value: guessCountry.area,
      ...compareNumeric(guessCountry.area, targetCountry.area),
    },
    languageColor: compareCategorical(guessCountry.language, targetCountry.language),
    continent: guessCountry.continent,
    hemisphere: guessCountry.hemisphere,
    language: guessCountry.language,
    isCorrect: guessCountry.name === targetCountry.name,
  };
}

function ArrowIcon({ direction }) {
  if (direction === "up") return <span className="ml-1">(maior)</span>;
  if (direction === "down") return <span className="ml-1">(menor)</span>;
  return null;
}

function FeedbackCell({ colorClass, children }) {
  return (
    <div
      className={`${colorClass} rounded-lg px-2 py-3 flex items-center justify-center text-center text-white font-semibold text-xs sm:text-sm min-h-[56px]`}
    >
      {children}
    </div>
  );
}

export default function Adivinacao({ onBack }) {
  const [target, setTarget] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameStatus, setGameStatus] = useState("playing");
  const [errorMsg, setErrorMsg] = useState("");

  const startNewGame = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * COUNTRIES_DB.length);
    setTarget(COUNTRIES_DB[randomIndex]);
    setInputValue("");
    setGuesses([]);
    setLives(MAX_LIVES);
    setGameStatus("playing");
    setErrorMsg("");
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleGuess = () => {
    if (gameStatus !== "playing") return;

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const guessCountry = COUNTRIES_DB.find(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (!guessCountry) {
      setErrorMsg("País não encontrado na base. Tente: Brasil, Japão, França, EUA ou Austrália.");
      return;
    }

    setErrorMsg("");

    const feedback = buildFeedback(guessCountry, target);
    setGuesses((prev) => [feedback, ...prev]);
    setInputValue("");

    if (feedback.isCorrect) {
      setGameStatus("won");
      return;
    }

    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setGameStatus("lost");
      }
      return newLives;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGuess();
  };

  if (!target) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white text-sm underline transition"
          >
            Voltar ao Hub
          </button>
          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
            ADIVINAÇÃO
          </h1>
          <div className="flex gap-1 text-xl">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span key={i}>{i < lives ? "" : ""}</span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-6 text-xs sm:text-sm">
          <p className="font-bold text-slate-300 mb-2">Como jogar:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-400">
            <p><span className="inline-block w-3 h-3 bg-red-500 rounded-sm mr-2" />Vermelho: nenhuma pista combina</p>
            <p><span className="inline-block w-3 h-3 bg-yellow-400 rounded-sm mr-2" />Amarelo: combinação parcial</p>
            <p><span className="inline-block w-3 h-3 bg-green-500 rounded-sm mr-2" />Verde: combinação exata</p>
            <p>(maior) Alvo é maior &nbsp; (menor) Alvo é menor</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={gameStatus !== "playing"}
            placeholder="Digite um país para começar..."
            list="countries-list"
            className="flex-1 bg-slate-900 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition disabled:opacity-50"
          />
          <datalist id="countries-list">
            {COUNTRIES_DB.map((c) => (
              <option key={c.name} value={c.name} />
            ))}
          </datalist>
          <button
            onClick={handleGuess}
            disabled={gameStatus !== "playing"}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-lg transition transform hover:scale-105 whitespace-nowrap"
          >
            ADIVINHAR!
          </button>
        </div>

        {errorMsg && (
          <p className="text-red-400 text-sm mb-4">{errorMsg}</p>
        )}

        {gameStatus === "won" && (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-center mb-6 shadow-2xl">
            <h2 className="text-2xl font-black mb-1">VOCÊ ACERTOU!</h2>
            <p className="mb-4">
              O país era {target.flag} <strong>{target.name}</strong>
            </p>
            <button
              onClick={startNewGame}
              className="bg-white text-emerald-700 font-bold px-6 py-2 rounded-full hover:scale-105 transition"
            >
              Jogar Novamente
            </button>
          </div>
        )}

        {gameStatus === "lost" && (
          <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-xl p-6 text-center mb-6 shadow-2xl">
            <h2 className="text-2xl font-black mb-1">FIM DE JOGO</h2>
            <p className="mb-4">
              O país era {target.flag} <strong>{target.name}</strong>
            </p>
            <button
              onClick={startNewGame}
              className="bg-white text-red-700 font-bold px-6 py-2 rounded-full hover:scale-105 transition"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {guesses.length > 0 && (
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-6 gap-2 mb-2 text-xs sm:text-sm font-bold text-slate-400 px-1">
                <span>Bandeira/Nome</span>
                <span>Continente</span>
                <span>Hemisfério</span>
                <span>População</span>
                <span>Área (km²)</span>
                <span>Idioma</span>
              </div>

              {guesses.map((g, idx) => (
                <div key={idx} className="grid grid-cols-6 gap-2 mb-2">
                  <FeedbackCell colorClass="bg-slate-800">
                    <span className="flex items-center gap-1">
                      <span className="text-lg">{g.flag}</span> {g.name}
                    </span>
                  </FeedbackCell>
                  <FeedbackCell colorClass={g.continentColor}>{g.continent}</FeedbackCell>
                  <FeedbackCell colorClass={g.hemisphereColor}>{g.hemisphere}</FeedbackCell>
                  <FeedbackCell colorClass={g.population.color}>
                    {formatNumber(g.population.value)}
                    <ArrowIcon direction={g.population.arrow} />
                  </FeedbackCell>
                  <FeedbackCell colorClass={g.area.color}>
                    {formatNumber(g.area.value)}
                    <ArrowIcon direction={g.area.arrow} />
                  </FeedbackCell>
                  <FeedbackCell colorClass={g.languageColor}>{g.language}</FeedbackCell>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}