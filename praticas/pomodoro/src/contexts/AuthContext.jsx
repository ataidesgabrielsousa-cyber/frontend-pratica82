// eslint-disable-next-line react-refresh/only-export-components
import { createContext, useContext, useReducer } from 'react';
import { MOCK_USER } from '../constants/auth';

const AuthContext = createContext(null);

// Estado inicial
const initialState = {
  isAuthenticated: sessionStorage.getItem('auth') === 'true',
};

// Reducer com actions LOGIN e LOGOUT
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Tenta realizar login com credenciais mock
  function login(username, password) {
    if (username === MOCK_USER.username && password === MOCK_USER.password) {
      dispatch({ type: 'LOGIN' });
      sessionStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  // Realiza logout e limpa sessão
  function logout() {
    dispatch({ type: 'LOGOUT' });
    sessionStorage.removeItem('auth');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: state.isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}