"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutGestor } from "@/app/actions";

const itens = [
  { href: "/dashboard", label: "Painel" },
  { href: "/dashboard/turmas", label: "Turmas" },
  { href: "/dashboard/analise", label: "Análise" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function sair() {
    await logoutGestor();
    router.push("/");
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="marca">StudyMons</div>
      <nav>
        {itens.map((it) => (
          <Link key={it.href} href={it.href} className={pathname === it.href ? "ativo" : ""}>
            {it.label}
          </Link>
        ))}
      </nav>
      <button className="sair-btn" onClick={sair}>Sair</button>
    </aside>
  );
}
