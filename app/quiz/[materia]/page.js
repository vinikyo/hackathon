"use client";

import { useState } from "react";
import Link from "next/link";
import AccountBar from "@/components/AccountBar";
import { contaAluno } from "@/lib/mockData";
import { perguntaQuizExemplo } from "@/lib/mockData";

const HP_MAX = 3;

export default function Quiz({ params }) {
  const [hpJogador, setHpJogador] = useState(HP_MAX);
  const [hpChefe, setHpChefe] = useState(HP_MAX);
  const [selecionada, setSelecionada] = useState(null);
  const [respondida, setRespondida] = useState(false);

  const pergunta = perguntaQuizExemplo; // no futuro: buscar pergunta pela matéria de params.materia

  function responder(indice) {
    if (respondida) return;
    setSelecionada(indice);
    setRespondida(true);

    if (indice === pergunta.respostaCorreta) {
      setHpChefe((hp) => Math.max(0, hp - 1));
    } else {
      setHpJogador((hp) => Math.max(0, hp - 1));
    }
  }

  function proxima() {
    // Protótipo: só reseta a mesma pergunta pra mostrar o ciclo.
    // No jogo real, aqui entraria a próxima pergunta do banco.
    setSelecionada(null);
    setRespondida(false);
  }

  const acabou = hpJogador === 0 || hpChefe === 0;

  return (
    <div className="app-screen">
      <AccountBar
        nome={contaAluno.nome}
        turma={contaAluno.turma}
        ano={contaAluno.ano}
        xpTotal={contaAluno.xpTotal}
        voltarHref="/hub"
        voltarLabel="Voltar ao hub"
      />

      <main className="inner-page narrow">
        <div className="page-copy">
          <span className="hero-kicker">Batalha de ginásio</span>
          <h1>Quiz-ginásio: {params.materia}</h1>
          <p>Acertou, o chefe perde HP. Errou, seu personagem leva dano e a evolução desacelera.</p>
        </div>

        <div className="quiz-board">
          <div className="hp-bar">
            <span className="rotulo">Você</span>
            <div className="hp-track">
              <div className="hp-fill jogador" style={{ width: `${(hpJogador / HP_MAX) * 100}%` }} />
            </div>
          </div>
          <div className="hp-bar">
            <span className="rotulo">Chefe</span>
            <div className="hp-track">
              <div className="hp-fill chefe" style={{ width: `${(hpChefe / HP_MAX) * 100}%` }} />
            </div>
          </div>

          {acabou ? (
            <div style={{ marginTop: "1.5rem" }}>
              <h3 className="display">{hpChefe === 0 ? "Você venceu!" : "O chefe venceu essa"}</h3>
              <p style={{ color: "var(--ink-soft)" }}>
                {hpChefe === 0
                  ? "Seu companheiro ganhou XP e subiu de nível."
                  : "Sem problema — pode tentar de novo."}
              </p>
              <Link className="btn btn-primary" href="/hub">Voltar pra trilha</Link>
            </div>
          ) : (
            <>
              <p className="question-copy">{pergunta.pergunta}</p>
              {pergunta.opcoes.map((opcao, indice) => {
                let classe = "opcao";
                if (respondida && indice === selecionada) {
                  classe += indice === pergunta.respostaCorreta ? " certa" : " errada";
                }
                return (
                  <button key={opcao} className={classe} onClick={() => responder(indice)}>
                    {opcao}
                  </button>
                );
              })}

              {respondida && (
                <button className="btn btn-soft" style={{ marginTop: "0.5rem" }} onClick={proxima}>
                  Próxima pergunta
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
