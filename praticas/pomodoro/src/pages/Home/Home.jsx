import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Home.module.css';

const MODES = {
  pomodoro: { label: 'Pomodoro', time: 25 * 60 },
  shortBreak: { label: 'Pausa curta', time: 5 * 60 },
  longBreak: { label: 'Pausa longa', time: 15 * 60 },
};

export function Home() {
  const { logout } = useAuth();
  const [mode, setMode] = useState('pomodoro');
  const [secondsLeft, setSecondsLeft] = useState(MODES.pomodoro.time);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  useEffect(() => {
    setIsRunning(false);
    setSecondsLeft(MODES[mode].time);
  }, [mode]);

  useEffect(() => {
    if (!isRunning) return;
    if (secondsLeft === 0) {
      setIsRunning(false);
      if (mode === 'pomodoro') {
        setPomodorosCompleted((prev) => prev + 1);
      }
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode]);

  function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(MODES[mode].time);
  }

  const total = MODES[mode].time;
  const progress = (secondsLeft / total) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>Chronos Pomodoro</h1>
        <button className={styles.btnLogout} onClick={logout}>
          Sair
        </button>
      </header>

      <div className={styles.modes}>
        {Object.entries(MODES).map(([key, val]) => (
          <button
            key={key}
            className={mode === key ? styles.modeActive : styles.modeBtn}
            onClick={() => setMode(key)}
          >
            {val.label}
          </button>
        ))}
      </div>

      <div className={styles.timerWrapper}>
        <svg className={styles.ring} viewBox="0 0 280 280">
          <circle
            cx="140" cy="140" r={radius}
            fill="none"
            stroke="#0f3460"
            strokeWidth="8"
          />
          <circle
            cx="140" cy="140" r={radius}
            fill="none"
            stroke="#e94560"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 140 140)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className={styles.timerText}>
          <span className={styles.timer}>{formatTime(secondsLeft)}</span>
          <span className={styles.modeLabel}>{MODES[mode].label}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.btnReset} onClick={handleReset} title="Reiniciar">
          &#8635;
        </button>
        <button className={styles.btnStart} onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          className={styles.btnSkip}
          onClick={() => setSecondsLeft(0)}
          title="Pular"
        >
          &#9197;
        </button>
      </div>

      <div className={styles.pomodoroCount}>
        <span className={styles.countLabel}>Pomodoros concluidos hoje</span>
        <div className={styles.dots}>
          {Array.from({ length: Math.max(4, pomodorosCompleted) }).map((_, i) => (
            <span
              key={i}
              className={i < pomodorosCompleted ? styles.dotFilled : styles.dot}
            />
          ))}
        </div>
      </div>

    </div>
  );
}