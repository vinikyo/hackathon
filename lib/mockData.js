// Dados fictícios para o hackaton. A estrutura já está pronta para trocar
// os mocks por respostas reais de backend quando o fluxo de escola existir.

export const contaAluno = {
  nome: "Você",
  turma: "5º A",
  ano: "5º ano",
  xpTotal: 760,
  codigo: "7841-2241",
};

export const materias = [
  {
    id: "portugues",
    nome: "Português",
    companheiro: "Guará",
    cor: "coral",
    nivel: 3,
    xp: 420,
    xpProximoNivel: 600,
    liberado: true,
  },
  {
    id: "matematica",
    nome: "Matemática",
    companheiro: "Polvo",
    cor: "teal",
    nivel: 2,
    xp: 260,
    xpProximoNivel: 400,
    liberado: true,
  },
  {
    id: "ciencias",
    nome: "Ciências",
    companheiro: "Tartaruga",
    cor: "marigold",
    nivel: 1,
    xp: 80,
    xpProximoNivel: 200,
    liberado: false,
  },
];

export const rankingSala = [
  { nome: "Beatriz S.", turma: "5º A", xpTotal: 1240 },
  { nome: contaAluno.nome, turma: contaAluno.turma, xpTotal: contaAluno.xpTotal, souEu: true },
  { nome: "Lucas M.", turma: "5º B", xpTotal: 690 },
  { nome: "Ana P.", turma: "5º A", xpTotal: 510 },
  { nome: "Enzo R.", turma: "5º C", xpTotal: 430 },
];

export const jogos = [
  {
    id: "caca-silabas",
    titulo: "Caça Sílabas da Floresta",
    materiaId: "portugues",
    materia: "Português",
    ano: "5º ano",
    bncc: "EF15LP01",
    destaque: true,
    cor: "coral",
    capa: "🌿",
    trilha: "Letras",
    descricao: "Encontre sílabas, forme palavras e ganhe XP para o seu companheiro.",
  },
  {
    id: "rima-radical",
    titulo: "Ritmo das Rimas",
    materiaId: "portugues",
    materia: "Português",
    ano: "5º ano",
    bncc: "EF15LP03",
    destaque: true,
    cor: "sun",
    capa: "🎤",
    trilha: "Som e ritmo",
    descricao: "Complete versos e descubra palavras que combinam.",
  },
  {
    id: "frações-fogosas",
    titulo: "Frações Fogosas",
    materiaId: "matematica",
    materia: "Matemática",
    ano: "5º ano",
    bncc: "EF05MA07",
    destaque: true,
    cor: "teal",
    capa: "🍕",
    trilha: "Números",
    descricao: "Monte pizzas e compare partes iguais sem errar a medida.",
  },
  {
    id: "medidas-marinas",
    titulo: "Medidas Marinhas",
    materiaId: "matematica",
    materia: "Matemática",
    ano: "4º ano",
    bncc: "EF04MA19",
    destaque: false,
    cor: "ocean",
    capa: "📏",
    trilha: "Grandezas",
    descricao: "Escolha a régua certa e descubra a grandeza do desafio.",
  },
  {
    id: "planeta-vivo",
    titulo: "Planeta Vivo",
    materiaId: "ciencias",
    materia: "Ciências",
    ano: "5º ano",
    bncc: "EF05CI04",
    destaque: false,
    cor: "marigold",
    capa: "🌎",
    trilha: "Natureza",
    descricao: "Classifique seres vivos, ecossistemas e hábitos do ambiente.",
  },
  {
    id: "corpo-em-acao",
    titulo: "Corpo em Ação",
    materiaId: "ciencias",
    materia: "Ciências",
    ano: "5º ano",
    bncc: "EF05CI05",
    destaque: false,
    cor: "violet",
    capa: "🫀",
    trilha: "Saúde",
    descricao: "Jogo rápido sobre movimento, saúde e energia do corpo.",
  },
];

export const dashboardAlunos = [
  { nome: "Beatriz S.", turma: "5º A", ano: "5º ano", xpTotal: 1240, status: "Ativo" },
  { nome: contaAluno.nome, turma: contaAluno.turma, ano: contaAluno.ano, xpTotal: contaAluno.xpTotal, status: "Ativo" },
  { nome: "Lucas M.", turma: "5º B", ano: "5º ano", xpTotal: 690, status: "Ativo" },
  { nome: "Ana P.", turma: "5º A", ano: "5º ano", xpTotal: 510, status: "Atenção" },
];

export const dashboardResumo = [
  { label: "Alunos ativos", valor: "128" },
  { label: "Jogos publicados", valor: "24" },
  { label: "Quizzes concluídos", valor: "341" },
  { label: "XP distribuído", valor: "18.6k" },
];

export const roupasDisponiveis = [
  { id: "chapeu-praia", nome: "Chapéu de palha", categoria: "Cabeça", equipado: true },
  { id: "camiseta-mare", nome: "Camiseta Maré", categoria: "Corpo", equipado: true },
  { id: "oculos-sol", nome: "Óculos de sol", categoria: "Cabeça", equipado: false },
  { id: "capa-heroi", nome: "Capa de herói", categoria: "Corpo", equipado: false },
];

export const descricoesCompanheiro = {
  portugues: "Guará vive nos manguezais e adora colecionar palavras novas que encontra pelo caminho.",
  matematica: "Polvo usa seus oito braços pra contar tudo rapidinho — nunca perde uma conta de vista.",
  ciencias: "Tartaruga é curiosa e paciente, sempre voltando pra explorar um pouco mais o fundo do mar.",
};

export const perguntaQuizExemplo = {
  materiaId: "portugues",
  pergunta: "Qual das palavras abaixo é um substantivo próprio?",
  opcoes: ["cidade", "Caraguatatuba", "bonito", "correr"],
  respostaCorreta: 1,
};
