import { type FC, useState } from 'react';
import { Lock, Unlock, Zap } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

export const FrenzyFactor: FC = () => {
  const { connected } = useWallet();
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnlock = () => {
    if (!connected) return;
    setLoading(true);
    // Simulate transaction delay
    setTimeout(() => {
      setUnlocked(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="glass-panel frenzy-box" style={{ padding: '32px 24px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        {unlocked ? (
          <Unlock size={48} color="#14F195" />
        ) : (
          <Lock size={48} color="#9945FF" />
        )}
      </div>
      
      <h3 style={{ marginBottom: '8px' }}>The "Frenzy" Factor</h3>
      
      {!unlocked ? (
        <>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
            Purchase the Agent's exclusive <strong>Strategy Prompt</strong>. Get real-time, unredacted performance insights and exact entry/exit nodes for current market anomalies.
          </p>
          <button className="btn-primary" onClick={handleUnlock} disabled={loading || !connected}>
            {loading ? <span className="spinner" style={{ width: '20px', height: '20px', margin: 0, borderWidth: '2px' }}></span> : <Zap size={18} />}
            {loading ? 'Processing Transaction...' : 'Unlock Premium Alpha (0.1 SOL)'}
          </button>
        </>
      ) : (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <div style={{ background: 'rgba(20, 241, 149, 0.1)', border: '1px solid #14F195', borderRadius: '8px', padding: '16px', textAlign: 'left', marginTop: '16px' }}>
            <h4 style={{ color: '#14F195', margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>System Decrypted</h4>
            <p style={{ fontFamily: 'monospace', fontSize: '13px', color: 'var(--text-main)', margin: 0, lineHeight: '1.6' }}>
              &gt; DETECTED: Implied volatility spike on $BONK.<br/>
              &gt; ACTION: Execute TWAP sell 25% of holdings over next 4 hours.<br/>
              &gt; ALLOCATE: Rotate capital to $JUP staking vault (Current APR: 14.2%).<br/>
              &gt; WAIT: Macro resistance at $165 SOL. Do not front-run.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
