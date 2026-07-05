"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
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
      <main className="inner-page narrow">
        <div className="page-copy">
          <h1>Jogo não encontrado.</h1>
          <Link className="btn btn-primary" href="/jogos">Voltar ao hub</Link>
        </div>
      </main>
    );
  }

  // O jogo fica dentro de .game-shell, cujo fundo segue o tema — assim
  // jogos com fundo claro OU escuro fixo passam a acompanhar a
  // plataforma. O toggle fica flutuando no canto pra trocar na hora.
  return (
    <div className="game-shell">
      <Jogo onBack={() => router.push("/jogos")} />
    </div>
  );
}
