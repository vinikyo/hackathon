"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAluno } from "@/app/actions";

export default function LoginAluno() {
  const [login, setLogin] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function entrar(e) {
    e.preventDefault();
    setErro("");
    const fd = new FormData();
    fd.set("codigo", login);
    const res = await loginAluno(null, fd);
    if (res?.ok) {
      router.push("/jogos");
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
        <h2>Insira seu login</h2>
        <input
          className="login-input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Ex: 7841-2241"
          aria-label="Login do aluno"
        />
        {erro && <p style={{ color: "#094074", fontWeight: 700 }}>{erro}</p>}
        <button className="btn btn-escuro btn-bloco" type="submit">Entrar</button>
      </form>
    </div>
  );
}
