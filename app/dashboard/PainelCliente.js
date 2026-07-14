"use client";

import { useState } from "react";
import { getResumoPainel } from "@/app/actions";

const PERIODOS = [
  { id: "hoje", label: "Hoje" },
  { id: "7dias", label: "Últimos 7 dias" },
  { id: "30dias", label: "Últimos 30 dias" },
];

export default function PainelCliente({ gestor, resumoInicial, jogos }) {
  const [periodo, setPeriodo] = useState("hoje");
  const [resumo, setResumo] = useState(resumoInicial);
  const [carregando, setCarregando] = useState(false);

  async function trocarPeriodo(p) {
    setPeriodo(p);
    setCarregando(true);
    try { setResumo(await getResumoPainel(p)); }
    finally { setCarregando(false); }
  }

  return (
    <main className="dashboard-shell">
      <div className="dash-topo">
        <h1 className="dash-titulo">Novidades</h1>
        <select
          className="dash-select"
          value={periodo}
          onChange={(e) => trocarPeriodo(e.target.value)}
        >
          {PERIODOS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
      </div>

      <section className="dash-cards-topo">
        <div className="dash-stat-escuro">
          <span>Jogos jogados</span>
          <strong>{carregando ? "…" : resumo.jogosJogados}</strong>
        </div>
        <div className="dash-stat-escuro">
          <span>Pontos de experiência</span>
          <strong>{carregando ? "…" : resumo.xpGanho}</strong>
        </div>
      </section>

      <section className="dash-jogos-bloco">
        <div className="dash-jogos-grid">
          {jogos.map((j) => (
            <div key={j.id} className="dash-jogo-card" title="Dados do jogo — em breve">
              <div className="dash-jogo-img">
                {j.imagem
                  ? <img src={j.imagem} alt={j.titulo} />
                  : <span className="img-ph">Imagem jogo</span>}
              </div>
              <span className="dash-jogo-nome">{j.titulo}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
