import { getHistoricoPorMateriaGestor, getDashboardResumo } from "@/app/actions";
import AnaliseCliente from "./AnaliseCliente";

// ANÁLISE: chatbot fake que "analisa" a sala. As respostas são pré-definidas,
// mas usam dados REAIS do banco (histórico por matéria) + gráfico.
export default async function DashboardAnalise() {
  const [materias, resumo] = await Promise.all([
    getHistoricoPorMateriaGestor(),
    getDashboardResumo(),
  ]);
  return <AnaliseCliente materias={materias} resumo={resumo} />;
}
