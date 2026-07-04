# Studymon — Protótipo (Hackathon)

Hub de jogos educativos gamificado estilo Pokémon. Protótipo 100% frontend,
estado salvo em `localStorage`, sem backend.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Fluxo

1. **Login**: qualquer código (ex: `ABC-1234`) entra como "Joãozinho".
2. **Dashboard**: mostra o perfil, XP da conta e os 3 Studymons (Matemática, História, Ciências).
3. **Batalha de Ginásio**: clique em qualquer pet → quiz de 3 perguntas contra um "chefe".
   Acertar ataca o inimigo; errar causa dano no seu pet.
4. **Vitória**: ganha 500 XP, volta ao hub, o pet sobe de nível (e evolui no nível 5).
   O progresso persiste no localStorage — recarregar a página não perde o avanço.

## Estrutura

```
src/
  components/
    Login.jsx        — tela de login falso
    Dashboard.jsx     — hub principal (header, grid de pets)
    PetCard.jsx       — card individual de cada Studymon
    BattleQuiz.jsx    — máquina de estados da batalha/quiz
    LevelUpModal.jsx  — modal de vitória/evolução
  utils/
    storage.js        — leitura/escrita no localStorage + estado inicial mockado
    quizData.js       — banco de perguntas por matéria
```

## Botão "Resetar progresso"

No header do Dashboard, útil para demonstrar o fluxo do zero de novo na apresentação.
