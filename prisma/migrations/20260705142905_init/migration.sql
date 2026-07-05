-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "codigoAcesso" TEXT NOT NULL,
    "xpTotal" INTEGER NOT NULL DEFAULT 0,
    "nivelConta" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "companheiro" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "nivelMinimoCombate" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "ProgressoMateria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoId" INTEGER NOT NULL,
    "materiaId" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "estagioEvolucao" TEXT NOT NULL DEFAULT 'baby',
    CONSTRAINT "ProgressoMateria_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgressoMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "escola" TEXT NOT NULL DEFAULT 'Escola Elefante Letrado',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "HistoricoJogo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoId" INTEGER NOT NULL,
    "materiaId" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "acertou" BOOLEAN NOT NULL DEFAULT false,
    "pontos" INTEGER NOT NULL DEFAULT 0,
    "xpGanho" INTEGER NOT NULL DEFAULT 0,
    "jogadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HistoricoJogo_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HistoricoJogo_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_codigoAcesso_key" ON "Aluno"("codigoAcesso");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressoMateria_alunoId_materiaId_key" ON "ProgressoMateria"("alunoId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");
