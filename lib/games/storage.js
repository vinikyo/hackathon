// Portado da branch main (Vite) pro Next.js.
// Diferenças em relação ao original:
// 1. Guardas de "typeof window" — no Next, esse código também roda no
//    servidor durante a renderização inicial, onde localStorage não existe.
// 2. Pets alinhados ao universo do site (Guará/Polvo/Tartaruga, mesmas
//    matérias do mockData: portugues, matematica, ciencias).
// 3. applyBattleResult: a lógica de XP/level-up/evolução que vivia no
//    Dashboard da main agora mora aqui, pra página de quiz ficar enxuta.

const STORAGE_KEY = "studymon_save";

const INITIAL_STATE = {
  student: {
    name: "Você",
    code: "7841-2241",
    accountLevel: 3,
    accountXP: 850,
    xpToNextAccountLevel: 1000,
  },
  pets: {
    portugues: {
      name: "Guará",
      sprite: "🦩",
      subject: "Português",
      level: 1,
      currentXP: 0,
      xpToNextLevel: 500,
      evolutionStage: "baby",
    },
    matematica: {
      name: "Polvo",
      sprite: "🐙",
      subject: "Matemática",
      level: 1,
      currentXP: 0,
      xpToNextLevel: 500,
      evolutionStage: "baby",
    },
    ciencias: {
      name: "Tartaruga",
      sprite: "🐢",
      subject: "Ciências",
      level: 1,
      currentXP: 0,
      xpToNextLevel: 500,
      evolutionStage: "baby",
    },
  },
  matchHistory: [],
};

export function loadGameState() {
  if (typeof window === "undefined") return INITIAL_STATE;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE));
    return INITIAL_STATE;
  }
  try {
    const parsed = JSON.parse(raw);
    // Se o save antigo (da main) não tiver os pets novos, recomeça.
    if (!parsed?.pets?.portugues) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE));
      return INITIAL_STATE;
    }
    return parsed;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE));
    return INITIAL_STATE;
  }
}

export function saveGameState(state) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetGameState() {
  if (typeof window === "undefined") return INITIAL_STATE;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE));
  return INITIAL_STATE;
}

// Aplica o resultado de uma batalha vencida: XP no pet + XP na conta,
// level-up em cascata e evolução no nível 5. Retorna o novo estado e o
// resumo pro LevelUpModal.
export function applyBattleResult(state, subject, xpGained) {
  const pet = { ...state.pets[subject] };
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
    ...state,
    pets: { ...state.pets, [subject]: pet },
    student: {
      ...state.student,
      accountXP: state.student.accountXP + xpGained,
    },
    matchHistory: [
      ...state.matchHistory,
      { subject, xpGained, date: new Date().toISOString() },
    ],
  };

  saveGameState(newState);

  return {
    newState,
    levelUpInfo: {
      petName: pet.name,
      xpGained,
      leveledUp,
      evolved,
      newLevel: pet.level,
    },
  };
}
