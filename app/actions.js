"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { verificarSenha } from "@/lib/auth";

// ---- LOGIN por código da carteirinha ----
export async function loginAluno(prevState, formData) {
  const codigo = formData.get("codigo")?.toString().trim();
  if (!codigo) return { erro: "Digite seu código." };

  const aluno = await prisma.aluno.findUnique({ where: { codigoAcesso: codigo } });
  if (!aluno) return { erro: "Código não encontrado." };

  // "sessão" simples: guarda o id do aluno num cookie.
  cookies().set("alunoId", String(aluno.id), { httpOnly: true, path: "/" });
  return { ok: true };
}

export async function logout() {
  cookies().delete("alunoId");
}

// ---- LOGIN do gestor (professor) por e-mail + senha ----
export async function loginGestor(prevState, formData) {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const senha = formData.get("senha")?.toString();
  if (!email || !senha) return { erro: "Preencha e-mail e senha." };

  const professor = await prisma.professor.findUnique({ where: { email } });
  if (!professor) return { erro: "E-mail não encontrado." };

  const senhaOk = verificarSenha(senha, professor.senhaHash);
  if (!senhaOk) return { erro: "Senha incorreta." };

  cookies().set("professorId", String(professor.id), { httpOnly: true, path: "/" });
  return { ok: true };
}

export async function logoutGestor() {
  cookies().delete("professorId");
}

// Lê o professor logado (via cookie). Retorna null se não houver.
export async function getGestorLogado() {
  const id = cookies().get("professorId")?.value;
  if (!id) return null;
  return prisma.professor.findUnique({
    where: { id: Number(id) },
    select: { id: true, nome: true, email: true, escola: true },
  });
}

// Lê o aluno logado (via cookie). Retorna null se não houver.
export async function getAlunoLogado() {
  const id = cookies().get("alunoId")?.value;
  if (!id) return null;
  return prisma.aluno.findUnique({
    where: { id: Number(id) },
    include: { progresso: { include: { materia: true } } },
  });
}

// Dados visuais que não moram no banco (cor, sprites).
const VISUAL_MATERIA = {
  matematica: { cor: "matematica", sprite: null, spriteLivro: null },
  portugues: { cor: "portugues", sprite: null, spriteLivro: null },
  ciencias: { cor: "ciencias", sprite: null, spriteLivro: null },
  ingles: { cor: "ingles", sprite: null, spriteLivro: null },
  erer: { cor: "erer", sprite: null, spriteLivro: null },
  arte: { cor: "arte", sprite: null, spriteLivro: null },
  geografia: { cor: "geografia", sprite: null, spriteLivro: null },
  historia: { cor: "historia", sprite: null, spriteLivro: null },
};

// Retorna o aluno + suas matérias já no formato que as telas usam.
export async function getDadosAluno() {
  const aluno = await getAlunoLogado();
  if (!aluno) return null;

  const stats = await getStatsPorMateria(aluno.id);

  const materias = aluno.progresso.map((p) => {
    const s = stats[p.materiaId] || { total: 0, acertos: 0 };
    // "questões realizadas": total respondido, mostrado como progresso até 20
    // (meta simples pra virar %); "acertos": % de acerto sobre o total.
    const questoesPct = Math.min(100, Math.round((s.total / 20) * 100));
    const acertosPct = s.total > 0 ? Math.round((s.acertos / s.total) * 100) : 0;

    return {
      id: p.materiaId,
      nome: p.materia.nome,
      companheiro: p.materia.companheiro,
      descricao: p.materia.descricao,
      nivelMinimoCombate: p.materia.nivelMinimoCombate,
      nivel: p.nivel,
      xp: p.xp,
      xpProximoNivel: 500,
      estagioEvolucao: p.estagioEvolucao,
      questoesRealizadas: s.total,
      acertos: s.acertos,
      questoesPct,
      acertosPct,
      ...(VISUAL_MATERIA[p.materiaId] || { cor: "teal" }),
    };
  });

  const ordem = ["portugues", "matematica", "ciencias"];
  materias.sort((a, b) => ordem.indexOf(a.id) - ordem.indexOf(b.id));

  return {
    aluno: {
      id: aluno.id,
      nome: aluno.nome,
      turma: aluno.turma,
      xpTotal: aluno.xpTotal,
      nivelConta: aluno.nivelConta,
      foto: null,
    },
    materias,
  };
}

