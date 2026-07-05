import { redirect } from "next/navigation";
import { getDadosAluno } from "@/app/actions";
import CombateCliente from "./CombateCliente";

export default async function Combate() {
  const dados = await getDadosAluno();
  if (!dados) redirect("/login/aluno");
  return <CombateCliente aluno={dados.aluno} materias={dados.materias} />;
}
