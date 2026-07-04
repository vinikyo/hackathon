"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { materias, roupasDisponiveis, descricoesCompanheiro } from "@/lib/mockData";

export default function AccountBar({
  nome,
  turma,
  ano,
  xpTotal,
  search,
  voltarHref,
  voltarLabel = "Voltar",
  mostrarRanking = true,
  mostrarMenuAvatar = true,
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [gaveta, setGaveta] = useState(null); // "roupas" | "monstrinhos" | null
  const router = useRouter();

  function abrirGaveta(nomeGaveta) {
    setGaveta(nomeGaveta);
    setMenuAberto(false);
  }

  function sair() {
    setMenuAberto(false);
    router.push("/");
  }

  return (
    <>
      <header className="account-bar">
        <div className="account-meta">
          <div className="account-name">{nome}</div>
          <div className="account-subtitle">
            {turma} · {ano}
          </div>
        </div>

        {search ? <div className="account-search">{search}</div> : null}

        <div className="account-actions">
          <span className="xp-chip">{xpTotal} XP</span>

          {voltarHref && (
            <Link className="btn btn-soft btn-small" href={voltarHref}>
              {voltarLabel}
            </Link>
          )}

          {mostrarRanking && (
            <Link className="btn btn-soft btn-small" href="/ranking">
              Ranking
            </Link>
          )}

          {mostrarMenuAvatar && (
            <div className="avatar-menu">
              <button
                type="button"
                className="avatar-trigger"
                onClick={() => setMenuAberto((v) => !v)}
                aria-haspopup="true"
                aria-expanded={menuAberto}
                aria-label="Abrir menu do perfil"
              >
                {nome?.[0] || "?"}
              </button>

              {menuAberto && (
                <div className="avatar-dropdown" role="menu">
                  <Link href="/personagem/editar" role="menuitem" className="menu-link">
                    Editar personagem
                  </Link>
                  <button type="button" role="menuitem" onClick={() => abrirGaveta("monstrinhos")}>
                    Meus monstrinhos
                  </button>
                  <button type="button" role="menuitem" className="sair" onClick={sair}>
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {gaveta && (
        <div className="drawer-backdrop" onClick={() => setGaveta(null)}>
          <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>{gaveta === "roupas" ? "Editar personagem" : "Meus monstrinhos"}</h2>
              <button type="button" className="drawer-close" onClick={() => setGaveta(null)} aria-label="Fechar">
                ×
              </button>
            </div>

            {gaveta === "roupas" ? (
              <div className="roupas-lista">
                {roupasDisponiveis.map((item) => (
                  <div key={item.id} className={`roupa-item ${item.equipado ? "equipado" : ""}`}>
                    <div>
                      <strong>{item.nome}</strong>
                      <span>{item.categoria}</span>
                    </div>
                    <span className="roupa-status">{item.equipado ? "Equipado" : "Disponível"}</span>
                  </div>
                ))}
                <p className="drawer-note">
                  Protótipo: clicar pra equipar entra na próxima etapa, junto com a arte real dos itens.
                </p>
              </div>
            ) : (
              <div className="monstrinhos-lista">
                {materias.map((materia) => (
                  <div key={materia.id} className="monstrinho-card">
                    <div className={`avatar avatar-large ${materia.cor}`}>{materia.companheiro[0]}</div>
                    <div>
                      <h3>{materia.companheiro}</h3>
                      <span className="monstrinho-meta">
                        {materia.nome} · nível {materia.nivel}
                      </span>
                      <p>{descricoesCompanheiro[materia.id]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
