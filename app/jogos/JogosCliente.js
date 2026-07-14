"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import StudyHeader from "@/components/StudyHeader";
import { jogos } from "@/lib/mockData";

const categorias = [...new Set(jogos.map((j) => j.materia))];

// cor de acento por matéria (usa os tokens --mat-*)
const CORES = {
  "Português": "var(--mat-portugues)",
  "Matemática": "var(--mat-matematica)",
  "Ciências": "var(--mat-ciencias)",
  "Inglês": "var(--mat-ingles)",
  "ERER": "var(--mat-erer)",
  "Geografia": "var(--mat-geografia)",
  "Arte": "var(--mat-arte)",
};
const cor = (nome) => CORES[nome] || "var(--azul-medio)";

function CardJogo({ jogo, grande, jogavel }) {
  const classe = grande ? "jogo-grande" : "jogo-card";
  const conteudo = jogo.imagem ? (
    <img src={jogo.imagem} alt={jogo.titulo} />
  ) : (
    <span className="img-ph">Imagem jogo<br />{jogo.titulo}</span>
  );
  if (jogavel) {
    return <Link href={`/jogos/${jogo.id}`} className={classe}>{conteudo}</Link>;
  }
  return <div className={`${classe} travado`}>{conteudo}</div>;
}

export default function JogosCliente({ aluno }) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const t = busca.trim().toLowerCase();
    if (!t) return jogos;
    return jogos.filter(
      (j) =>
        j.titulo.toLowerCase().includes(t) ||
        j.bncc.toLowerCase().includes(t) ||
        j.materia.toLowerCase().includes(t)
    );
  }, [busca]);

  const destaques = filtrados.filter((j) => j.destaque).slice(0, 2);
  const porCategoria = categorias
    .map((nome) => ({ nome, itens: filtrados.filter((j) => j.materia === nome) }))
    .filter((c) => c.itens.length > 0);

  return (
    <div>
      <StudyHeader busca={busca} setBusca={setBusca} aluno={aluno} />
      <div className="tela">
        <div className="tela-centro">
          {/* Banner de boas-vindas — preenche o topo e dá contexto */}
          <div className="jogos-hero">
            <div>
              <h1>Olá, {aluno?.nome || "aluno"}! Bora jogar e aprender?</h1>
              <p>Escolha um joguinho por matéria. Cada vitória faz seu Studymon evoluir!</p>
            </div>
            <span className="hero-emoji" aria-hidden></span>
          </div>

          {destaques.length > 0 && (
            <div className="jogos-destaque">
              {destaques.map((j) => (
                <CardJogo key={j.id} jogo={j} grande jogavel />
              ))}
            </div>
          )}

          {porCategoria.map((cat) => (
            <section key={cat.nome}>
              <div className="materia-cab">
                <span className="bolinha" style={{ background: cor(cat.nome) }}>
                  {cat.nome[0]}
                </span>
                <h2>{cat.nome}</h2>
                <span className="linha-cor" style={{ background: cor(cat.nome) }} />
              </div>
              <div className="jogos-linha">
                {cat.itens.map((j, idx) => (
                  <CardJogo key={j.id} jogo={j} jogavel={idx === 0} />
                ))}
              </div>
            </section>
          ))}

          {filtrados.length === 0 && <p>Nenhum jogo encontrado.</p>}
        </div>
      </div>
    </div>
  );
}
