import AccountBar from "@/components/AccountBar";
import { contaAluno, dashboardAlunos, dashboardResumo, materias, rankingSala } from "@/lib/mockData";

export default function Dashboard() {
  return (
    <div className="app-screen app-screen-dashboard">
      <AccountBar
        nome="Professor / Gestor"
        turma="Painel da escola"
        ano="Administração"
        xpTotal={contaAluno.xpTotal}
        voltarHref="/hub"
        voltarLabel="Ir para o hub"
        mostrarRanking={false}
        mostrarMenuAvatar={false}
      />

      <main className="dashboard-shell">
        <section className="dashboard-hero">
          <div>
            <span className="hero-kicker">Dashboard escolar</span>
            <h1>Gerencie alunos, salas, pontos e jogos liberados.</h1>
            <p>
              Este painel é o espaço da escola para acompanhar evolução, detectar alunos com baixo
              engajamento e publicar novas atividades por ano e matéria.
            </p>
          </div>
        </section>

        <section className="stats-grid">
          {dashboardResumo.map((item) => (
            <article key={item.label} className="stat-card">
              <span>{item.label}</span>
              <strong>{item.valor}</strong>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <div className="section-title-row compact">
              <h2>Alunos da turma</h2>
              <span>Monitoramento rápido</span>
            </div>
            <div className="table-list">
              {dashboardAlunos.map((aluno) => (
                <div key={aluno.nome} className="table-row">
                  <div>
                    <strong>{aluno.nome}</strong>
                    <span>{aluno.turma} · {aluno.ano}</span>
                  </div>
                  <div className="table-row-end">
                    <span className={`status-pill ${aluno.status === "Ativo" ? "ok" : "warn"}`}>{aluno.status}</span>
                    <strong>{aluno.xpTotal} XP</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="section-title-row compact">
              <h2>Jogos por matéria</h2>
              <span>BNCC + ano</span>
            </div>
            <div className="stack-cards">
              {materias.map((materia) => (
                <div key={materia.id} className={`mini-course accent-${materia.cor}`}>
                  <div>
                    <strong>{materia.nome}</strong>
                    <span>{materia.companheiro} · nível {materia.nivel}</span>
                  </div>
                  <span>{materia.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel dashboard-panel-wide">
            <div className="section-title-row compact">
              <h2>Ranking da sala</h2>
              <span>referência Elefante Letrado</span>
            </div>
            <div className="ranking-board">
              {rankingSala.map((aluno, indice) => (
                <div key={`${aluno.nome}-${indice}`} className={`ranking-row ${aluno.souEu ? "eu" : ""}`}>
                  <span className="ranking-pos">{indice + 1}</span>
                  <div>
                    <strong>{aluno.nome}</strong>
                    <span>{aluno.turma}</span>
                  </div>
                  <strong>{aluno.xpTotal} XP</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}