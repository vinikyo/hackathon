"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/actions";

// Header das telas internas. A foto do aluno abre uma gaveta com
// "Trocar roupas" e "Sair".
export default function StudyHeader({ busca, setBusca, aluno }) {
  const pathname = usePathname();
  const router = useRouter();
  const [gavetaAberta, setGavetaAberta] = useState(false);

  const inicial = aluno?.nome?.[0] || "?";

  const links = [
    { href: "/jogos", label: "Jogos" },
    { href: "/studymons", label: "Meus Studymons" },
    { href: "/combate", label: "CombateQuiz" },
    { href: "/ranking", label: "Ranking" },
  ];

  async function sair() {
    await logout();
    router.push("/");
  }

  return (
    <header className="study-header">
      <div className="study-header-top">
        <img className="study-logo" src="/studymons/logo.png" alt="" />
        <span className="study-brand">StudyMons</span>

        <div className="study-search">
          <span aria-hidden>⌕</span>
          <input
            placeholder="Pesquise jogos"
            value={busca ?? ""}
            onChange={(e) => setBusca?.(e.target.value)}
            aria-label="Pesquisar jogos"
          />
        </div>

        <div className="avatar-wrap">
          <button
            className="study-avatar"
            onClick={() => setGavetaAberta((v) => !v)}
            aria-label="Menu do perfil"
            aria-expanded={gavetaAberta}
          >
            {aluno?.foto ? <img src={aluno.foto} alt="" /> : inicial}
          </button>

          {gavetaAberta && (
            <>
              <div className="avatar-gaveta-fundo" onClick={() => setGavetaAberta(false)} />
              <div className="avatar-gaveta">
                <div className="avatar-gaveta-nome">{aluno?.nome || "Aluno"}</div>
                <button onClick={() => { setGavetaAberta(false); router.push("/perfil"); }}>
                  Trocar roupas
                </button>
                <button className="sair" onClick={sair}>Sair</button>
              </div>
            </>
          )}
        </div>
      </div>

      <nav className="study-nav">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={pathname === l.href ? "ativo" : ""}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
