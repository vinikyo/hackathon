const STORAGE_KEY = "studymon_save";

const INITIAL_STATE = {
  student: {
    name: "Joãozinho",
    code: "ABC-1234",
    accountLevel: 3,
    accountXP: 850,
    xpToNextAccountLevel: 1000,
  },
  pets: {
    matematica: {
      name: "Coelhito",
      sprite: "🐰",
      subject: "Matemática",
      level: 1,
      currentXP: 0,
      xpToNextLevel: 500,
      evolutionStage: "baby",
    },
    historia: {
      name: "Corujinha",
      sprite: "🦉",
      subject: "História",
      level: 1,
      currentXP: 0,
      xpToNextLevel: 500,
      evolutionStage: "baby",
    },
    ciencias: {
      name: "Camaleão",
      sprite: "🦎",
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
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE));
    return INITIAL_STATE;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE));
    return INITIAL_STATE;
  }
}

export function saveGameState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetGameState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE));
  return INITIAL_STATE;
}
