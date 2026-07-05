import { redirect } from "next/navigation";
import {
  getGestorLogado,
  getDashboardResumo,
  getDashboardAlunos,
  getMateriasResumoGestor,
  getHistoricoPorMateriaGestor,
  getRanking,
  logoutGestor,
} from "@/app/actions";
import NovoAlunoForm from "@/components/NovoAlunoForm";

export default async function Dashboard() {
  const gestor = await getGestorLogado();
  if (!gestor) redirect("/login/gestor");

  const [dashboardResumo, dashboardAlunos, materias, historicoMaterias, rankingSala] = await Promise.all([
    getDashboardResumo(),
    getDashboardAlunos(),
    getMateriasResumoGestor(),
    getHistoricoPorMateriaGestor(),
    getRanking(),
  ]);

  const rankingTop = rankingSala.slice(0, 8);
  const alunosAtencao = dashboardAlunos.filter((a) => a.status === "Atenção");

  return (
    <div className="app-screen app-screen-dashboard">
      <div className="login-topo">
        <span className="logo-ph">LOGO</span>
        <span>StudyMons · Gestor</span>
      </div>

      <main className="dashboard-shell">
        <section className="dashboard-hero">
          <div>
            <span className="hero-kicker">Dashboard escolar</span>
            <h1>Gerencie alunos, salas, pontos e jogos liberados.</h1>
            <p>
              Este painel é o espaço da escola para acompanhar evolução, detectar alunos com baixo
              engajamento e publicar novas atividades por ano e matéria.
            </p>
            <p style={{ opacity: 0.8, marginTop: "0.5rem" }}>
              Logado como <strong>{gestor.nome}</strong> ({gestor.escola})
            </p>
            <form action={logoutGestor}>
              <button className="btn btn-claro" type="submit">Sair</button>
            </form>
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

        {alunosAtencao.length > 0 && (
          <section className="dashboard-panel dashboard-alerta">
            <div className="section-title-row compact">
              <h2>⚠ {alunosAtencao.length} aluno{alunosAtencao.length > 1 ? "s" : ""} precisa{alunosAtencao.length > 1 ? "m" : ""} de atenção</h2>
              <span>mais de 7 dias sem jogar</span>
            </div>
            <div className="table-list">
              {alunosAtencao.map((aluno) => (
                <div key={aluno.id} className="table-row">
                  <div>
                    <strong>{aluno.nome}</strong>
                    <span>{aluno.turma}</span>
                  </div>
                  <div className="table-row-end">
                    <span className="status-pill warn">{aluno.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <div className="section-title-row compact">
              <h2>Alunos da turma</h2>
              <span>Monitoramento rápido</span>
            </div>
            <NovoAlunoForm />
            <div className="table-list">
              {dashboardAlunos.length === 0 && (
                <p className="dashboard-empty">Nenhum aluno cadastrado ainda.</p>
              )}
              {dashboardAlunos.map((aluno) => (
                <div key={aluno.id} className="table-row">
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
                    <span>{materia.companheiro} · nível médio {materia.nivel}</span>
                  </div>
                  <span>{materia.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel dashboard-panel-wide">
            <div className="section-title-row compact">
              <h2>Histórico por matéria</h2>
              <span>% de acerto da turma</span>
            </div>
            <div className="stack-cards">
              {historicoMaterias.map((m) => (
                <div key={m.id} className="stat-block">
                  <div className="stat-label">
                    <span>{m.nome}</span>
                    <span>{m.totalRespostas > 0 ? `${m.acertosPct}%` : "sem dados"}</span>
                  </div>
                  <div className="stat-track">
                    <div
                      className="stat-fill"
                      style={{ width: `${m.acertosPct}%`, background: `var(--mat-${m.id}, var(--azul-escuro))` }}
                    />
                  </div>
                  <span className="stat-sub">{m.totalRespostas} questões respondidas</span>
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
              {rankingTop.map((aluno, indice) => (
                <div key={`${aluno.nome}-${indice}`} className="ranking-row">
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
