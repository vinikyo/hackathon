"use client";

import { useState } from "react";

// Perguntas sugeridas que o "assistente" sabe responder.
const SUGESTOES = [
  "Como está o desempenho geral da turma?",
  "Qual matéria precisa de mais atenção?",
  "Onde os alunos vão melhor?",
];

export default function AnaliseCliente({ materias, resumo }) {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState(null);
  const [pensando, setPensando] = useState(false);

  const comDados = materias.filter((m) => m.totalRespostas > 0);
  const maxPct = Math.max(...materias.map((m) => m.acertosPct), 1);

  function analisar(texto) {
    const q = (texto || pergunta).trim();
    if (!q) return;
    setPensando(true);
    setResposta(null);

    // simula "pensar" e monta a resposta a partir dos dados reais
    setTimeout(() => {
      const ordenadas = [...comDados].sort((a, b) => a.acertosPct - b.acertosPct);
      const pior = ordenadas[0];
      const melhor = ordenadas[ordenadas.length - 1];

      let texto = "";
      if (comDados.length === 0) {
        texto = "Ainda não há partidas suficientes registradas para uma análise confiável. " +
          "Assim que os alunos jogarem mais algumas rodadas, consigo apontar tendências por matéria.";
      } else if (/aten|dificuldade|pior|baix/i.test(q)) {
        texto = `A matéria que mais precisa de atenção é ${pior.nome}, com ${pior.acertosPct}% de acerto ` +
          `em ${pior.totalRespostas} questões respondidas. Vale reforçar esse conteúdo com atividades extras.`;
      } else if (/melhor|forte|vão bem|destac/i.test(q)) {
        texto = `A turma vai melhor em ${melhor.nome}, com ${melhor.acertosPct}% de acerto. ` +
          `É um bom conteúdo para propor desafios mais avançados.`;
      } else {
        const alunos = resumo.find((r) => r.label.includes("Alunos"))?.valor ?? "—";
        texto = `No geral, a turma tem ${alunos} alunos ativos. O melhor desempenho está em ${melhor.nome} ` +
          `(${melhor.acertosPct}%) e o ponto de atenção é ${pior.nome} (${pior.acertosPct}%). ` +
          `Veja abaixo a taxa de acerto por matéria.`;
      }

      setResposta(texto);
      setPensando(false);
    }, 700);
  }

  return (
    <main className="dashboard-shell">
      <h1 className="dash-titulo">Análise</h1>
      <p className="dash-subtitulo">Querido(a) gestor(a),</p>

      <div className="dash-analise-card">
        <p className="dash-analise-intro">
          Sou o assistente do StudyMons. Posso analisar o desempenho da turma com base nos dados
          reais da plataforma. Pergunte algo ou escolha uma sugestão:
        </p>

        <div className="dash-sugestoes">
          {SUGESTOES.map((s) => (
            <button key={s} className="dash-sugestao" onClick={() => { setPergunta(s); analisar(s); }}>
              {s}
            </button>
          ))}
        </div>

        <form
          className="dash-chat-form"
          onSubmit={(e) => { e.preventDefault(); analisar(); }}
        >
          <input
            placeholder="Pergunte sobre a turma..."
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            aria-label="Pergunta ao assistente"
          />
          <button className="btn btn-escuro" type="submit" disabled={pensando}>
            {pensando ? "Analisando..." : "Perguntar"}
          </button>
        </form>

        {resposta && (
          <div className="dash-resposta">
            <p>{resposta}</p>

            {comDados.length > 0 && (
              <div className="dash-grafico">
                {materias.map((m) => (
                  <div key={m.id} className="dash-barra-col">
                    <div
                      className="dash-barra"
                      style={{ height: `${Math.round((m.acertosPct / maxPct) * 100)}%`,
                               background: `var(--mat-${m.id}, var(--azul-medio))` }}
                      title={`${m.acertosPct}%`}
                    />
                    <span className="dash-barra-valor">{m.acertosPct}%</span>
                    <span className="dash-barra-label">{m.nome}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <p className="dash-analise-aviso">
          Assistente em demonstração. As respostas são geradas a partir dos dados reais de acerto por matéria.
        </p>
      </div>
    </main>
  );
}
