"use client";

import { useState } from "react";

// Cada texto tem lacunas ({...}) preenchidas por escolha múltipla.
// Conteúdo alinhado à Educação para as Relações Étnico-Raciais (ERER):
// história e cultura afro-brasileira e indígena (Leis 10.639 e 11.645).
const TEXTOS = [
  {
    titulo: "Cultura afro-brasileira",
    partes: [
      "A ",
      { resposta: "capoeira", opcoes: ["capoeira", "valsa", "polca"] },
      " é uma manifestação cultural que mistura luta, dança e música, criada por pessoas ",
      { resposta: "africanas escravizadas", opcoes: ["africanas escravizadas", "europeias nobres", "asiáticas"] },
      " no Brasil.",
    ],
  },
  {
    titulo: "Povos originários",
    partes: [
      "Os povos ",
      { resposta: "indígenas", opcoes: ["indígenas", "vikings", "romanos"] },
      " já viviam no território brasileiro muito antes da chegada dos ",
      { resposta: "portugueses", opcoes: ["portugueses", "japoneses", "australianos"] },
      " em 1500.",
    ],
  },
  {
    titulo: "Resistência e liberdade",
    partes: [
      "O Quilombo dos Palmares foi um importante local de ",
      { resposta: "resistência", opcoes: ["resistência", "descanso", "comércio"] },
      ", liderado por ",
      { resposta: "Zumbi", opcoes: ["Zumbi", "Pedro Álvares", "Dom Pedro"] },
      ", símbolo da luta contra a escravidão.",
    ],
  },
  {
    titulo: "Datas que importam",
    partes: [
      "O dia 20 de novembro é a Consciência ",
      { resposta: "Negra", opcoes: ["Negra", "Tranquila", "Coletiva"] },
      ", data que celebra a cultura e a história do povo ",
      { resposta: "afro-brasileiro", opcoes: ["afro-brasileiro", "europeu", "norte-americano"] },
      ".",
    ],
  },
];

export default function FillBlanks({ onBack }) {
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState({}); // "parteIndex" -> escolha
  const [conferido, setConferido] = useState(false);
  const [acertosTotais, setAcertosTotais] = useState(0);
  const [fim, setFim] = useState(false);

  const texto = TEXTOS[indice];
  const lacunas = texto.partes
    .map((p, i) => (typeof p === "object" ? i : null))
    .filter((i) => i !== null);

  const todasRespondidas = lacunas.every((i) => respostas[i]);

  function escolher(parteIndex, valor) {
    if (conferido) return;
    setRespostas((prev) => ({ ...prev, [parteIndex]: valor }));
  }

  function conferir() {
    const acertos = lacunas.filter((i) => respostas[i] === texto.partes[i].resposta).length;
    setAcertosTotais((prev) => prev + acertos);
    setConferido(true);
  }

  function proximo() {
    if (indice + 1 >= TEXTOS.length) {
      setFim(true);
      return;
    }
    setIndice((i) => i + 1);
    setRespostas({});
    setConferido(false);
  }

  const totalLacunas = TEXTOS.reduce(
    (soma, t) => soma + t.partes.filter((p) => typeof p === "object").length,
    0
  );

  if (fim) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow p-8 text-center max-w-sm border border-sky-100">
          <div className="text-5xl mb-3"></div>
          <h2 className="text-2xl font-extrabold text-sky-800 mb-1">Atividade concluída!</h2>
          <p className="text-slate-600 mb-4">
            Você acertou <strong className="text-emerald-600">{acertosTotais}</strong> de {totalLacunas} lacunas.
          </p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold px-6 py-2 rounded-full hover:scale-105 transition"
          >
            Voltar ao hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl font-bold text-sm bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 transition"
          >
            Voltar ao hub
          </button>
          <h1 className="text-xl font-extrabold text-sky-800">Preencha as Lacunas — ERER</h1>
          <span className="text-sm font-bold text-emerald-600">
            {indice + 1} / {TEXTOS.length}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border border-sky-100">
          <h2 className="font-bold text-sky-800 mb-4">{texto.titulo}</h2>

          <p className="text-lg leading-relaxed text-slate-800">
            {texto.partes.map((parte, i) => {
              if (typeof parte === "string") return <span key={i}>{parte}</span>;

              const escolha = respostas[i];
              const certo = conferido && escolha === parte.resposta;
              const errado = conferido && escolha && escolha !== parte.resposta;

              return (
                <select
                  key={i}
                  value={escolha || ""}
                  onChange={(e) => escolher(i, e.target.value)}
                  disabled={conferido}
                  className={`mx-1 my-1 px-2 py-1 rounded-lg border-2 font-semibold outline-none ${
                    certo
                      ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                      : errado
                      ? "border-rose-300 bg-rose-50 text-rose-600"
                      : "border-sky-300 bg-sky-50 text-sky-800"
                  }`}
                >
                  <option value="" disabled>
                    escolha…
                  </option>
                  {parte.opcoes.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              );
            })}
          </p>

          {conferido && (
            <div className="mt-5 text-sm bg-sky-50 rounded-xl p-3 text-slate-600">
              As respostas corretas ficam em <span className="text-emerald-600 font-bold">verde</span>.
              Leia o texto completo mais uma vez pra fixar o conteúdo.
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {!conferido ? (
              <button
                onClick={conferir}
                disabled={!todasRespondidas}
                className="bg-sky-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-6 py-2 rounded-full hover:bg-sky-700 transition"
              >
                Conferir
              </button>
            ) : (
              <button
                onClick={proximo}
                className="bg-emerald-500 text-white font-bold px-6 py-2 rounded-full hover:bg-emerald-600 transition"
              >
                {indice + 1 >= TEXTOS.length ? "Finalizar" : "Próximo texto"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
