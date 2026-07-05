# 🐾 StudyMons — Maré do Saber

Plataforma educativa gamificada: o aluno estuda matérias, evolui companheiros
(Studymons), joga minigames e sobe no ranking da turma. O gestor (professor)
acompanha tudo por um painel próprio.

Feito com **Next.js 14** (App Router) + **Prisma** + **SQLite**.

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou mais recente instalado
- Nenhum banco de dados externo é necessário — o Prisma usa **SQLite**,
  que é só um arquivo local (`prisma/dev.db`), sem servidor e sem configuração.

---

## 🚀 Como rodar o projeto (primeira vez)

Na pasta do projeto, rode os comandos abaixo **em ordem**, no terminal:

```bash
# 1. Instala as dependências
npm install

# 2. Cria o banco de dados local e as tabelas
npx prisma migrate dev --name init

# 3. Popula o banco com dados de exemplo (alunos, matérias, gestor)
npx prisma db seed

# 4. Inicia o servidor de desenvolvimento
npm run dev
```

Depois disso, abra **http://localhost:3000** no navegador. 🎉

> Nas próximas vezes que for rodar o projeto, basta `npm run dev` — os passos
> 1 a 3 só são necessários na primeira vez (ou quando o schema mudar, veja abaixo).

---

## 🔑 Logins de exemplo (criados pelo seed)

**Gestor (professor)**
| E-mail | Senha |
|---|---|
| `professor@escola.com` | `senha123` |

**Aluno** — entra só com o código, sem senha:
| Nome | Código |
|---|---|
| Você | `7841-2241` |
| Rafaela A | `1111-1111` |
| Julia J | `2222-2222` |
| Carlos A | `3333-3333` |
| Maria A | `4444-4444` |
| Bruno Mars | `5555-5555` |

---

## 🗺️ Rotas principais

| Rota | O que é |
|---|---|
| `/` | Tela inicial — escolher "Sou aluno" ou "Sou gestor" |
| `/login/aluno` | Login do aluno (por código) |
| `/login/gestor` | Login do gestor (e-mail + senha) |
| `/dashboard` | Painel do gestor |
| `/jogos` | Catálogo de minigames |
| `/jogos/[id]` | Tela de um minigame específico |
| `/studymons` | Companheiros (Studymons) do aluno |
| `/combate` | Combate por quiz (ganha XP de verdade) |
| `/ranking` | Ranking dos alunos por XP |
| `/perfil` | Perfil do aluno |

---

## 🖼️ Imagens que faltam

Estas pastas têm um arquivo `.txt` avisando o que deve ser colocado nelas:

- `public/jogos/` → capas dos minigames
- `public/studymons/` → imagens dos companheiros

O projeto funciona sem elas (com placeholders), mas fica mais bonito com as
imagens reais no lugar.

---

## 🔧 Problemas comuns

**Erro "PrismaClient" ou "Cannot find module '@prisma/client'"**
```bash
npx prisma generate
```

**Quero apagar tudo e recomeçar o banco do zero**
```bash
npx prisma migrate reset
```
Isso apaga o banco, recria as tabelas e roda o seed automaticamente
(responda `y` quando ele perguntar).

**Já tinha o banco de uma versão bem antiga do projeto**
Se faltar a coluna `acertou` no histórico, rode:
```bash
npx prisma migrate dev --name historico_acertou
```

---

## 📦 O que já é real (vem do banco) vs. o que ainda é mock

**Real (banco de dados via Prisma):**
- Login do aluno (valida o código no banco)
- Login do gestor (e-mail + senha, com hash seguro)
- XP das batalhas (`/combate`): vencer salva XP no progresso da matéria,
  no total do aluno e no histórico
- Ranking (`/ranking`): lê os alunos do banco, ordenados por XP

**Ainda mock (dados fixos em `lib/mockData.js`)**
- Catálogo de Jogos e Meus Studymons — não era prioridade no tempo do
  hackathon, mas dá pra migrar para o banco depois, seguindo o mesmo padrão
  usado no combate e no ranking.

---

## 🧱 Estrutura do projeto

```
app/                 Rotas (App Router do Next.js)
  login/aluno/       Login do aluno
  login/gestor/      Login do gestor
  dashboard/         Painel do gestor
  jogos/             Catálogo e tela de cada minigame
  studymons/         Companheiros do aluno
  combate/           Combate por quiz (XP real)
  ranking/           Ranking geral
  perfil/            Perfil do aluno
  actions.js         Server Actions (login, XP, etc.)
components/          Componentes reutilizáveis e minigames
lib/                 Prisma client, autenticação, dados mock, dados dos jogos
prisma/
  schema.prisma      Modelo do banco de dados
  seed.js            Dados de exemplo (alunos, matérias, gestor)
public/              Imagens e arquivos estáticos
```
