"use client";

import { useState } from "react";
import { QUIZ_BANK } from "@/lib/games/quizData";

const DAMAGE_PER_CORRECT = 100;
const PLAYER_DAMAGE_ON_WRONG = 20;

export default function BattleQuiz({ subject, petName, petSprite, onEnd }) {
  const battleData = QUIZ_BANK[subject];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [enemyHP, setEnemyHP] = useState(300);
  const [playerHP, setPlayerHP] = useState(100);
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | null
  const [selectedOption, setSelectedOption] = useState(null);
  const [battleOver, setBattleOver] = useState(null); // "victory" | "defeat" | null

  const enemyMaxHP = 300;
  const currentQuestion = battleData.questions[questionIndex];

  const handleAnswer = (optionIndex) => {
    if (feedback) return;

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correct;

    if (isCorrect) {
      setFeedback("correct");
      const newEnemyHP = Math.max(0, enemyHP - DAMAGE_PER_CORRECT);
      setEnemyHP(newEnemyHP);

      setTimeout(() => {
        if (newEnemyHP <= 0) {
          setBattleOver("victory");
        } else {
          advanceQuestion();
        }
      }, 1000);
    } else {
      setFeedback("wrong");
      const newPlayerHP = Math.max(0, playerHP - PLAYER_DAMAGE_ON_WRONG);
      setPlayerHP(newPlayerHP);

      setTimeout(() => {
        if (newPlayerHP <= 0) {
          setBattleOver("defeat");
        } else {
          advanceQuestion();
        }
      }, 1000);
    }
  };

  const advanceQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= battleData.questions.length) {
      setBattleOver("victory");
      return;
    }
    setQuestionIndex(nextIndex);
    setFeedback(null);
    setSelectedOption(null);
  };

  const handleFinish = () => {
    const totalXP = battleOver === "victory" ? 500 : 0;
    onEnd(subject, totalXP, battleOver === "victory");
  };

  if (battleOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div
          className={`rounded-2xl p-8 text-center w-full max-w-sm shadow-2xl ${
            battleOver === "victory"
              ? "bg-gradient-to-br from-amber-300 to-orange-400"
              : "bg-gradient-to-br from-slate-500 to-slate-700"
          }`}
        >
          <div className="text-6xl mb-4">{battleOver === "victory" ? "" : ""}</div>
          <h2 className="text-3xl font-extrabold text-white drop-shadow mb-2">
            {battleOver === "victory" ? "VITÓRIA!" : "Tente Novamente"}
          </h2>
          <p className="text-white/90 mb-6">
            {battleOver === "victory"
              ? `${petName} derrotou ${battleData.enemyName}!`
              : `${petName} foi derrotado por ${battleData.enemyName}.`}
          </p>
          <button
            onClick={handleFinish}
            className="bg-white text-slate-700 font-bold px-6 py-3 rounded-full hover:scale-105 transition"
          >
            Voltar ao Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-400 p-4 md:p-8 flex flex-col">
      <div className="flex items-center justify-between max-w-3xl mx-auto w-full mb-8">
        <div className="text-center">
          <div
            className={`text-7xl mb-2 transition-transform ${
              feedback === "correct" ? "scale-125 -translate-x-2" : ""
            }`}
          >
            {petSprite}
          </div>
          <p className="font-bold text-slate-800">{petName}</p>
          <HealthBar value={playerHP} max={100} color="bg-green-500" />
        </div>

        <div className="text-3xl font-extrabold text-slate-700">VS</div>

        <div className="text-center">
          <div
            className={`text-7xl mb-2 transition-transform ${
              feedback === "wrong" ? "scale-90" : ""
            } ${feedback === "correct" ? "translate-x-2 opacity-70" : ""}`}
          >
            {battleData.enemySprite}
          </div>
          <p className="font-bold text-slate-800">{battleData.enemyName}</p>
          <HealthBar value={enemyHP} max={enemyMaxHP} color="bg-red-500" />
        </div>
      </div>

      {feedback && (
        <div
          className={`text-center font-bold text-xl mb-4 ${
            feedback === "correct" ? "text-green-700" : "text-red-700"
          }`}
        >
          {feedback === "correct" ? "ACERTOU! Ataque certeiro!" : "ERROU! Seu pet tomou dano!"}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto w-full">
        <p className="text-xs text-slate-400 mb-1">
          Pergunta {questionIndex + 1} de {battleData.questions.length}
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-6">{currentQuestion.text}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestion.options.map((option, i) => {
            const isSelected = selectedOption === i;
            const isCorrectOption = i === currentQuestion.correct;

            let styles = "bg-slate-100 hover:bg-indigo-100 text-slate-800";
            if (feedback && isSelected && feedback === "correct") {
              styles = "bg-green-500 text-white";
            } else if (feedback && isSelected && feedback === "wrong") {
              styles = "bg-red-500 text-white";
            } else if (feedback && isCorrectOption) {
              styles = "bg-green-200 text-green-800";
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={!!feedback}
                className={`${styles} font-semibold py-3 px-4 rounded-lg transition disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HealthBar({ value, max, color }) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="w-32 bg-slate-200 rounded-full h-3 mt-1">
      <div
        className={`${color} h-3 rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