// ---- Registra CADA resposta do quiz (acertou/errou) no histórico ----
export async function registrarResposta(materiaId, acertou) {
  const id = cookies().get("alunoId")?.value;
  if (!id) return { erro: "Não logado." };
  await prisma.historicoJogo.create({
    data: {
      alunoId: Number(id),
      materiaId,
      origem: "quiz",
      acertou: Boolean(acertou),
      pontos: acertou ? 10 : 0,
      xpGanho: 0, // XP da matéria é somado só ao vencer (salvarBatalha)
    },
  });
  return { ok: true };
}

// ---- Salvar resultado de batalha: soma XP no progresso e na conta ----
// Nível em que a criatura evolui de "baby" para "evolved".
const NIVEL_EVOLUCAO = 5;

export async function salvarBatalha(materiaId, xpGanho) {
  const id = cookies().get("alunoId")?.value;
  if (!id) return { erro: "Não logado." };
  const alunoId = Number(id);

  const prog = await prisma.progressoMateria.findUnique({
    where: { alunoId_materiaId: { alunoId, materiaId } },
  });
  if (!prog) return { erro: "Progresso não encontrado." };

  // level-up simples: cada 500 de XP sobe 1 nível
  let novoXp = prog.xp + xpGanho;
  let novoNivel = prog.nivel;
  while (novoXp >= 500) { novoXp -= 500; novoNivel += 1; }

  const subiuNivel = novoNivel > prog.nivel;

  // Evolução: passou do nível de evolução e ainda estava "baby"?
  let novoEstagio = prog.estagioEvolucao;
  let evoluiu = false;
  if (novoNivel >= NIVEL_EVOLUCAO && prog.estagioEvolucao === "baby") {
    novoEstagio = "evolved";
    evoluiu = true;
  }

  await prisma.progressoMateria.update({
    where: { alunoId_materiaId: { alunoId, materiaId } },
    data: { xp: novoXp, nivel: novoNivel, estagioEvolucao: novoEstagio },
  });
  await prisma.aluno.update({
    where: { id: alunoId },
    data: { xpTotal: { increment: xpGanho } },
  });

  revalidatePath("/ranking");
  revalidatePath("/studymons");
  return { ok: true, nivel: novoNivel, subiuNivel, evoluiu, estagio: novoEstagio };
}

// ---- Stats reais por matéria (questões feitas e % de acerto) ----
async function getStatsPorMateria(alunoId) {
  const registros = await prisma.historicoJogo.groupBy({
    by: ["materiaId", "acertou"],
    where: { alunoId, origem: "quiz" },
    _count: { _all: true },
  });

  // Agrega em { materiaId: { total, acertos } }
  const mapa = {};
  for (const r of registros) {
    if (!mapa[r.materiaId]) mapa[r.materiaId] = { total: 0, acertos: 0 };
    mapa[r.materiaId].total += r._count._all;
    if (r.acertou) mapa[r.materiaId].acertos += r._count._all;
  }
  return mapa;
}

// ---- Gera um código de acesso único no formato "XXXX-XXXX" ----
async function gerarCodigoAcessoUnico() {
  for (let tentativa = 0; tentativa < 10; tentativa++) {
    const codigo = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const existe = await prisma.aluno.findUnique({ where: { codigoAcesso: codigo } });
    if (!existe) return codigo;
  }
  throw new Error("Não foi possível gerar um código único.");
}

// ---- CRUD: gestor cria um novo aluno na turma ----
export async function criarAluno(prevState, formData) {
  const gestor = await getGestorLogado();
  if (!gestor) return { erro: "Sessão do gestor expirada." };

  const nome = formData.get("nome")?.toString().trim();
  const turma = formData.get("turma")?.toString().trim();
  if (!nome || !turma) return { erro: "Preencha nome e turma." };

  const codigoAcesso = await gerarCodigoAcessoUnico();
  const matricula = `${Date.now()}`.slice(-8); // simples e único o bastante pro protótipo

  const aluno = await prisma.aluno.create({
    data: { nome, turma, matricula, codigoAcesso },
  });

  // Cria o progresso zerado do aluno em todas as matérias existentes.
  const materias = await prisma.materia.findMany({ select: { id: true } });
  await prisma.progressoMateria.createMany({
    data: materias.map((m) => ({ alunoId: aluno.id, materiaId: m.id })),
  });

  revalidatePath("/dashboard");
  return { ok: true, nome: aluno.nome, codigoAcesso };
}

