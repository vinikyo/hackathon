"use client";

import { useState } from "react";
import StudyHeader from "@/components/StudyHeader";
import { QUIZ_BANK } from "@/lib/games/quizData";
import { salvarBatalha, registrarResposta } from "@/app/actions";

const HP_MAX = 3;

export default function CombateCliente({ aluno, materias }) {
  const [i, setI] = useState(0);           // monstro selecionado
  const [fase, setFase] = useState("selecao"); // selecao | batalha | fim
  const [hpEu, setHpEu] = useState(HP_MAX);
  const [hpInimigo, setHpInimigo] = useState(HP_MAX);
  const [qIndex, setQIndex] = useState(0);
  const [escolha, setEscolha] = useState(null);
  const [resultado, setResultado] = useState(null); // retorno de salvarBatalha

  const m = materias[i];
  const nivelOk = m.nivel >= m.nivelMinimoCombate;
  const banco = QUIZ_BANK[m.id];

  function iniciar() {
    if (!nivelOk || !banco) return;
    setResultado(null);
    setFase("batalha");
    setHpEu(HP_MAX); setHpInimigo(HP_MAX); setQIndex(0); setEscolha(null);
  }

  function responder(idx) {
    if (escolha !== null) return;
    setEscolha(idx);
    const certo = idx === banco.questions[qIndex].correct;
    registrarResposta(m.id, certo); // grava cada resposta no histórico
    const nHpInim = certo ? hpInimigo - 1 : hpInimigo;
    const nHpEu = certo ? hpEu : hpEu - 1;
    setHpInimigo(nHpInim); setHpEu(nHpEu);

    setTimeout(async () => {
      if (nHpInim <= 0 || nHpEu <= 0) {
        if (nHpInim <= 0) {
          const res = await salvarBatalha(m.id, 100); // salva XP e evolução
          setResultado(res);
        }
        setFase("fim");
        return;
      }
      setQIndex((q) => (q + 1) % banco.questions.length);
      setEscolha(null);
    }, 900);
  }

  return (
    <div>
      <StudyHeader aluno={aluno} />
      <div className="tela">
        <div className="tela-centro">

          {fase === "selecao" && (
            <>
              <div className="combate-cena">
                {/* Cenário pixelart -> <img className="cenario" src="/studymons/cenario.png" /> */}
                <span className="sprite-ph" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}>
                  cenário pixelart (PNG de fundo)
                </span>
                <div className="combate-lados">
                  <div className="combatente">
                    {/* sprite do monstro do aluno */}
                    <span className={`sprite-ph ${nivelOk ? "" : "sprite-cinza"}`}>{m.companheiro}</span>
                    <div className="selecao-setas">
                      <button className="seta" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0}>‹</button>
                      <button className="seta" onClick={() => setI((v) => Math.min(materias.length - 1, v + 1))} disabled={i === materias.length - 1}>›</button>
                    </div>
                  </div>
                  <div className="combatente">
                    <span className="sprite-ph">monstro inimigo</span>
                  </div>
                </div>
              </div>

              {!banco ? (
                <div className="combate-aviso">
                  O quiz de {m.nome} ({m.companheiro}) ainda está em preparação.
                </div>
              ) : nivelOk ? (
                <div className="combate-msg">
                  Selecione o Studymon que desafiará o monstro
                  <div style={{ marginTop: "1rem" }}>
                    <button className="btn btn-escuro" onClick={iniciar}>Iniciar batalha com {m.companheiro}</button>
                  </div>
                </div>
              ) : (
                <div className="combate-aviso">
                  {m.companheiro} está no nível {m.nivel}. Nível mínimo para esta batalha: {m.nivelMinimoCombate}.
                </div>
              )}
            </>
          )}

          {fase === "batalha" && banco && (
            <>
              <div className="combate-cena">
                <span className="sprite-ph" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}>cenário pixelart</span>
                <div className="combate-lados">
                  <div className="combatente"><span className="sprite-ph">{m.companheiro}</span></div>
                  <div className="combatente"><span className="sprite-ph">{banco.enemyName}</span></div>
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <div className="quiz-hp">
                  <span className="rot">{m.companheiro}</span>
                  <div className="quiz-hp-track"><div className="quiz-hp-fill eu" style={{ width: `${(hpEu / HP_MAX) * 100}%` }} /></div>
                </div>
                <div className="quiz-hp">
                  <span className="rot">Inimigo</span>
                  <div className="quiz-hp-track"><div className="quiz-hp-fill inimigo" style={{ width: `${(hpInimigo / HP_MAX) * 100}%` }} /></div>
                </div>
              </div>

              <div className="quiz-pergunta">
                <h3>{banco.questions[qIndex].text}</h3>
                <div className="quiz-opcoes">
                  {banco.questions[qIndex].options.map((op, idx) => {
                    let cls = "quiz-op";
                    if (escolha !== null && idx === escolha) {
                      cls += idx === banco.questions[qIndex].correct ? " certa" : " errada";
                    }
                    return (
                      <button key={idx} className={cls} onClick={() => responder(idx)}>{op}</button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {fase === "fim" && (
            <div className="combate-msg">
              {hpInimigo <= 0 ? (
                <>
                  <div>Vitória! {m.companheiro} ganhou 100 de XP.</div>
                  {resultado?.subiuNivel && (
                    <div style={{ marginTop: "0.5rem" }}>Subiu para o nível {resultado.nivel}!</div>
                  )}
                  {resultado?.evoluiu && (
                    <div style={{ marginTop: "0.5rem", color: "var(--azul-escuro)" }}>
                      {m.companheiro} evoluiu!
                    </div>
                  )}
                </>
              ) : (
                "O monstro venceu dessa vez. Tente de novo!"
              )}
              <div style={{ marginTop: "1rem" }}>
                <button className="btn btn-escuro" onClick={() => setFase("selecao")}>Voltar à seleção</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
