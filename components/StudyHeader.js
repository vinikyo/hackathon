"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/actions";

// Header das telas internas. A foto do aluno abre uma gaveta com
// "Trocar roupas" e "Sair". A gaveta é renderizada via portal no body,
// pra não ficar presa ao contexto de empilhamento do header (que faria
// a barra de navegação cobri-la).
export default function StudyHeader({ busca, setBusca, aluno }) {
  const pathname = usePathname();
  const router = useRouter();
  const [gavetaAberta, setGavetaAberta] = useState(false);
  const [pos, setPos] = useState(null); // posição da gaveta (calculada do avatar)
  const [montado, setMontado] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => { setMontado(true); }, []);

  const inicial = aluno?.nome?.[0] || "?";

  const links = [
    { href: "/jogos", label: "Jogos" },
    { href: "/studymons", label: "Meus Studymons" },
    { href: "/combate", label: "CombateQuiz" },
    { href: "/ranking", label: "Ranking" },
  ];

  function abrirGaveta() {
    if (avatarRef.current) {
      const r = avatarRef.current.getBoundingClientRect();
      // ancorada logo abaixo do avatar, alinhada pela direita
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
    setGavetaAberta((v) => !v);
  }

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
            ref={avatarRef}
            className="study-avatar"
            onClick={abrirGaveta}
            aria-label="Menu do perfil"
            aria-expanded={gavetaAberta}
          >
            {aluno?.foto ? <img src={aluno.foto} alt="" /> : inicial}
          </button>
        </div>
      </div>

      <nav className="study-nav">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={pathname === l.href ? "ativo" : ""}>
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Gaveta via portal no body: escapa do empilhamento do header */}
      {montado && gavetaAberta && pos && createPortal(
        <>
          <div className="avatar-gaveta-fundo" onClick={() => setGavetaAberta(false)} />
          <div className="avatar-gaveta" style={{ top: pos.top, right: pos.right }}>
            <div className="avatar-gaveta-nome">{aluno?.nome || "Aluno"}</div>
            <button onClick={() => { setGavetaAberta(false); router.push("/perfil"); }}>
              Trocar roupas
            </button>
            <button className="sair" onClick={sair}>Sair</button>
          </div>
        </>,
        document.body
      )}
    </header>
  );
}
