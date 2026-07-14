"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StudyHeader from "@/components/StudyHeader";
import { jogos } from "@/lib/mockData";

// Jogos reais portados da branch main:
import Adivinacao from "@/components/games/Adivinacao";
import Ciensapo from "@/components/games/Ciensapo";
import RodaDaPreguica from "@/components/games/RodaDaPreguica";
import MathShip from "@/components/games/mathShip";
import ArtGame from "@/components/games/ArtGame";
import WordSearch from "@/components/games/WordSearch";
import FillBlanks from "@/components/games/FillBlanks";

// Mapa: campo "componente" do catálogo (mockData) -> componente React.
const COMPONENTES = {
  adivinacao: Adivinacao,
  ciensapo: Ciensapo,
  rodaPreguica: RodaDaPreguica,
  rodaDaPreguica: RodaDaPreguica,
  mathShip: MathShip,
  artGame: ArtGame,
  wordSearch: WordSearch,
  fillBlanks: FillBlanks,
};

export default function PaginaDoJogo({ params }) {
  const router = useRouter();
  const jogo = jogos.find((item) => item.id === params.id);
  const Jogo = jogo ? COMPONENTES[jogo.componente] : null;

  if (!jogo || !Jogo) {
    return (
      <div>
        <StudyHeader />
        <div className="tela">
          <div className="tela-centro">
            <div className="jogo-nao-encontrado">
              <h1>Jogo não encontrado.</h1>
              <Link className="btn btn-escuro" href="/jogos">Voltar aos jogos</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Linhas do quadro BNCC. Usamos os campos que existem no catálogo;
  // onde não há dado específico, mostramos um traço.
  const bnccLinhas = [
    { rotulo: "Componente", valor: jogo.materia },
    { rotulo: "Ano / Faixa", valor: jogo.ano },
    { rotulo: "Unidade temática", valor: jogo.trilha || "—" },
    { rotulo: "Objeto de conhecimento", valor: jogo.descricao },
    { rotulo: "Habilidade (BNCC)", valor: jogo.bncc },
  ];

  return (
    <div>
      <StudyHeader />
      <div className="tela">
        <div className="tela-centro">
          <div className="jogo-cabecalho">
            <button className="btn-voltar" onClick={() => router.push("/jogos")}>
              ‹ Voltar aos jogos
            </button>
            <h1 className="jogo-titulo">{jogo.titulo}</h1>
          </div>

          {/* moldura padrão com o jogo dentro (estilo Escola Games) */}
          <div className="jogo-moldura">
            <div className="game-shell jogo-area">
              <Jogo onBack={() => router.push("/jogos")} />
            </div>
          </div>

          {/* quadro BNCC relacionado ao jogo */}
          <div className="bncc-quadro">
            <div className="bncc-quadro-titulo">BNCC — Ensino Fundamental</div>
            <div className="bncc-tabela">
              {bnccLinhas.map((l) => (
                <div key={l.rotulo} className="bncc-coluna">
                  <div className="bncc-cabecalho">{l.rotulo}</div>
                  <div className="bncc-valor">{l.valor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