// ---- Histórico agregado por matéria (acertos/erros da turma inteira) ----
export async function getHistoricoPorMateriaGestor() {
  const [registros, materias] = await Promise.all([
    prisma.historicoJogo.groupBy({
      by: ["materiaId", "acertou"],
      where: { origem: "quiz" },
      _count: { _all: true },
    }),
    prisma.materia.findMany({ select: { id: true, nome: true } }),
  ]);

  const mapa = {};
  for (const r of registros) {
    if (!mapa[r.materiaId]) mapa[r.materiaId] = { total: 0, acertos: 0 };
    mapa[r.materiaId].total += r._count._all;
    if (r.acertou) mapa[r.materiaId].acertos += r._count._all;
  }

  return materias.map((m) => {
    const s = mapa[m.id] || { total: 0, acertos: 0 };
    const acertosPct = s.total > 0 ? Math.round((s.acertos / s.total) * 100) : 0;
    return {
      id: m.id,
      nome: m.nome,
      cor: VISUAL_MATERIA[m.id]?.cor || "teal",
      totalRespostas: s.total,
      acertosPct,
    };
  });
}

// ---- Ranking real da sala (ordena por XP total) ----
export async function getRanking() {
  return prisma.aluno.findMany({
    orderBy: { xpTotal: "desc" },
    select: { id: true, nome: true, turma: true, xpTotal: true },
  });
}

// ==========================================================
// ---- DASHBOARD DO GESTOR (dados reais, antes eram mock) ----
// ==========================================================

function formatXpResumido(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// Cartões de resumo do topo do dashboard.
export async function getDashboardResumo() {
  const [totalAlunos, quizzesConcluidos, xpAgg, jogosPublicados] = await Promise.all([
    prisma.aluno.count(),
    prisma.historicoJogo.count({ where: { origem: "quiz" } }),
    prisma.aluno.aggregate({ _sum: { xpTotal: true } }),
    prisma.materia.count(),
  ]);

  return [
    { label: "Alunos ativos", valor: String(totalAlunos) },
    { label: "Matérias no ar", valor: String(jogosPublicados) },
    { label: "Quizzes concluídos", valor: String(quizzesConcluidos) },
    { label: "XP distribuído", valor: formatXpResumido(xpAgg._sum.xpTotal || 0) },
  ];
}

// Lista de alunos com XP total e status (Ativo/Atenção conforme última jogada).
const DIAS_PARA_ATENCAO = 7;

export async function getDashboardAlunos() {
  const [alunos, ultimasJogadas] = await Promise.all([
    prisma.aluno.findMany({
      orderBy: { xpTotal: "desc" },
      select: { id: true, nome: true, turma: true, xpTotal: true },
    }),
    prisma.historicoJogo.groupBy({ by: ["alunoId"], _max: { jogadoEm: true } }),
  ]);

  const mapaUltimaJogada = Object.fromEntries(
    ultimasJogadas.map((j) => [j.alunoId, j._max.jogadoEm])
  );
  const agora = Date.now();

  return alunos.map((a) => {
    const ultima = mapaUltimaJogada[a.id];
    const diasSemJogar = ultima ? (agora - new Date(ultima).getTime()) / 86400000 : Infinity;
    return {
      id: a.id,
      nome: a.nome,
      turma: a.turma,
      ano: `${a.turma?.split(" ")[0] || "5º"} ano`, // schema ainda não tem "ano" próprio
      xpTotal: a.xpTotal,
      status: diasSemJogar <= DIAS_PARA_ATENCAO ? "Ativo" : "Atenção",
    };
  });
}

// Resumo por matéria: XP somado da turma inteira + nível médio da turma.
export async function getMateriasResumoGestor() {
  const materias = await prisma.materia.findMany({ include: { progresso: true } });

  return materias.map((m) => {
    const xpTotalMateria = m.progresso.reduce((acc, p) => acc + p.xp, 0);
    const nivelMedio = m.progresso.length
      ? Math.round(m.progresso.reduce((acc, p) => acc + p.nivel, 0) / m.progresso.length)
      : 1;
    return {
      id: m.id,
      nome: m.nome,
      companheiro: m.companheiro,
      cor: VISUAL_MATERIA[m.id]?.cor || "teal",
      nivel: nivelMedio,
      xp: xpTotalMateria,
    };
  });
}

// ---- Ranking por matéria (ordena pelo XP do progresso daquela matéria) ----
export async function getRankingPorMateria(materiaId) {
  const progresso = await prisma.progressoMateria.findMany({
    where: { materiaId },
    orderBy: { xp: "desc" },
    include: { aluno: { select: { id: true, nome: true, turma: true } } },
  });
  // Formata igual ao ranking geral, mas o "xp" mostrado é o da matéria.
  return progresso.map((p) => ({
    id: p.aluno.id,
    nome: p.aluno.nome,
    turma: p.aluno.turma,
    xpTotal: p.xp,
  }));
}
