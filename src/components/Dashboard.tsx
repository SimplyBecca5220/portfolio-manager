import { FC, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { AgentAnalysis } from './AgentAnalysis';
import { FrenzyFactor } from './FrenzyFactor';
import { PieChart, Activity, TrendingDown, Layers } from 'lucide-react';

export const Dashboard: FC = () => {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    if (connected && publicKey) {
      setLoading(true);
      // Simulate fetching on-chain data and Jupiter pricing
      setTimeout(() => {
        setMetrics({
          tvl: '$12,450.00',
          blueChipRatio: '45%',
          midCapRatio: '30%',
          degenRatio: '25%',
          riskScore: 'High',
          gasFee: '0.000015 SOL',
          dominantSector: 'AI Memecoins'
        });
        setLoading(false);
      }, 1500);
    } else {
      setMetrics(null);
    }
  }, [connected, publicKey]);

  if (!connected) {
    return (
      <div className="agent-intro">
        <h1>Solana Alpha-Strategist</h1>
        <p>Aegis Portfolio Architect is offline. Connect your wallet to initialize the risk-adjusted rebalancing engine and analyze your on-chain footprint.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="left-column">
        <div className="glass-panel glowing">
          <h2><Activity size={20} className="text-purple" style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Portfolio Health</h2>
          
          {loading ? (
            <div className="spinner"></div>
          ) : metrics ? (
            <>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="text-muted">Est. Net Worth</div>
                  <div className="metric-value">{metrics.tvl}</div>
                </div>
                <div className="metric-card">
                  <div className="text-muted">Aegis Risk Score</div>
                  <div className="metric-value" style={{ color: '#ef4444' }}>{metrics.riskScore}</div>
                </div>
              </div>

              <h3 style={{ marginTop: '24px' }}><PieChart size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Asset Allocation</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Blue Chip (SOL, USDC)</span>
                  <span className="text-muted">{metrics.blueChipRatio}</span>
                </div>
                <div style={{ background: 'var(--border-glass)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: '#3b82f6', width: metrics.blueChipRatio, height: '100%' }}></div>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Mid-Cap (JUP, PYTH)</span>
                  <span className="text-muted">{metrics.midCapRatio}</span>
                </div>
                <div style={{ background: 'var(--border-glass)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: '#f59e0b', width: metrics.midCapRatio, height: '100%' }}></div>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>High-Risk (Memes)</span>
                  <span className="text-muted">{metrics.degenRatio}</span>
                </div>
                <div style={{ background: 'var(--border-glass)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: '#ef4444', width: metrics.degenRatio, height: '100%' }}></div>
                </div>
              </div>

              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ color: '#ef4444', margin: 0, display: 'flex', alignItems: 'center' }}><TrendingDown size={16} style={{ marginRight: '8px' }}/> Alert: Over-Exposure Detected</h4>
                <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
                  Your portfolio shows heavy concentration in <strong>{metrics.dominantSector}</strong>. High correlation across these assets significantly increases drawdown risk during market contractions.
                </p>
              </div>
            </>
          ) : null}
        </div>

        <div style={{ marginTop: '24px' }}>
            <FrenzyFactor />
        </div>
      </div>

      <div className="right-column">
        {loading ? (
           <div className="glass-panel" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div className="spinner"></div>
           </div>
        ) : metrics ? (
           <AgentAnalysis metrics={metrics} />
        ) : null}
      </div>
    </div>
  );
};
