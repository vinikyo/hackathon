import Link from "next/link";
import AccountBar from "@/components/AccountBar";
import { contaAluno, jogos } from "@/lib/mockData";

export default function PaginaDoJogo({ params }) {
  const jogo = jogos.find((item) => item.id === params.id);

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
        {!jogo ? (
          <div className="page-copy">
            <h1>Jogo não encontrado.</h1>
            <Link className="btn btn-primary" href="/hub">Voltar ao hub</Link>
          </div>
        ) : (
          <>
            <div className={`game-cover cover-${jogo.cor}`} style={{ height: 220 }}>
              <span className="cover-icon">{jogo.capa}</span>
              <span className="cover-track">{jogo.trilha}</span>
              <span className="cover-title">{jogo.titulo}</span>
            </div>

            <div className="page-copy" style={{ marginTop: "1.2rem" }}>
              <div className="game-card-top">
                <span className="game-badge">{jogo.materia}</span>
                <span className="game-badge soft">{jogo.ano}</span>
                <span className="bncc-tag">BNCC {jogo.bncc}</span>
              </div>
              <h1>{jogo.titulo}</h1>
              <p>{jogo.descricao}</p>
            </div>

            {/*
              Protótipo: aqui entra o iframe do jogo (GameMaker HTML5).
              Quando o jogo terminar, ele redireciona pra uma URL de
              retorno com o resultado (ex: /jogos/{id}/concluido?pontos=80),
              e essa rota é que credita o XP de verdade — sem precisar o
              GameMaker saber quem é o aluno logado.
            */}
            <div
              style={{
                marginTop: "1.5rem",
                borderRadius: 20,
                background: "rgba(255,255,255,0.7)",
                border: "2px dashed rgba(16,33,58,0.2)",
                padding: "3rem 1.5rem",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, color: "var(--ink-soft)" }}>
                Área do jogo (entra o embed do GameMaker aqui)
              </p>
              <Link className="btn btn-primary" href="/hub" style={{ marginTop: "1rem" }}>
                Concluir jogo (protótipo)
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
