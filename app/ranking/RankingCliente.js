"use client";

import { useState } from "react";
import StudyHeader from "@/components/StudyHeader";
import { getRankingPorMateria, getRanking } from "@/app/actions";

// Abas: Geral + matérias que têm ranking no banco (as com criatura).
// nome exibido -> id da matéria no banco
const MATERIAS_RANKING = [
  { nome: "Matemática", id: "matematica", cor: "var(--mat-matematica)" },
  { nome: "Português", id: "portugues", cor: "var(--mat-portugues)" },
  { nome: "Ciências", id: "ciencias", cor: "var(--mat-ciencias)" },
  { nome: "Inglês", id: "ingles", cor: "var(--mat-ingles)" },
  { nome: "ERER", id: "erer", cor: "var(--mat-erer)" },
  { nome: "Arte", id: "arte", cor: "var(--mat-arte)" },
  { nome: "Geografia", id: "geografia", cor: "var(--mat-geografia)" },
  { nome: "História", id: "historia", cor: "var(--mat-historia)" },
];

export default function RankingCliente({ ranking: rankingInicial, meuId, aluno }) {
  const [aba, setAba] = useState("Geral");
  const [ranking, setRanking] = useState(rankingInicial);
  const [carregando, setCarregando] = useState(false);

  const corAtual =
    aba === "Geral"
      ? "var(--azul-medio)"
      : MATERIAS_RANKING.find((m) => m.nome === aba)?.cor || "var(--azul-medio)";

  async function trocarAba(nome) {
    if (nome === aba) return;
    setAba(nome);
    setCarregando(true);
    try {
      if (nome === "Geral") {
        setRanking(await getRanking());
      } else {
        const materia = MATERIAS_RANKING.find((m) => m.nome === nome);
        setRanking(await getRankingPorMateria(materia.id));
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <StudyHeader aluno={aluno} />
      <div className="tela">
        <div className="tela-centro">
          <div className="ranking-abas">
            <button
              className={`ranking-aba ${aba === "Geral" ? "ativa" : ""}`}
              onClick={() => trocarAba("Geral")}
              style={aba === "Geral" ? { background: "var(--azul-medio)", borderColor: "var(--azul-medio)", color: "#fff" } : {}}
            >
              Geral
            </button>
            {MATERIAS_RANKING.map((m) => (
              <button
                key={m.id}
                className={`ranking-aba ${aba === m.nome ? "ativa" : ""}`}
                onClick={() => trocarAba(m.nome)}
                style={aba === m.nome ? { background: m.cor, borderColor: m.cor, color: "#fff" } : {}}
              >
                {m.nome}
              </button>
            ))}
          </div>

          <div className="ranking-caixa" style={{ "--cor-materia": corAtual }}>
            <h2>Ranking da sala{aba !== "Geral" ? ` · ${aba}` : ""}</h2>
            <div className="ranking-lista">
              {carregando ? (
                <div className="ranking-item"><span className="ranking-nome">Carregando…</span></div>
              ) : ranking.length === 0 ? (
                <div className="ranking-item"><span className="ranking-nome">Sem dados nesta matéria ainda.</span></div>
              ) : (
                ranking.map((a) => (
                  <div key={a.id} className={`ranking-item ${a.id === meuId ? "eu" : ""}`}>
                    <span className="ranking-foto">{a.nome[0]}</span>
                    <span className="ranking-nome">{a.nome}</span>
                    <span className="ranking-xp">{a.xpTotal} XP</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
