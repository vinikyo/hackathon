import { redirect } from "next/navigation";
import { getDadosAluno } from "@/app/actions";
import StudymonsCliente from "./StudymonsCliente";

export default async function MeusStudymons() {
  const dados = await getDadosAluno();
  if (!dados) redirect("/login/aluno");
  return <StudymonsCliente aluno={dados.aluno} materias={dados.materias} />;
}
