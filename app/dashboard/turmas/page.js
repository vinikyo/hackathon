import { getTurmas, getRelatorioTurma } from "@/app/actions";
import TurmasCliente from "./TurmasCliente";

// TURMAS (Relatório): seletor de turma + período, cards, top 5, ranking
// e adicionar aluno ao fim.
export default async function DashboardTurmas() {
  const turmas = await getTurmas();
  const turmaInicial = turmas[0] || "";
  const relatorioInicial = await getRelatorioTurma(turmaInicial, "30dias");

  return (
    <TurmasCliente
      turmas={turmas}
      turmaInicial={turmaInicial}
      relatorioInicial={relatorioInicial}
    />
  );
}
