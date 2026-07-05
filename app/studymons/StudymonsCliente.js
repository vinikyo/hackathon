"use client";

import { useState } from "react";
import StudyHeader from "@/components/StudyHeader";

// cor de acento por matéria (mesmos tokens da tela de jogos)
const CORES = {
  portugues: "var(--mat-portugues)",
  matematica: "var(--mat-matematica)",
  ciencias: "var(--mat-ciencias)",
  ingles: "var(--mat-ingles)",
  erer: "var(--mat-erer)",
};

export default function StudymonsCliente({ aluno, materias }) {
  const [i, setI] = useState(0);
  const m = materias[i];
  const cor = CORES[m.id] || "var(--verde)";
  const progressoPct = Math.min(100, Math.round((m.xp / m.xpProximoNivel) * 100));

  return (
    <div>
      <StudyHeader aluno={aluno} />
      <div className="tela">
        <div className="tela-centro">
          <div className="studymon-wrap">
            <div className="studymon-livro-bloco">
              <button className="seta" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} aria-label="Anterior">‹</button>
              <div className="studymon-livro">
                {m.spriteLivro ? (
                  <img src={m.spriteLivro} alt={m.companheiro} />
                ) : (
                  <span className="sprite-ph" style={{ width: "80%", height: "60%" }}>
                    {m.companheiro}<br />no livro (PNG)
                  </span>
                )}
              </div>
              <button className="seta" onClick={() => setI((v) => Math.min(materias.length - 1, v + 1))} disabled={i === materias.length - 1} aria-label="Próximo">›</button>
            </div>

            <div className="studymon-info">
              <h2>{m.companheiro}</h2>
              <p className="subtitulo">{m.nome} · nível {m.nivel} · {m.estagioEvolucao === "evolved" ? "evoluído" : "inicial"}</p>
              <p className="desc">{m.descricao}</p>

              <div className="stat">
                <div className="stat-label"><span>Progresso na matéria</span><span>{progressoPct}%</span></div>
                <div className="stat-track"><div className="stat-fill" style={{ width: `${progressoPct}%`, background: cor }} /></div>
              </div>
              <div className="stat">
                <div className="stat-label"><span>Questões realizadas</span><span>{m.questoesRealizadas ?? 0}</span></div>
                <div className="stat-track"><div className="stat-fill" style={{ width: `${m.questoesPct}%`, background: cor }} /></div>
              </div>
              <div className="stat">
                <div className="stat-label"><span>Acertos totais</span><span>{m.acertosPct}%</span></div>
                <div className="stat-track"><div className="stat-fill" style={{ width: `${m.acertosPct}%`, background: cor }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
