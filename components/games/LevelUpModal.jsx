"use client";

export default function LevelUpModal({ info, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-300 to-orange-400 rounded-2xl p-8 text-center w-full max-w-sm shadow-2xl animate-bounce-once">
        <h2 className="text-3xl font-extrabold text-white drop-shadow mb-2">
          {info.evolved ? "EVOLUIU!" : info.leveledUp ? "LEVEL UP!" : "Vitória!"}
        </h2>
        <p className="text-white font-semibold text-lg mb-1">
          {info.petName} {info.evolved ? "evoluiu e" : ""} chegou ao nível {info.newLevel}!
        </p>
        <p className="text-white/90 mb-6">+{info.xpGained} XP ganho</p>
        <button
          onClick={onClose}
          className="bg-white text-orange-600 font-bold px-6 py-2 rounded-full hover:scale-105 transition"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
