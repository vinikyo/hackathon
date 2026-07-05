import { getDadosAluno } from "@/app/actions";
import { redirect } from "next/navigation";
import JogosCliente from "./JogosCliente";

export default async function Jogos() {
  const dados = await getDadosAluno();
  if (!dados) redirect("/login/aluno");
  return <JogosCliente aluno={dados.aluno} />;
}
