import RankingCliente from "./RankingCliente";
import { getRanking, getDadosAluno } from "@/app/actions";
import { redirect } from "next/navigation";

// Server Component: busca o ranking real do banco e passa pro cliente.
export default async function Ranking() {
  const dados = await getDadosAluno();
  if (!dados) redirect("/login/aluno");
  const ranking = await getRanking();
  return <RankingCliente ranking={ranking} meuId={dados.aluno.id} aluno={dados.aluno} />;
}
