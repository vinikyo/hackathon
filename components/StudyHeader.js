"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Header das telas internas. Recebe o aluno logado por prop (vindo do
// Server Component da página). Sem prop, mostra um avatar genérico.
export default function StudyHeader({ busca, setBusca, aluno }) {
  const pathname = usePathname();
  const router = useRouter();

  const inicial = aluno?.nome?.[0] || "?";

  const links = [
    { href: "/jogos", label: "Jogos" },
    { href: "/studymons", label: "Meus Studymons" },
    { href: "/combate", label: "CombateQuiz" },
    { href: "/ranking", label: "Ranking" },
  ];

  return (
    <header className="study-header">
      <div className="study-header-top">
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

        {/* Foto do aluno -> leva à customização (mockup).
            Troque o placeholder por <img src="/studymons/aluno.png" /> */}
        <button className="study-avatar" onClick={() => router.push("/perfil")} aria-label="Meu perfil">
          {aluno?.foto ? <img src={aluno.foto} alt="" /> : inicial}
        </button>
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
