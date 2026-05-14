import { FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ShieldAlert } from 'lucide-react';

export const Header: FC = () => {
  return (
    <header>
      <div className="logo">
        <ShieldAlert size={32} color="#14F195" />
        Aegis Portfolio Architect
      </div>
      <div>
        <WalletMultiButton />
      </div>
    </header>
  );
};
