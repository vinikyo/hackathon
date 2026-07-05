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
  portugues: {
    enemyName: "Corvo Tagarela",
    enemySprite: "🐦",
    questions: [
      {
        text: "Qual das palavras abaixo é um substantivo próprio?",
        options: ["cidade", "Caraguatatuba", "bonito", "correr"],
        correct: 1,
      },
      {
        text: "Qual é o plural de 'pão'?",
        options: ["pãos", "pães", "pões", "pans"],
        correct: 1,
      },
      {
        text: "Qual palavra está escrita corretamente?",
        options: ["viajem (o passeio)", "viagem (o passeio)", "vyagem", "viajenn"],
        correct: 1,
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
  ingles: {
    enemyName: "Papagaio Falante",
    enemySprite: "🦜",
    questions: [
      {
        text: "Como se diz 'gato' em inglês?",
        options: ["Dog", "Cat", "Cow", "Duck"],
        correct: 1,
      },
      {
        text: "Qual é a cor 'blue' em português?",
        options: ["Verde", "Vermelho", "Azul", "Amarelo"],
        correct: 2,
      },
      {
        text: "O que significa 'apple'?",
        options: ["Banana", "Maçã", "Uva", "Laranja"],
        correct: 1,
      },
      {
        text: "Como se diz 'obrigado' em inglês?",
        options: ["Please", "Sorry", "Hello", "Thank you"],
        correct: 3,
      },
    ],
  },
  erer: {
    enemyName: "Guardião da História",
    enemySprite: "🐎",
    questions: [
      {
        text: "O que era o Quilombo dos Palmares?",
        options: [
          "Uma fazenda de café",
          "Uma comunidade de pessoas que resistiram à escravidão",
          "Uma cidade europeia",
          "Um navio",
        ],
        correct: 1,
      },
      {
        text: "Quem foi um importante líder de Palmares?",
        options: ["Zumbi", "Pedro Álvares Cabral", "Dom Pedro I", "Tiradentes"],
        correct: 0,
      },
      {
        text: "O que se celebra em 20 de novembro?",
        options: [
          "Dia da Independência",
          "Dia da Consciência Negra",
          "Dia do Trabalho",
          "Dia das Crianças",
        ],
        correct: 1,
      },
      {
        text: "Os povos indígenas viviam no Brasil...",
        options: [
          "Depois de 1900",
          "Antes da chegada dos portugueses",
          "Só no sul do país",
          "Apenas nas cidades",
        ],
        correct: 1,
      },
    ],
  },
  arte: {
    enemyName: "Fera das Cores",
    enemySprite: "🐆",
    questions: [
      {
        text: "Quais são as três cores primárias?",
        options: [
          "Verde, laranja e roxo",
          "Vermelho, azul e amarelo",
          "Preto, branco e cinza",
          "Rosa, marrom e bege",
        ],
        correct: 1,
      },
      {
        text: "Azul misturado com amarelo forma qual cor?",
        options: ["Verde", "Roxo", "Laranja", "Marrom"],
        correct: 0,
      },
      {
        text: "Vermelho misturado com azul forma qual cor?",
        options: ["Verde", "Roxo", "Laranja", "Cinza"],
        correct: 1,
      },
      {
        text: "Como chamamos cores como preto, branco e cinza?",
        options: ["Cores quentes", "Cores neutras", "Cores primárias", "Cores frias"],
        correct: 1,
      },
    ],
  },
  geografia: {
    enemyName: "Espírito do Cerrado",
    enemySprite: "🐺",
    questions: [
      {
        text: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        correct: 2,
      },
      {
        text: "Quantos estados o Brasil tem?",
        options: ["26", "27", "25", "30"],
        correct: 0,
      },
      {
        text: "Qual é o maior rio do Brasil?",
        options: ["Rio Tietê", "Rio São Francisco", "Rio Amazonas", "Rio Paraná"],
        correct: 2,
      },
      {
        text: "Em qual região fica o estado de São Paulo?",
        options: ["Norte", "Nordeste", "Sudeste", "Sul"],
        correct: 2,
      },
    ],
  },
  historia: {
    enemyName: "Sentinela do Tempo",
    enemySprite: "🐢",
    questions: [
      {
        text: "Em que ano foi proclamada a Independência do Brasil?",
        options: ["1500", "1822", "1889", "1922"],
        correct: 1,
      },
      {
        text: "Quem 'descobriu' o Brasil, segundo a história oficial?",
        options: [
          "Cristóvão Colombo",
          "Pedro Álvares Cabral",
          "Dom Pedro II",
          "Vasco da Gama",
        ],
        correct: 1,
      },
      {
        text: "Em que ano o Brasil foi 'descoberto' pelos portugueses?",
        options: ["1500", "1492", "1600", "1450"],
        correct: 0,
      },
      {
        text: "O que foi a Proclamação da República em 1889?",
        options: [
          "O fim da escravidão",
          "A mudança de império para república",
          "A independência de Portugal",
          "O início da Copa do Mundo",
        ],
        correct: 1,
      },
    ],
  },
};
