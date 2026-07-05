import { redirect } from "next/navigation";
import { getDadosAluno } from "@/app/actions";
import StudyHeader from "@/components/StudyHeader";

export default async function Perfil() {
  const dados = await getDadosAluno();
  if (!dados) redirect("/login/aluno");

  return (
    <div>
      <StudyHeader aluno={dados.aluno} />
      <div className="tela">
        <div className="tela-centro">
          <div className="perfil-mock">
            <h2>Olá, {dados.aluno.nome}!</h2>
            <p>Turma {dados.aluno.turma} · {dados.aluno.xpTotal} XP no total</p>
            <p style={{ marginTop: "1rem" }}>
              Customização do personagem em breve (em prototipação no Figma).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
