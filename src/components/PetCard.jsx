export default function PetCard({ pet, onBattle }) {
  const progress = Math.min(100, (pet.currentXP / pet.xpToNextLevel) * 100);

  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col items-center text-center hover:shadow-lg transition">
      <div className="text-6xl mb-2">{pet.sprite}</div>
      <h4 className="font-bold text-slate-800">{pet.name}</h4>
      <p className="text-xs text-slate-400 mb-2">{pet.subject}</p>
      <p className="text-sm font-semibold text-indigo-600 mb-1">Nível {pet.level}</p>

      <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
        <div
          className="bg-green-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={onBattle}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition transform hover:scale-105"
      >
        ⚔️ Batalha de Ginásio
      </button>
    </div>
  );
}
