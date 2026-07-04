import Link from "next/link";
import AccountBar from "@/components/AccountBar";
import { contaAluno, materias } from "@/lib/mockData";

export default function Personagem() {
  return (
    <div className="app-screen">
      <AccountBar nome={contaAluno.nome} turma={contaAluno.turma} ano={contaAluno.ano} xpTotal={contaAluno.xpTotal} href="/hub" hrefLabel="Voltar para o hub">
        <Link className="btn btn-soft btn-small" href="/ranking">
          Ranking
        </Link>
      </AccountBar>

      <main className="inner-page">
        <div className="page-copy">
          <span className="hero-kicker">Meu personagem</span>
          <h1>Treinador e companheiros da conta.</h1>
          <p>
            A customização completa vem depois, mas a tela já organiza os pokémons por matéria e mostra
            o nível atual de cada um.
          </p>
        </div>

        <div className="companion-grid">
          {materias.map((materia) => (
            <article key={materia.id} className={`companion-card accent-${materia.cor}`}>
              <div className={`avatar avatar-large ${materia.cor}`}>{materia.companheiro[0]}</div>
              <div>
                <h2>{materia.companheiro}</h2>
                <p>{materia.nome} · nível {materia.nivel}</p>
                <span>{materia.xp} XP</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
