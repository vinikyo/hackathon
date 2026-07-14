"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginGestor } from "@/app/actions";

export default function LoginGestor() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  async function entrar(e) {
    e.preventDefault();
    setErro("");
    const fd = new FormData();
    fd.set("email", email);
    fd.set("senha", senha);
    const res = await loginGestor(null, fd);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setErro(res?.erro || "Não foi possível entrar.");
    }
  }

  return (
    <div>
      <div className="login-topo">
        <img className="logo-img-pequena" src="/studymons/logo.png" alt="StudyMons" />
        <span>StudyMons</span>
      </div>
      <form className="login-corpo" onSubmit={entrar}>
        <button type="button" className="btn-voltar" onClick={() => router.push("/")}>
          ‹ Voltar
        </button>
        <h2>Acesso do gestor</h2>
        <input
          className="login-input"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="E-mail"
        />
        <div className="campo-senha">
          <input
            className="login-input"
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            aria-label="Senha"
          />
          <button
            type="button"
            className="btn-olho"
            onClick={() => setMostrarSenha((v) => !v)}
            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={mostrarSenha}
            tabIndex={-1}
          >
            {mostrarSenha ? (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.6 18.6 0 0 1 5.06-5.94M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {erro && <p style={{ color: "#094074", fontWeight: 700 }}>{erro}</p>}
        <button className="btn btn-escuro btn-bloco" type="submit">Entrar</button>
      </form>
    </div>
  );
}
