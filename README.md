# Maré do Saber — protótipo visual

```bash
npm install
npm run dev
```
Abre http://localhost:3000

## O que já existe
- **/** — login (mock: qualquer código não-vazio entra)
- **/hub** — trilha com as 3 matérias (Português, Matemática, Ciências)
- **/quiz/[materia]** — quiz-ginásio com HP de você vs. chefe
- **/personagem** — tela dos companheiros
- **/ranking** — ranking geral

Tudo com dados fake em `lib/mockData.js` — é só trocar por dados reais
quando o back existir (schema sugerido na conversa com o Claude).

## Próximo passo natural
Plugar autenticação real (Server Action que lê o código e cria sessão),
e trocar os `imports` de `lib/mockData.js` por leitura do banco nas
páginas Server Component (`hub`, `personagem`, `ranking`).
