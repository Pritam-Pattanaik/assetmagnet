import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './components/layout/AppRouter';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
