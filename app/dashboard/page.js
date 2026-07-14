import { getResumoPainel, getGestorLogado } from "@/app/actions";
import { jogos } from "@/lib/mockData";
import PainelCliente from "./PainelCliente";

// PAINEL (Novidades): resumo por período + grade de jogos.
export default async function DashboardPainel() {
  const gestor = await getGestorLogado();
  const resumoInicial = await getResumoPainel("hoje");
  // só os jogos jogáveis aparecem na grade de novidades
  const jogaveis = jogos.filter((j) => j.componente).map((j) => ({
    id: j.id, titulo: j.titulo, materia: j.materia, imagem: j.imagem || null,
  }));

  return <PainelCliente gestor={gestor} resumoInicial={resumoInicial} jogos={jogaveis} />;
}
