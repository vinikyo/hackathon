// Dados fictícios para o hackaton. A estrutura já está pronta para trocar
// os mocks por respostas reais de backend quando o fluxo de escola existir.

export const contaAluno = {
  nome: "Você",
  turma: "5º A",
  ano: "5º ano",
  xpTotal: 760,
  codigo: "7841-2241",
  foto: null, // troque por "/studymons/aluno.png"
};

// Cada matéria tem 1 criatura FIXA (decisão do modelo de dados).
// Os campos sprite* apontam pros PNGs que você vai colocar em /public/studymons.
export const materias = [
  {
    id: "portugues",
    nome: "Português",
    companheiro: "Coelho",
    cor: "coral",
    nivel: 3,
    xp: 420,
    xpProximoNivel: 600,
    liberado: true,
    nivelMinimoCombate: 1,
    descricao: "Um coelho curioso que adora colecionar palavras novas pelo caminho.",
    sprite: null,       // ex: "/studymons/coelho.png"
    spriteLivro: null,  // arte no livro (pokédex)
    questoesPct: 65,
    acertosPct: 48,
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
    nivelMinimoCombate: 3,
    descricao: "Com oito braços, esse polvo conta tudo rapidinho e nunca perde a conta.",
    sprite: null,
    spriteLivro: null,
    questoesPct: 40,
    acertosPct: 55,
  },
  {
    id: "ciencias",
    nome: "Ciências",
    companheiro: "Sapo",
    cor: "marigold",
    nivel: 1,
    xp: 80,
    xpProximoNivel: 200,
    liberado: false,
    nivelMinimoCombate: 2,
    descricao: "Um sapo tranquilo e curioso, sempre explorando um pouco mais o ambiente.",
    sprite: null,
    spriteLivro: null,
    questoesPct: 70,
    acertosPct: 46,
  },
];

export const rankingSala = [
  { nome: "Rafaela A", turma: "5º A", xpTotal: 25, foto: null },
  { nome: "Julia J", turma: "5º A", xpTotal: 20, foto: null },
  { nome: "Carlos A", turma: "5º A", xpTotal: 15, foto: null },
  { nome: "Maria A", turma: "5º A", xpTotal: 15, foto: null },
  { nome: "Bruno Mars", turma: "5º A", xpTotal: 12, foto: null },
  { nome: contaAluno.nome, turma: contaAluno.turma, xpTotal: 10, souEu: true, foto: null },
];

export const jogos = [
  // Os 5 jogos abaixo são REAIS — componentes React portados da branch
  // main, renderizados em /jogos/[id]. O campo "componente" indica qual
  // jogo abrir (mapeado em app/jogos/[id]/page.js).
  {
    id: "math-ship",
    componente: "mathShip",
    titulo: "Math Ship",
    materiaId: "matematica",
    materia: "Matemática",
    ano: "5º ano",
    bncc: "EF05MA03",
    destaque: true,
    cor: "teal",
    capa: "MAT",
    trilha: "Cálculo rápido",
    descricao: "Sobreviva no espaço resolvendo cálculos antes que os asteroides destruam sua nave.",
  },
  {
    id: "ciensapo",
    componente: "ciensapo",
    titulo: "Ciensapo",
    materiaId: "ciencias",
    materia: "Ciências",
    ano: "5º ano",
    bncc: "EF05CI04",
    destaque: true,
    cor: "marigold",
    capa: "🐸",
    trilha: "Quiz com tempo",
    descricao: "Responda perguntas de ciências contra o relógio e ajude o sapo a atravessar.",
  },
  {
    id: "roda-da-preguica",
    componente: "rodaDaPreguica",
    titulo: "Roda da Preguiça",
    materiaId: "portugues",
    materia: "Português",
    ano: "5º ano",
    bncc: "EF15LP03",
    destaque: true,
    cor: "coral",
    capa: "🦥",
    trilha: "Palavras e cultura",
    descricao: "Gire a roda, leia a dica e adivinhe a palavra sobre a cultura do Brasil.",
  },
  {
    id: "adivinha-paises",
    componente: "adivinacao",
    titulo: "Adivinhação de Países",
    materiaId: "geografia",
    materia: "Geografia",
    ano: "5º ano",
    bncc: "EF05GE01",
    destaque: false,
    cor: "ocean",
    capa: "GEO",
    trilha: "Mundo",
    descricao: "Use as pistas de continente, população e idioma pra descobrir o país secreto.",
  },
  {
    id: "cores-magicas",
    componente: "artGame",
    titulo: "Cores Mágicas",
    materiaId: "arte",
    materia: "Arte",
    ano: "5º ano",
    bncc: "EF15AR02",
    destaque: false,
    cor: "violet",
    capa: "ART",
    trilha: "Teoria das cores",
    descricao: "Misture cores primárias pra pintar as imagens do jeito certo.",
  },
  {
    id: "word-search-en",
    componente: "wordSearch",
    titulo: "Word Search",
    materiaId: "ingles",
    materia: "Inglês",
    ano: "5º ano",
    bncc: "EF05LI02",
    destaque: true,
    cor: "ocean",
    capa: "ABC",
    trilha: "Vocabulary",
    descricao: "Ache as palavras em inglês escondidas no caça-palavras e aprenda o vocabulário.",
  },
  {
    id: "erer-lacunas",
    componente: "fillBlanks",
    titulo: "Preencha as Lacunas — ERER",
    materiaId: "erer",
    materia: "ERER",
    ano: "5º ano",
    bncc: "Lei 10.639/2003",
    destaque: true,
    cor: "marigold",
    capa: "ERER",
    trilha: "Etnia e história",
    descricao: "Complete os textos sobre história e cultura afro-brasileira e indígena.",
  },

  // Vitrine "em breve": servem pra popular as linhas e habilitar o scroll.
  // Não são clicáveis (só o 1º de cada linha leva ao jogo).
  { id: "mat-2", componente: null, titulo: "Tabuada Espacial", materiaId: "matematica", materia: "Matemática", ano: "5º ano", bncc: "EF05MA07", destaque: false, cor: "teal", capa: "MAT", trilha: "Em breve", descricao: "Em breve." },
  { id: "mat-3", componente: null, titulo: "Fração Frutas", materiaId: "matematica", materia: "Matemática", ano: "5º ano", bncc: "EF05MA03", destaque: false, cor: "teal", capa: "MAT", trilha: "Em breve", descricao: "Em breve." },
  { id: "port-2", componente: null, titulo: "Caça-Rimas", materiaId: "portugues", materia: "Português", ano: "5º ano", bncc: "EF15LP16", destaque: false, cor: "coral", capa: "POR", trilha: "Em breve", descricao: "Em breve." },
  { id: "port-3", componente: null, titulo: "Sílaba Certa", materiaId: "portugues", materia: "Português", ano: "5º ano", bncc: "EF05LP01", destaque: false, cor: "coral", capa: "POR", trilha: "Em breve", descricao: "Em breve." },
  { id: "cie-2", componente: null, titulo: "Ecossistema", materiaId: "ciencias", materia: "Ciências", ano: "5º ano", bncc: "EF05CI03", destaque: false, cor: "marigold", capa: "CIE", trilha: "Em breve", descricao: "Em breve." },
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
