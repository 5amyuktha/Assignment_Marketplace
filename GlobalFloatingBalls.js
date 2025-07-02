import React, { useEffect, useRef } from 'react';
import './App.css';

const BALLS_COUNT = 12;
const BALLS_COLORS = ['#3b82f6', '#60a5fa', '#2563eb', '#93c5fd'];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function GlobalFloatingBalls() {
  const ballsRef = useRef([]);

  useEffect(() => {
    let animId;
    const animate = () => {
      ballsRef.current.forEach(ball => {
        if (!ball) return;
        let x = parseFloat(ball.dataset.x);
        let y = parseFloat(ball.dataset.y);
        let dx = parseFloat(ball.dataset.dx);
        let dy = parseFloat(ball.dataset.dy);
        x += dx;
        y += dy;
        if (x < 0 || x > 100) ball.dataset.dx = -dx;
        if (y < 0 || y > 100) ball.dataset.dy = -dy;
        ball.style.left = `${x}%`;
        ball.style.top = `${y}%`;
        ball.dataset.x = x;
        ball.dataset.y = y;
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="global-floating-balls-bg">
      {Array.from({ length: BALLS_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => ballsRef.current[i] = el}
          className="global-floating-ball"
          style={{
            left: `${random(0, 100)}%`,
            top: `${random(0, 100)}%`,
            background: BALLS_COLORS[i % BALLS_COLORS.length],
            width: `${random(80, 160)}px`,
            height: `${random(80, 160)}px`,
            opacity: random(0.08, 0.16),
            filter: 'blur(1.5px)',
          }}
          data-x={random(0, 100)}
          data-y={random(0, 100)}
          data-dx={random(-0.04, 0.04)}
          data-dy={random(-0.03, 0.03)}
        />
      ))}
    </div>
  );
}

export default GlobalFloatingBalls; 