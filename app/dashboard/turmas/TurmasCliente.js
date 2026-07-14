"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRelatorioTurma, criarAluno } from "@/app/actions";

const PERIODOS = [
  { id: "hoje", label: "Hoje" },
  { id: "7dias", label: "Últimos 7 dias" },
  { id: "30dias", label: "Últimos 30 dias" },
  { id: "ano", label: "Último ano" },
];

export default function TurmasCliente({ turmas, turmaInicial, relatorioInicial }) {
  const [turma, setTurma] = useState(turmaInicial);
  const [periodo, setPeriodo] = useState("30dias");
  const [rel, setRel] = useState(relatorioInicial);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  // form de novo aluno
  const [nome, setNome] = useState("");
  const [msg, setMsg] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function recarregar(novaTurma, novoPeriodo) {
    setCarregando(true);
    try { setRel(await getRelatorioTurma(novaTurma, novoPeriodo)); }
    finally { setCarregando(false); }
  }

  function trocarTurma(t) { setTurma(t); recarregar(t, periodo); }
  function trocarPeriodo(p) { setPeriodo(p); recarregar(turma, p); }

  async function adicionarAluno(e) {
    e.preventDefault();
    if (!nome.trim()) return;
    setEnviando(true); setMsg(null);
    const fd = new FormData();
    fd.set("nome", nome);
    fd.set("turma", turma);
    const res = await criarAluno(null, fd);
    setEnviando(false);
    if (res?.ok) {
      setMsg({ tipo: "ok", texto: `${res.nome} criado! Código: ${res.codigoAcesso}` });
      setNome("");
      recarregar(turma, periodo);
      router.refresh();
    } else {
      setMsg({ tipo: "erro", texto: res?.erro || "Erro ao criar aluno." });
    }
  }

  return (
    <main className="dashboard-shell">
      <h1 className="dash-titulo">Relatório</h1>

      <div className="dash-filtros">
        <select className="dash-select" value={turma} onChange={(e) => trocarTurma(e.target.value)}>
          {turmas.length === 0 && <option value="">Nenhuma turma</option>}
          {turmas.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="dash-select" value={periodo} onChange={(e) => trocarPeriodo(e.target.value)}>
          {PERIODOS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
      </div>

      <h2 className="dash-subtitulo">jogos</h2>

      <div className="dash-relatorio-topo">
        <div className="dash-stat-duplo">
          <div>
            <span>jogos jogados</span>
            <strong>{carregando ? "…" : rel.jogosJogados}</strong>
          </div>
          <div>
            <span>experiência da turma</span>
            <strong>{carregando ? "…" : rel.xpTurma}</strong>
          </div>
        </div>

        <div className="dash-top5">
          <h3>Top 5 da turma</h3>
          {rel.top5.length === 0 && <p className="dash-top5-vazio">Sem dados no período.</p>}
          {rel.top5.map((a) => (
            <div key={a.id} className="dash-top5-linha">
              <div className="dash-top5-barra" style={{ width: `${Math.max(a.pct, 14)}%` }}>
                <span>{a.jogos} jogos</span>
                <span>{a.pct}%</span>
              </div>
              <span className="dash-top5-nome">{a.nome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-tabela">
        <div className="dash-tabela-head">
          <span>Nome</span>
          <span>Total de jogos</span>
          <span>Experiência</span>
        </div>
        {rel.ranking.map((a) => (
          <div key={a.id} className="dash-tabela-linha">
            <span>{a.nome}</span>
            <span>{a.jogos} jogos</span>
            <span>{a.xpTotal}</span>
          </div>
        ))}
        {rel.ranking.length === 0 && (
          <div className="dash-tabela-linha"><span>Nenhum aluno nesta turma.</span></div>
        )}

        {/* adicionar aluno ao fim do ranking */}
        <form className="dash-add-aluno" onSubmit={adicionarAluno}>
          <input
            placeholder={`Novo aluno em ${turma || "..."}`}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            aria-label="Nome do novo aluno"
          />
          <button className="btn btn-escuro" type="submit" disabled={enviando || !turma}>
            {enviando ? "Criando..." : "Adicionar aluno"}
          </button>
        </form>
        {msg && (
          <p className={`dash-add-msg ${msg.tipo}`}>{msg.texto}</p>
        )}
      </div>
    </main>
  );
}
