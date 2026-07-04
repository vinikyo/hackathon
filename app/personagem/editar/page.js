"use client";

import { useState } from "react";
import AccountBar from "@/components/AccountBar";
import { contaAluno, roupasDisponiveis } from "@/lib/mockData";

export default function EditarPersonagem() {
  const [equipped, setEquipped] = useState({
    cabeca: roupasDisponiveis.find((r) => r.categoria === "Cabeça" && r.equipado) || null,
    corpo: roupasDisponiveis.find((r) => r.categoria === "Corpo" && r.equipado) || null,
    perna: roupasDisponiveis.find((r) => r.categoria === "Perna" && r.equipado) || null,
  });

  const itemsByCategory = (cat) => roupasDisponiveis.filter((r) => r.categoria === cat);

  function toggleEquip(item, cat) {
    setEquipped((prev) => ({ ...prev, [cat]: prev[cat]?.id === item.id ? null : item }));
  }

  return (
    <div className="app-screen">
      <AccountBar
        nome={contaAluno.nome}
        turma={contaAluno.turma}
        ano={contaAluno.ano}
        xpTotal={contaAluno.xpTotal}
        voltarHref="/personagem"
        voltarLabel="Voltar"
      />

      <main className="inner-page">
        <div className="page-copy">
          <span className="hero-kicker">Editar personagem</span>
          <h1>Customize seu personagem</h1>
          <p>Adicione a imagem do personagem à esquerda e use o guarda-roupa à direita.</p>
        </div>

        <div className="editar-personagem">
          <div className="avatar-column">
            <div className="avatar-preview">
              <div className="avatar-drop">Arraste ou insira o PNG do personagem aqui</div>

              <div className="equipped-list">
                <div>{equipped.cabeca ? `Chapéu: ${equipped.cabeca.nome}` : "Nenhum chapéu"}</div>
                <div>{equipped.corpo ? `Camisa: ${equipped.corpo.nome}` : "Nenhuma camisa"}</div>
                <div>{equipped.perna ? `Parte de baixo: ${equipped.perna.nome}` : "Nenhuma peça"}</div>
              </div>
            </div>
          </div>

          <aside className="wardrobe-column">
            <h2>Guarda-roupa</h2>
            {[
              "Cabeça",
              "Corpo",
              "Perna",
            ].map((cat) => (
              <section key={cat} className="wardrobe-section">
                <h3>{cat}</h3>
                <div className="wardrobe-items">
                  {itemsByCategory(cat).length ? (
                    itemsByCategory(cat).map((item) => (
                      <div
                        key={item.id}
                        className={`wardrobe-item ${equipped[cat.toLowerCase()]?.id === item.id ? "equipped" : ""}`}>
                        <div>
                          <strong>{item.nome}</strong>
                          <span className="categoria">{item.categoria}</span>
                        </div>
                        <button
                          onClick={() => toggleEquip(item, cat.toLowerCase())}
                          className="btn btn-soft btn-small"
                        >
                          {equipped[cat.toLowerCase()]?.id === item.id ? "Remover" : "Equipar"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="empty">Nenhum item disponível</div>
                  )}
                </div>
              </section>
            ))}
          </aside>
        </div>
      </main>
    </div>
  );
}
