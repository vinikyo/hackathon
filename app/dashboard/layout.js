import { redirect } from "next/navigation";
import { getGestorLogado } from "@/app/actions";
import DashboardSidebar from "@/components/DashboardSidebar";

// Layout do gestor: protege a rota e mostra a sidebar em todas as sub-páginas.
export default async function DashboardLayout({ children }) {
  const gestor = await getGestorLogado();
  if (!gestor) redirect("/login/gestor");

  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <div className="dashboard-conteudo">{children}</div>
    </div>
  );
}
