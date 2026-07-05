"use client";

import { useState, useEffect } from "react";

const QUESTION_TIME_LIMIT = 15; // segundos por pergunta
const MAX_LIVES = 3;

const SCIENCE_QUESTIONS = [
  {
    question: "Qual é o planeta mais próximo do Sol?",
    options: ["Vênus", "Mercúrio", "Marte"],
    correct: 1,
  },
  {
    question: "Qual é o gás essencial para a respiração humana?",
    options: ["Nitrogênio", "Oxigênio", "Hélio"],
    correct: 1,
  },
  {
    question: "Qual órgão é responsável por bombear o sangue pelo corpo?",
    options: ["Pulmão", "Coração", "Fígado"],
    correct: 1,
  },
  {
    question: "Qual é o estado físico da água em temperatura ambiente?",
    options: ["Sólido", "Líquido", "Gasoso"],
    correct: 1,
  },
  {
    question: "Quantos sentidos básicos o ser humano possui?",
    options: ["3", "5", "7"],
    correct: 1,
  },
  {
    question: "Qual é a principal fonte de energia da fotossíntese?",
    options: ["Água", "Luz solar", "Solo"],
    correct: 1,
  },
  {
    question: "Qual é o menor osso do corpo humano?",
    options: ["Fêmur", "Estribo", "Costela"],
    correct: 1,
  },
  {
    question: "Qual gás os animais liberam ao respirar?",
    options: ["Oxigênio", "Gás carbônico", "Hidrogênio"],
    correct: 1,
  },
];

function LilyPadTrail({ total, current, reachedShore }) {
  return (
    <div className="bg-gradient-to-r from-blue-950 to-teal-950 rounded-xl p-3 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto">
        {Array.from({ length: total }).map((_, i) => {
          const isDone = i < current || reachedShore;
          const isCurrent = i === current && !reachedShore;

          return (
            <div
              key={i}
              className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-lg transition-colors ${
                isDone ? "bg-emerald-600" : isCurrent ? "bg-emerald-400" : "bg-slate-700"
              }`}
            >
              {isCurrent ? "🐸" : isDone ? "" : ""}
            </div>
          );
        })}
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-lg transition-colors ${
            reachedShore ? "bg-emerald-400" : "bg-slate-700"
          }`}
        >
         
        </div>
      </div>
    </div>
  );
}

export default function Ciensapo({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | "timeout" | null
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameStatus, setGameStatus] = useState("playing"); // "playing" | "won" | "lost"

  const currentQuestion = SCIENCE_QUESTIONS[currentIndex];

  const startNewGame = () => {
    setCurrentIndex(0);
    setLives(MAX_LIVES);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setFeedback(null);
    setSelectedOption(null);
    setGameStatus("playing");
  };

  const advanceQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= SCIENCE_QUESTIONS.length) {
      setGameStatus("won");
      return;
    }
    setCurrentIndex(nextIndex);
    setFeedback(null);
    setSelectedOption(null);
  };

  // Cronômetro por pergunta: reinicia sempre que muda de pergunta ou o
  // feedback é limpo. Fica pausado enquanto um feedback está sendo exibido.
  useEffect(() => {
    if (gameStatus !== "playing" || feedback) return undefined;

    setTimeLeft(QUESTION_TIME_LIMIT);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setFeedback("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, feedback, gameStatus]);

  // Resolve o feedback (correto/errado/tempo esgotado): desconta vida se
  // necessário e avança para a próxima pergunta após uma pequena pausa.
  // Propositalmente só depende de `feedback` — `lives` é lido do closure
  // para evitar descontar a vida duas vezes quando o próprio setLives
  // dispara um novo render.
  useEffect(() => {
    if (!feedback) return undefined;

    const isBad = feedback === "wrong" || feedback === "timeout";
    const livesAfter = isBad ? lives - 1 : lives;

    if (isBad) setLives(livesAfter);

    const timeout = setTimeout(() => {
      if (isBad && livesAfter <= 0) {
        setGameStatus("lost");
      } else {
        advanceQuestion();
      }
    }, 1200);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback]);

  const handleAnswer = (optionIndex) => {
    if (feedback || gameStatus !== "playing") return;
    setSelectedOption(optionIndex);
    setFeedback(optionIndex === currentQuestion.correct ? "correct" : "wrong");
  };

  const timerPercentage = (timeLeft / QUESTION_TIME_LIMIT) * 100;
  const timerColor =
    timeLeft <= 5 ? "bg-red-500" : timeLeft <= 10 ? "bg-yellow-400" : "bg-emerald-500";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white text-sm underline transition"
          >
            Voltar ao Hub
          </button>
          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">
            CIENSAPO
          </h1>
          <div className="flex gap-1 text-xl">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span key={i}>{i < lives ? "" : ""}</span>
            ))}
          </div>
        </div>

        {/* Regras */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-6 text-xs sm:text-sm text-slate-400">
          <p className="font-bold text-slate-300 mb-1">Como jogar:</p>
          <p>
            Responda certo para o sapo saltar para a próxima vitória-régia. Errar ou
            estourar o tempo custa uma vida. Chegue até a margem para vencer! 🐸
          </p>
        </div>

        {/* Trilha de progresso */}
        <LilyPadTrail
          total={SCIENCE_QUESTIONS.length}
          current={currentIndex}
          reachedShore={gameStatus === "won"}
        />

        {/* Fim de jogo */}
        {gameStatus === "won" && (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-center mb-6 shadow-2xl">
            <h2 className="text-2xl font-black mb-1">CHEGOU À MARGEM!</h2>
            <p className="mb-4">O sapo atravessou o rio respondendo tudo certinho!</p>
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
            <h2 className="text-2xl font-black mb-1">O SAPO CAIU NO RIO!</h2>
            <p className="mb-4">Suas vidas acabaram antes de chegar à margem.</p>
            <button
              onClick={startNewGame}
              className="bg-white text-red-700 font-bold px-6 py-2 rounded-full hover:scale-105 transition"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Pergunta ativa */}
        {gameStatus === "playing" && (
          <div className="bg-slate-900 rounded-2xl shadow-xl p-6">
            <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
              <div
                className={`${timerColor} h-2 rounded-full transition-all duration-1000 ease-linear`}
                style={{ width: `${timerPercentage}%` }}
              />
            </div>

            <p className="text-xs text-slate-500 mb-1">
              Pergunta {currentIndex + 1} de {SCIENCE_QUESTIONS.length}
            </p>
            <h3 className="text-xl font-bold text-slate-100 mb-6">
              {currentQuestion.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentQuestion.options.map((option, i) => {
                const isSelected = selectedOption === i;
                const isCorrectOption = i === currentQuestion.correct;

                let styles = "bg-slate-800 hover:bg-teal-900 text-slate-100 border-slate-700";
                if (feedback && isSelected && feedback === "correct") {
                  styles = "bg-emerald-500 text-white border-emerald-400";
                } else if (feedback && isSelected && (feedback === "wrong" || feedback === "timeout")) {
                  styles = "bg-red-500 text-white border-red-400";
                } else if (feedback && isCorrectOption) {
                  styles = "bg-emerald-800 text-emerald-200 border-emerald-600";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={!!feedback}
                    className={`${styles} font-semibold py-6 px-4 rounded-full transition disabled:cursor-not-allowed border-2`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {feedback && (
              <p
                className={`text-center font-bold mt-4 ${
                  feedback === "correct" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {feedback === "correct"
                  ? "🐸 Salto perfeito!"
                  : feedback === "timeout"
                  ? "⏰ Tempo esgotado! O sapo caiu na água."
                  : "Resposta errada! O sapo caiu na água."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
