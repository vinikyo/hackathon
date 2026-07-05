"use client";

import { useRouter } from "next/navigation";

export default function Inicial() {
  const router = useRouter();

  return (
    <div className="inicial">
      <div className="inicial-logo">
        {/* Troque o placeholder pelo logo: <img src="/studymons/logo.png" alt="StudyMons" /> */}
        <img className="logo-img" src="/studymons/logo.png" alt="StudyMons" />
        <span>StudyMons</span>
      </div>

      <button className="btn btn-escuro btn-bloco" onClick={() => router.push("/login/aluno")}>
        Sou aluno
      </button>
      <button className="btn btn-escuro btn-bloco" onClick={() => router.push("/login/gestor")}>
        Sou gestor
      </button>
    </div>
  );
}
