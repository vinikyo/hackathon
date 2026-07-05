"use client";

import React, { useState, useEffect, useRef } from 'react';

// Função para gerar matemática aleatória
const generateMathProblem = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return {
    id: Math.random().toString(36).substr(2, 9),
    question: `${num1} + ${num2}`,
    answer: num1 + num2,
    angle: Math.random() * Math.PI * 2,
    distance: 300,
    exploding: false,
  };
};

export default function MathShip({ onBack }) {
  const [asteroids, setAsteroids] = useState([]);
  const [shots, setShots] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const closestAsteroidRef = useRef(null);

  // Função para reiniciar a partida sem recarregar o site inteiro
  const restartGame = () => {
    setAsteroids([]);
    setShots([]);
    setScore(0);
    setGameOver(false);
    setInputValue('');
  };

  // Loop do jogo
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setAsteroids((prev) => {
        let newAsteroids = prev.map((ast) => ({
          ...ast,
          distance: ast.exploding ? ast.distance : ast.distance - 2,
        }));

        if (newAsteroids.some((ast) => ast.distance <= 10)) {
          setGameOver(true);
        }

        if (Math.random() < 0.02 && newAsteroids.length < 5) {
          newAsteroids.push(generateMathProblem());
        }

        return newAsteroids;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameOver]);

  // Encontra o asteroide mais próximo
  const closestAsteroid = [...asteroids]
    .filter(ast => !ast.exploding)
    .sort((a, b) => a.distance - b.distance)[0];

  closestAsteroidRef.current = closestAsteroid;

  // Calcula rotação da nave
  let shipRotation = 0;
  if (closestAsteroid) {
    shipRotation = closestAsteroid.angle * (180 / Math.PI) + 90;
  }

  // Lida com a digitação
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const target = closestAsteroidRef.current;

    if (target && parseInt(value) === target.answer) {
      setAsteroids((prev) => prev.map((ast) =>
        ast.id === target.id ? { ...ast, exploding: true } : ast
      ));

      setInputValue('');

      const shotId = Date.now();
      setShots((prev) => [...prev, { id: shotId, angle: target.angle, distance: target.distance }]);

      setTimeout(() => {
        setAsteroids((prev) => prev.filter((ast) => ast.id !== target.id));
        setShots((prev) => prev.filter((s) => s.id !== shotId));
        setScore((s) => s + 10);
      }, 200);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes flyLaser {
          0% { left: 0; opacity: 1; }
          80% { opacity: 1; transform: scale(1); }
          100% { left: 100%; opacity: 0; transform: scale(3); }
        }
        @keyframes explode {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {gameOver ? (
        <div style={styles.gameOver}>
          <h1>Game Over!</h1>
          <h2>Pontuação Final: {score}</h2>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button style={styles.buttonAction} onClick={restartGame}>Tentar Novamente</button>
            <button style={styles.buttonBack} onClick={onBack}>Voltar ao Menu</button>
          </div>
        </div>
      ) : (
        <>
          <div style={styles.header}>
            <div style={styles.score}>Score: {score}</div>
            <button style={styles.exitButton} onClick={onBack}>Sair do Jogo</button>
          </div>

          <div style={{ ...styles.ship, transform: `translate(-50%, -50%) rotate(${shipRotation}deg)` }}>
            <img 
              src="/studymons/mathShip/nave.png" 
              alt="Nave Espacial" 
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'contain',
                imageRendering: 'pixelated' /* <-- Magia do Pixel Art aqui! */
              }} 
            />
          </div>

          {shots.map(shot => (
            <div key={shot.id} style={{
              position: 'absolute', top: '50%', left: '50%',
              width: `${shot.distance}px`, height: '2px',
              transformOrigin: '0 50%',
              transform: `translateY(-50%) rotate(${shot.angle}rad)`,
              zIndex: 10
            }}>
              <div style={{
                position: 'absolute', top: '-4px', width: '10px', height: '10px',
                backgroundColor: '#0ff', borderRadius: '50%',
                boxShadow: '0 0 10px #0ff, 0 0 20px #0ff',
                animation: 'flyLaser 0.2s linear forwards'
              }} />
            </div>
          ))}

          {asteroids.map((ast) => {
            const x = Math.cos(ast.angle) * ast.distance;
            const y = Math.sin(ast.angle) * ast.distance;
            const isClosest = closestAsteroid && ast.id === closestAsteroid.id;

            return (
              <div
                key={ast.id}
                style={{
                  ...styles.asteroid,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  border: isClosest ? '2px solid #ff4444' : '2px solid gray',
                  backgroundColor: ast.exploding ? '#ff4444' : '#333',
                  animation: ast.exploding ? 'explode 0.2s forwards' : 'none',
                }}
              >
                {ast.question}
              </div>
            );
          })}

          <input
            type="number"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Digite a resposta..."
          />
        </>
      )}
    </div>
  );
}

const styles = {
  container: { 
    position: 'relative', 
    width: '100vw', 
    height: '100vh', 
    backgroundImage: 'url("/studymons/mathShip/fundoEspaco.gif")',
    backgroundSize: 'auto',         /* <-- Agora não estica mais */
    backgroundRepeat: 'repeat',     /* <-- Agora se repete como azulejo */
    imageRendering: 'pixelated',    /* <-- Deixa o fundo de pixel art nítido também */
    backgroundPosition: 'center',
    overflow: 'hidden', 
    color: '#fff', 
    fontFamily: 'sans-serif' 
  },
  header: { position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 30 },
  score: { fontSize: '24px', fontWeight: 'bold' },
  exitButton: { backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
  ship: { position: 'absolute', top: '50%', left: '50%', transition: 'transform 0.1s linear', zIndex: 20 },
  asteroid: { position: 'absolute', top: '50%', left: '50%', padding: '10px 15px', borderRadius: '8px', fontSize: '20px', fontWeight: 'bold', zIndex: 5, boxShadow: '0 4px 6px rgba(0,0,0,0.3)' },
  input: { position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', padding: '15px', fontSize: '24px', borderRadius: '8px', border: 'none', textAlign: 'center', width: '200px', color: '#000', backgroundColor: '#fff', boxShadow: '0 0 15px rgba(255,255,255,0.2)' },
  gameOver: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' },
  buttonAction: { padding: '10px 20px', fontSize: '18px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#00b37e', color: '#fff', fontWeight: 'bold' },
  buttonBack: { padding: '10px 20px', fontSize: '18px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#555', color: '#fff', fontWeight: 'bold' }
};