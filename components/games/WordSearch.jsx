"use client";

import { useMemo, useState } from "react";

// Palavras a esconder no grid (inglês + tradução didática pro aluno).
const WORDS = [
  { en: "CAT", pt: "gato" },
  { en: "DOG", pt: "cachorro" },
  { en: "SUN", pt: "sol" },
  { en: "BOOK", pt: "livro" },
  { en: "TREE", pt: "árvore" },
  { en: "BLUE", pt: "azul" },
  { en: "FISH", pt: "peixe" },
  { en: "STAR", pt: "estrela" },
];

const SIZE = 12;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Gera o tabuleiro uma vez: coloca cada palavra em uma direção aleatória
// (horizontal, vertical ou diagonal) e preenche o resto com letras aleatórias.
function buildBoard() {
  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal
  ];

  const placed = [];

  for (const word of WORDS) {
    let ok = false;
    for (let tent = 0; tent < 100 && !ok; tent++) {
      const [dr, dc] = directions[Math.floor(Math.random() * directions.length)];
      const maxR = dr === 0 ? SIZE : SIZE - word.en.length;
      const maxC = dc === 0 ? SIZE : SIZE - word.en.length;
      const r0 = Math.floor(Math.random() * maxR);
      const c0 = Math.floor(Math.random() * maxC);

      // Checa se cabe sem conflito
      let cabe = true;
      const celulas = [];
      for (let i = 0; i < word.en.length; i++) {
        const r = r0 + dr * i;
        const c = c0 + dc * i;
        const atual = grid[r][c];
        if (atual && atual !== word.en[i]) {
          cabe = false;
          break;
        }
        celulas.push([r, c]);
      }

      if (cabe) {
        celulas.forEach(([r, c], i) => {
          grid[r][c] = word.en[i];
        });
        placed.push({ ...word, celulas: celulas.map(([r, c]) => `${r}-${c}`) });
        ok = true;
      }
    }
  }

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!grid[r][c]) grid[r][c] = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    }
  }

  return { grid, placed };
}

export default function WordSearch({ onBack }) {
  const { grid, placed } = useMemo(buildBoard, []);
  const [inicio, setInicio] = useState(null); // "r-c" da primeira letra clicada
  const [achadas, setAchadas] = useState([]); // lista de palavras .en encontradas
  const [celulasAchadas, setCelulasAchadas] = useState([]); // "r-c" marcadas
  const [erro, setErro] = useState(false);

  const venceu = achadas.length === placed.length;

  // Retorna a sequência de células entre início e fim se for uma linha reta
  // válida (mesma linha, mesma coluna, ou diagonal), senão null.
  function caminho(r0, c0, r1, c1) {
    const dr = Math.sign(r1 - r0);
    const dc = Math.sign(c1 - c0);
    const distR = Math.abs(r1 - r0);
    const distC = Math.abs(c1 - c0);
    const reta = r0 === r1 || c0 === c1 || distR === distC;
    if (!reta) return null;

    const passos = Math.max(distR, distC);
    const cels = [];
    for (let i = 0; i <= passos; i++) {
      cels.push(`${r0 + dr * i}-${c0 + dc * i}`);
    }
    return cels;
  }

  function clicarCelula(r, c) {
    const chave = `${r}-${c}`;

    if (!inicio) {
      setInicio(chave);
      setErro(false);
      return;
    }

    const [r0, c0] = inicio.split("-").map(Number);
    const cels = caminho(r0, c0, r, c);
    setInicio(null);

    if (!cels) {
      setErro(true);
      return;
    }

    // A palavra pode ter sido selecionada em qualquer sentido
    const chaveNormal = cels.join(",");
    const chaveInvertida = [...cels].reverse().join(",");

    const encontrada = placed.find((p) => {
      const alvo = p.celulas.join(",");
      return alvo === chaveNormal || alvo === chaveInvertida;
    });

    if (encontrada && !achadas.includes(encontrada.en)) {
      setAchadas((prev) => [...prev, encontrada.en]);
      setCelulasAchadas((prev) => [...prev, ...encontrada.celulas]);
      setErro(false);
    } else {
      setErro(true);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl font-bold text-sm bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 transition"
          >
            Voltar ao hub
          </button>
          <h1 className="text-2xl font-extrabold text-sky-800">Word Search</h1>
          <span className="text-sm font-bold text-emerald-600">
            {achadas.length} / {placed.length}
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-6">
          {/* Tabuleiro */}
          <div className="bg-white rounded-2xl shadow p-3 border border-sky-100 overflow-x-auto">
            <div
              className="grid gap-1 mx-auto"
              style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`, width: "min(100%, 480px)" }}
            >
              {grid.map((linha, r) =>
                linha.map((letra, c) => {
                  const chave = `${r}-${c}`;
                  const marcada = celulasAchadas.includes(chave);
                  const selecionadaInicio = inicio === chave;
                  return (
                    <button
                      key={chave}
                      onClick={() => clicarCelula(r, c)}
                      className={`aspect-square text-xs sm:text-sm font-bold rounded transition ${
                        marcada
                          ? "bg-emerald-400 text-white"
                          : selecionadaInicio
                          ? "bg-sky-400 text-white"
                          : "bg-sky-50 text-sky-800 hover:bg-sky-100"
                      }`}
                    >
                      {letra}
                    </button>
                  );
                })
              )}
            </div>
            {erro && (
              <p className="text-center text-sm text-sky-500 mt-3">
                Essa seleção não é uma palavra. Clique na primeira e na última letra de uma palavra da lista.
              </p>
            )}
          </div>

          {/* Lista de palavras */}
          <div className="bg-white rounded-2xl shadow p-4 border border-sky-100 md:w-56">
            <h2 className="font-bold text-sky-800 mb-3">Find these words</h2>
            <ul className="space-y-2">
              {WORDS.map((w) => {
                const ok = achadas.includes(w.en);
                return (
                  <li
                    key={w.en}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                      ok ? "bg-emerald-50" : "bg-sky-50"
                    }`}
                  >
                    <span className={`font-bold ${ok ? "line-through text-emerald-600" : "text-sky-800"}`}>
                      {w.en}
                    </span>
                    <span className="text-xs text-slate-500">{w.pt}</span>
                  </li>
                );
              })}
            </ul>
            <p className="text-xs text-slate-400 mt-3">
              Dica: clique na primeira letra, depois na última. Vale na horizontal, vertical e diagonal.
            </p>
          </div>
        </div>

        {venceu && (
          <div className="mt-6 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-2xl p-6 text-center shadow">
            <div className="text-4xl mb-2"></div>
            <h2 className="text-2xl font-extrabold mb-1">Great job!</h2>
            <p className="mb-4 text-white/90">You found all the words.</p>
            <button
              onClick={onBack}
              className="bg-white text-sky-700 font-bold px-6 py-2 rounded-full hover:scale-105 transition"
            >
              Voltar ao hub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
