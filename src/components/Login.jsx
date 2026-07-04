import { useState } from "react";

export default function Login({ onLogin }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().length > 0) onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-1">Studymon</h1>
        <p className="text-gray-500 mb-6">Digite sua Carteirinha</p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ABC-1234"
          className="w-full text-center text-xl font-mono tracking-widest border-2 border-indigo-200 rounded-lg py-3 mb-4 focus:outline-none focus:border-indigo-500 transition"
          maxLength={8}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
