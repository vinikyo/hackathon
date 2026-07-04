export const QUIZ_BANK = {
  matematica: {
    enemyName: "Golem de Pedra",
    enemySprite: "🗿",
    questions: [
      { text: "Quanto é 7 x 8?", options: ["54", "56", "58", "49"], correct: 1 },
      { text: "Quanto é 144 ÷ 12?", options: ["11", "10", "12", "14"], correct: 2 },
      { text: "Qual é a raiz quadrada de 81?", options: ["8", "9", "7", "10"], correct: 1 },
    ],
  },
  historia: {
    enemyName: "Fantasma Medieval",
    enemySprite: "👻",
    questions: [
      {
        text: "Em que ano foi proclamada a Independência do Brasil?",
        options: ["1808", "1822", "1889", "1500"],
        correct: 1,
      },
      {
        text: "Quem foi o primeiro imperador do Brasil?",
        options: ["Dom João VI", "Dom Pedro I", "Dom Pedro II", "Getúlio Vargas"],
        correct: 1,
      },
      {
        text: "A Proclamação da República ocorreu em qual ano?",
        options: ["1889", "1822", "1500", "1930"],
        correct: 0,
      },
    ],
  },
  ciencias: {
    enemyName: "Vírus Mutante",
    enemySprite: "🦠",
    questions: [
      {
        text: "Qual é o órgão responsável por bombear sangue?",
        options: ["Pulmão", "Coração", "Fígado", "Rim"],
        correct: 1,
      },
      {
        text: "Quantos ossos tem o corpo humano adulto?",
        options: ["206", "150", "300", "180"],
        correct: 0,
      },
      {
        text: "Qual gás os humanos exalam ao respirar?",
        options: ["Oxigênio", "Nitrogênio", "Gás carbônico", "Hidrogênio"],
        correct: 2,
      },
    ],
  },
};
