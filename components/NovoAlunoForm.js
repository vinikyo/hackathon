"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { criarAluno } from "@/app/actions";

export default function NovoAlunoForm() {
  const [nome, setNome] = useState("");
  const [turma, setTurma] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const router = useRouter();

  async function enviar(e) {
    e.preventDefault();
    setErro("");
    setSucesso(null);
    setEnviando(true);

    const fd = new FormData();
    fd.set("nome", nome);
    fd.set("turma", turma);
    const res = await criarAluno(null, fd);

    setEnviando(false);
    if (res?.ok) {
      setSucesso({ nome: res.nome, codigoAcesso: res.codigoAcesso });
      setNome("");
      setTurma("");
      router.refresh();
    } else {
      setErro(res?.erro || "Não foi possível criar o aluno.");
    }
  }

  return (
    <form className="novo-aluno-form" onSubmit={enviar}>
      <input
        className="login-input"
        placeholder="Nome do aluno"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        aria-label="Nome do aluno"
      />
      <input
        className="login-input"
        placeholder="Turma (ex: 5º A)"
        value={turma}
        onChange={(e) => setTurma(e.target.value)}
        aria-label="Turma"
      />
      <button className="btn btn-escuro" type="submit" disabled={enviando}>
        {enviando ? "Criando..." : "Adicionar aluno"}
      </button>

      {erro && <p style={{ color: "#094074", fontWeight: 700 }}>{erro}</p>}
      {sucesso && (
        <p style={{ fontWeight: 700 }}>
          {sucesso.nome} criado! Código de acesso: <strong>{sucesso.codigoAcesso}</strong>
        </p>
      )}
    </form>
  );
}
