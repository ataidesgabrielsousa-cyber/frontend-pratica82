import { useAuth } from '../../contexts/AuthContext';

export function Home() {
  const { logout } = useAuth();

  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: '#e6e6e6' }}>
      <h1>🍅 Chronos Pomodoro</h1>
      <p>Você está logado! Aqui entrará o sistema Pomodoro.</p>
      <button
        onClick={logout}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1.5rem',
          backgroundColor: '#e94560',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Sair
      </button>
    </div>
  );
}