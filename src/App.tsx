import { SolanaWalletProvider } from './WalletProvider';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <SolanaWalletProvider>
      <Header />
      <Dashboard />
    </SolanaWalletProvider>
  );
}

export default App;
