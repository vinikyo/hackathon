// Popula o banco com dados iniciais. Roda com: npx prisma db seed
// (ou: node prisma/seed.js). Os dados batem com o que o front já mostrava.

const { PrismaClient } = require("@prisma/client");
const { scryptSync, randomBytes } = require("crypto");
const prisma = new PrismaClient();

// Mesmo esquema de hash usado em lib/auth.js ("salt:hash" em hex),
// reimplementado aqui porque este script roda via CommonJS (require),
// e lib/auth.js é ESM.
function hashSenha(senha) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  // Limpa (ordem importa por causa das relações)
  await prisma.historicoJogo.deleteMany();
  await prisma.progressoMateria.deleteMany();
  await prisma.aluno.deleteMany();
  await prisma.materia.deleteMany();
  await prisma.professor.deleteMany();

  // Professor/gestor de demonstração — login: professor@escola.com / senha123
  await prisma.professor.create({
    data: {
      nome: "Prof. Ana",
      email: "professor@escola.com",
      senhaHash: hashSenha("senha123"),
      escola: "Escola Elefante Letrado",
    },
  });

  // Matérias (criatura fixa por matéria)
  const materias = [
    { id: "matematica", nome: "Matemática", companheiro: "Calcuelho", descricao: "Um coelho que conta tudo rapidinho e nunca perde a conta.", nivelMinimoCombate: 3 },
    { id: "portugues", nome: "Português", companheiro: "Bicho-preguiça", descricao: "Sem pressa, adora colecionar palavras novas pelo caminho.", nivelMinimoCombate: 1 },
    { id: "ciencias", nome: "Ciências", companheiro: "Sapo", descricao: "Curioso e tranquilo, sempre explorando o ambiente ao redor.", nivelMinimoCombate: 2 },
    { id: "ingles", nome: "Inglês", companheiro: "Águia-careca", descricao: "De olhar afiado, enxerga cada palavra em inglês de longe.", nivelMinimoCombate: 2 },
    { id: "erer", nome: "ERER", companheiro: "Cavalo", descricao: "Forte e livre, carrega histórias e culturas por onde passa.", nivelMinimoCombate: 2 },
    { id: "arte", nome: "Arte", companheiro: "Onça-pintada", descricao: "Cheia de cores e padrões, é pura criatividade em movimento.", nivelMinimoCombate: 2 },
    { id: "geografia", nome: "Geografia", companheiro: "Lobo-guará", descricao: "Percorre grandes distâncias e conhece cada canto do território.", nivelMinimoCombate: 2 },
    { id: "historia", nome: "História", companheiro: "Tartaruga", descricao: "Vive muito tempo e guarda a memória de tudo que aconteceu.", nivelMinimoCombate: 2 },
  ];
  for (const m of materias) await prisma.materia.create({ data: m });

  // Alunos da sala (o primeiro é o "Você" que loga com o código 7841-2241)
  const alunos = [
    { nome: "Você", turma: "5º A", matricula: "2024001", codigoAcesso: "7841-2241", xpTotal: 10, nivelConta: 3 },
    { nome: "Rafaela A", turma: "5º A", matricula: "2024002", codigoAcesso: "1111-1111", xpTotal: 25, nivelConta: 4 },
    { nome: "Julia J", turma: "5º A", matricula: "2024003", codigoAcesso: "2222-2222", xpTotal: 20, nivelConta: 3 },
    { nome: "Carlos A", turma: "5º A", matricula: "2024004", codigoAcesso: "3333-3333", xpTotal: 15, nivelConta: 2 },
    { nome: "Maria A", turma: "5º A", matricula: "2024005", codigoAcesso: "4444-4444", xpTotal: 15, nivelConta: 2 },
    { nome: "Bruno Mars", turma: "5º A", matricula: "2024006", codigoAcesso: "5555-5555", xpTotal: 12, nivelConta: 2 },
  ];

  for (const a of alunos) {
    const aluno = await prisma.aluno.create({ data: a });
    // Progresso inicial em cada matéria
    const niveis = { matematica: 2, portugues: 3, ciencias: 1, ingles: 2, erer: 1, arte: 2, geografia: 1, historia: 2 };
    const xps = { matematica: 260, portugues: 420, ciencias: 80, ingles: 200, erer: 90, arte: 180, geografia: 60, historia: 150 };
    for (const m of materias) {
      await prisma.progressoMateria.create({
        data: {
          alunoId: aluno.id,
          materiaId: m.id,
          xp: aluno.nome === "Você" ? xps[m.id] : Math.floor(Math.random() * 300),
          nivel: aluno.nome === "Você" ? niveis[m.id] : 1 + Math.floor(Math.random() * 3),
        },
      });
    }
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
