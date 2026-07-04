"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [codigo, setCodigo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("aluno");
  const router = useRouter();

  function entrarAluno(e) {
    e.preventDefault();
    if (!codigo.trim()) return;
    router.push("/hub");
  }

  function entrarGestor(e) {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) return;
    router.push("/dashboard");
  }

  return (
    <main className="login-screen">
      <section className="login-hero">
        <div className="brand-stack">
          <span className="brand-badge">EstudiMons</span>
          <h1>Aprender, jogar e evoluir com a sala inteira.</h1>
          <p>
            Um hub escolar com jogos educativos, quizzes de evolução, ranking da sala e login
            simples para crianças, professores e gestores.
          </p>
        </div>

        <div className="login-illustration" aria-hidden="true">
          <span className="monster monster-one" />
          <span className="monster monster-two" />
          <span className="monster monster-three" />
          <span className="monster monster-four" />
        </div>
      </section>

      <section className="login-panel">
        <div className="role-switch" role="tablist" aria-label="Tipo de acesso">
          <button
            className={`role-switch-btn ${perfil === "aluno" ? "ativo" : ""}`}
            onClick={() => setPerfil("aluno")}
            type="button"
          >
            Sou aluno
          </button>
          <button
            className={`role-switch-btn ${perfil === "gestor" ? "ativo" : ""}`}
            onClick={() => setPerfil("gestor")}
            type="button"
          >
            Sou professor ou gestor
          </button>
        </div>

        {perfil === "aluno" ? (
          <form className="auth-card aluno" onSubmit={entrarAluno}>
            <span className="auth-tag">Acesso da criança</span>
            <h2>Entre com o código da carteirinha</h2>
            <p>O código vincula o aluno ao ano, sala e progresso da conta.</p>
            <label className="field-label" htmlFor="codigo">Código do aluno</label>
            <input
              id="codigo"
              className="login-input"
              placeholder="7841-2241"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              maxLength={9}
            />
            <button className="btn btn-primary btn-full" type="submit">
              Entrar como aluno
            </button>
          </form>
        ) : (
          <form className="auth-card gestor" onSubmit={entrarGestor}>
            <span className="auth-tag">Painel da escola</span>
            <h2>Login do professor ou gestor</h2>
            <p>Depois do acesso, a equipe vê alunos, XP, salas e jogos liberados.</p>
            <label className="field-label" htmlFor="email">E-mail</label>
            <input
              id="email"
              className="login-input"
              placeholder="gestor@escola.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="field-label" htmlFor="senha">Senha</label>
            <input
              id="senha"
              className="login-input"
              placeholder="••••••••"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button className="btn btn-primary btn-full" type="submit">
              Entrar no dashboard
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
