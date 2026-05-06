import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viewMode, setViewMode] = useState('login');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  // Limpa mensagem de erro automaticamente após 3 segundos
  useEffect(() => {
    if (feedback && feedbackType === 'error') {
      const timer = setTimeout(() => {
        setFeedback('');
        setFeedbackType('');
      }, 3000);

      // Limpeza do efeito ao desmontar ou quando feedback mudar
      return () => clearTimeout(timer);
    }
  }, [feedback, feedbackType]);

  function handleSubmit(e) {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      setFeedback('Login realizado com sucesso! Redirecionando...');
      setFeedbackType('success');
      setTimeout(() => navigate('/home'), 1000);
    } else {
      setFeedback('Usuário ou senha incorretos. Tente novamente.');
      setFeedbackType('error');
    }
  }

  if (viewMode === 'cadastro') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Cadastro</h2>
          <p className={styles.simulacao}>🚧 Fluxo de cadastro ainda será implementado.</p>
          <button className={styles.linkButton} onClick={() => setViewMode('login')}>
            Voltar ao login
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'recuperar') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Recuperar Senha</h2>
          <p className={styles.simulacao}>🚧 Fluxo de recuperação de senha ainda será implementado.</p>
          <button className={styles.linkButton} onClick={() => setViewMode('login')}>
            Voltar ao login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🍅 Chronos Pomodoro</h1>
        <h2 className={styles.subtitle}>Entrar</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username">E-mail ou usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="seu@email.com"
              autoFocus
              aria-label="Campo de e-mail ou usuário"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              aria-label="Campo de senha"
            />
          </div>

          {feedback && (
            <p
              className={feedbackType === 'success' ? styles.success : styles.error}
              role="alert"
              aria-live="polite"
            >
              {feedback}
            </p>
          )}

          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>

        <div className={styles.links}>
          <button className={styles.linkButton} onClick={() => setViewMode('cadastro')}>
            Não tem conta? Cadastre-se
          </button>
          <button className={styles.linkButton} onClick={() => setViewMode('recuperar')}>
            Esqueci minha senha
          </button>
        </div>
      </div>
    </div>
  );
}