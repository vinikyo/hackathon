import { useState } from "react";
import { loadGameState, saveGameState, resetGameState } from "../utils/storage";
import PetCard from "./PetCard";
import BattleQuiz from "./BattleQuiz";
import LevelUpModal from "./LevelUpModal";

export default function Dashboard() {
  const [gameState, setGameState] = useState(loadGameState());
  const [activeBattle, setActiveBattle] = useState(null);
  const [levelUpInfo, setLevelUpInfo] = useState(null);

  const handleBattleEnd = (subject, xpGained, victory) => {
    setActiveBattle(null);

    if (!victory) return;

    setGameState((prev) => {
      const pet = { ...prev.pets[subject] };
      let newXP = pet.currentXP + xpGained;
      let leveledUp = false;
      let evolved = false;

      while (newXP >= pet.xpToNextLevel) {
        newXP -= pet.xpToNextLevel;
        pet.level += 1;
        pet.xpToNextLevel = Math.round(pet.xpToNextLevel * 1.3);
        leveledUp = true;

        if (pet.level === 5 && pet.evolutionStage === "baby") {
          pet.evolutionStage = "evolved";
          evolved = true;
        }
      }
      pet.currentXP = newXP;

      const newState = {
        ...prev,
        pets: { ...prev.pets, [subject]: pet },
        student: {
          ...prev.student,
          accountXP: prev.student.accountXP + xpGained,
        },
        matchHistory: [
          ...prev.matchHistory,
          { subject, xpGained, date: new Date().toISOString() },
        ],
      };

      saveGameState(newState);

      setLevelUpInfo({
        petName: pet.name,
        xpGained,
        leveledUp,
        evolved,
        newLevel: pet.level,
      });

      return newState;
    });
  };

  const handleReset = () => {
    const fresh = resetGameState();
    setGameState(fresh);
  };

  const { student, pets } = gameState;

  if (activeBattle) {
    return (
      <BattleQuiz
        subject={activeBattle}
        petName={pets[activeBattle].name}
        petSprite={pets[activeBattle].sprite}
        onEnd={handleBattleEnd}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <header className="bg-white rounded-2xl shadow p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-indigo-200 flex items-center justify-center text-2xl">
            🧑
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-800">{student.name}</h2>
            <p className="text-sm text-slate-500">Treinador Nível {student.accountLevel}</p>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <p className="text-xs text-slate-400 mb-1">
            {student.accountXP} / {student.xpToNextAccountLevel} XP
          </p>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all"
              style={{
                width: `${Math.min(100, (student.accountXP / student.xpToNextAccountLevel) * 100)}%`,
              }}
            />
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-red-500 underline transition"
        >
          Resetar progresso
        </button>
      </header>

      <h3 className="text-xl font-bold text-slate-700 mb-4">Seus Studymons</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(pets).map(([key, pet]) => (
          <PetCard key={key} pet={pet} onBattle={() => setActiveBattle(key)} />
        ))}
      </div>

      {levelUpInfo && (
        <LevelUpModal info={levelUpInfo} onClose={() => setLevelUpInfo(null)} />
      )}
    </div>
  );
}
