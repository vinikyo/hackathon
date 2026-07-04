"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AccountBar from "@/components/AccountBar";
import { contaAluno, jogos, materias, rankingSala } from "@/lib/mockData";

const filtros = ["todos", "Português", "Matemática", "Ciências"];
const faixas = ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"];

export default function Hub() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todos");

  const xpTotal = materias.reduce((soma, materia) => soma + materia.xp, 0);

  const jogosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return jogos.filter((jogo) => {
      const bateFiltro = filtro === "todos" || jogo.materia === filtro;
      const bateBusca =
        !termo ||
        jogo.titulo.toLowerCase().includes(termo) ||
        jogo.bncc.toLowerCase().includes(termo) ||
        jogo.materia.toLowerCase().includes(termo);

      return bateFiltro && bateBusca;
    });
  }, [busca, filtro]);

  const destaques = jogosFiltrados.filter((jogo) => jogo.destaque).slice(0, 3);

  const jogosPorMateria = materias.map((materia) => ({
    ...materia,
    jogos: jogosFiltrados.filter((jogo) => jogo.materiaId === materia.id),
  }));

  return (
    <div className="app-screen app-screen-hub">
      <AccountBar
        nome={contaAluno.nome}
        turma={contaAluno.turma}
        ano={contaAluno.ano}
        xpTotal={xpTotal}
        search={
          <>
            <label className="sr-only" htmlFor="busca-jogo">Buscar por título ou BNCC</label>
            <input
              id="busca-jogo"
              className="header-search-input"
              placeholder="Buscar jogo, tema ou BNCC"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </>
        }
      />

      <div className="hub-layout">
        <main className="hub-main">
          <section className="hub-banner">
            <div className="hero-card hero-card-catalog">
              <div>
                <span className="hero-kicker">Catálogo escolar da BNCC</span>
                <h1>Uma vitrine viva de jogos, organizada por matéria e ano.</h1>
                <div className="sticker-row">
                  <span className="sticker">✨ Jogos novos</span>
                  <span className="sticker">🎯 BNCC</span>
                  <span className="sticker">🏆 XP visível</span>
                </div>
              </div>
            </div>
          </section>

          <div className="filter-row" aria-label="Filtros de matéria">
            {filtros.map((item) => (
              <button
                key={item}
                type="button"
                className={`pill-filter ${filtro === item ? "ativo" : ""}`}
                onClick={() => setFiltro(item)}
              >
                {item === "todos" ? "Todos os jogos" : item}
              </button>
            ))}
          </div>

          <section className="section-block">
            <div className="hub-section-label">
              <strong>Por ano escolar</strong>
            
            </div>
            <div className="year-strip">
              {faixas.map((faixa) => (
                <button key={faixa} type="button" className="year-pill">
                  {faixa}
                </button>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="hub-section-label">
              <h2>Destaques da semana</h2>
            </div>
            <div className="games-carousel">
              {destaques.map((jogo) => (
                <article key={jogo.id} className={`game-card accent-${jogo.cor}`}>
                  <div className={`game-cover cover-${jogo.cor}`}>
                    <span className="cover-icon">{jogo.capa}</span>
                    <span className="cover-track">{jogo.trilha}</span>
                    <span className="cover-title">{jogo.titulo}</span>
                  </div>
                  <div className="game-card-top">
                    <span className="game-badge">{jogo.materia}</span>
                    <span className="game-badge soft">{jogo.ano}</span>
                  </div>
                  <h3>{jogo.titulo}</h3>
                  <p>{jogo.descricao}</p>
                  <div className="game-card-footer">
                    <span className="bncc-tag">BNCC {jogo.bncc}</span>
                    <Link className="btn btn-primary btn-small" href={`/jogos/${jogo.id}`}>
                      Jogar
                    </Link>
                  </div>
                </article>
              ))}
              {destaques.length === 0 && <p>Nenhum destaque encontrado com esse filtro.</p>}
            </div>
          </section>

          {jogosPorMateria.map((materia) => (
            materia.jogos.length === 0 ? null : (
              <section key={materia.id} className="section-block carousel-row">
                <div className="hub-section-label">
                  <div className="carousel-header">
                    <span className={`collection-icon small ${materia.cor}`}>{materia.companheiro[0]}</span>
                    <div>
                      <strong>{materia.nome}</strong>
                      <div className="subtitle">{materia.companheiro} · nível {materia.nivel}</div>
                    </div>
                  </div>
                  <span>{materia.jogos.length} jogos</span>
                </div>
                <div className="games-carousel">
                  {materia.jogos.map((jogo) => (
                    <article key={jogo.id} className={`game-card accent-${jogo.cor}`}>
                      <div className={`game-cover cover-${jogo.cor}`}>
                        <span className="cover-icon">{jogo.capa}</span>
                        <span className="cover-track">{jogo.trilha}</span>
                        <span className="cover-title">{jogo.titulo}</span>
                      </div>
                      <div className="game-card-top">
                        <span className="game-badge">{jogo.ano}</span>
                      </div>
                      <h3>{jogo.titulo}</h3>
                      <p>{jogo.descricao}</p>
                      <div className="game-card-footer">
                        <span className="bncc-tag">BNCC {jogo.bncc}</span>
                        <Link className="btn btn-primary btn-small" href={`/jogos/${jogo.id}`}>
                          Jogar
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          ))}

          {jogosFiltrados.length === 0 && (
            <p style={{ marginTop: "1.5rem" }}>
              Nenhum jogo encontrado pra esse termo ou filtro. Tenta buscar por outro título ou código BNCC.
            </p>
          )}
        </main>

        <aside className="hub-aside">
          <section className="ranking-card">
            <div className="section-title-row compact">
              <h2>Ranking da sala</h2>
              <span>ao vivo</span>
            </div>
            <div className="ranking-mini-list">
              {rankingSala.map((aluno, indice) => (
                <div key={`${aluno.nome}-${indice}`} className={`ranking-mini-row ${aluno.souEu ? "eu" : ""}`}>
                  <span className="ranking-mini-pos">{indice + 1}</span>
                  <div className="ranking-mini-info">
                    <strong>{aluno.nome}</strong>
                    <span>{aluno.turma}</span>
                  </div>
                  <span className="ranking-mini-xp">{aluno.xpTotal} XP</span>
                </div>
              ))}
            </div>
          </section>

          <section className="ranking-card accent-note">
            <div className="section-title-row compact">
              <h2>Seu progresso</h2>
            </div>
            <div className="progress-stack">
              {materias.map((materia) => {
                const progresso = Math.min(100, Math.round((materia.xp / materia.xpProximoNivel) * 100));

                return (
                  <div key={materia.id} className="progress-item">
                    <div className="progress-item-top">
                      <strong>{materia.nome}</strong>
                      <span>{materia.nivel}</span>
                    </div>
                    <div className="barra-xp barra-xp-small">
                      <div className={`barra-xp-fill ${materia.cor}`} style={{ width: `${progresso}%` }} />
                    </div>
                    <small>{materia.xp} / {materia.xpProximoNivel} XP</small>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
