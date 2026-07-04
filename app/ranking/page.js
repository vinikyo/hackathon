import AccountBar from "@/components/AccountBar";
import { contaAluno, rankingSala } from "@/lib/mockData";

export default function Ranking() {
  const ordenado = [...rankingSala].sort((a, b) => b.xpTotal - a.xpTotal);

  return (
    <div className="app-screen">
      <AccountBar
        nome={contaAluno.nome}
        turma={contaAluno.turma}
        ano={contaAluno.ano}
        xpTotal={contaAluno.xpTotal}
        voltarHref="/hub"
        voltarLabel="Voltar ao hub"
        mostrarRanking={false}
      />

      <main className="inner-page narrow">
        <div className="page-copy">
          <span className="hero-kicker">Competição saudável</span>
          <h1>Ranking geral da escola.</h1>
          <p>
            A ideia é incentivar a disputa entre alunos e salas, mantendo XP visível em todas as telas.
          </p>
        </div>

        <div className="ranking-board large">
          {ordenado.map((aluno, indice) => (
            <div key={aluno.nome} className={`ranking-row ${aluno.souEu ? "eu" : ""}`}>
              <span className="ranking-pos">{indice + 1}</span>
              <div>
                <strong>{aluno.nome}</strong>
                <span>{aluno.turma}</span>
              </div>
              <strong>{aluno.xpTotal} XP</strong>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
