import { type FC, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { AgentAnalysis } from './AgentAnalysis';
import { FrenzyFactor } from './FrenzyFactor';
import { PieChart, Activity, TrendingDown, Layers } from 'lucide-react';

const MINTS = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  WIF: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm'
};

export const Dashboard: FC = () => {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    if (connected && publicKey) {
      setLoading(true);
      
      const fetchPrices = async () => {
        try {
          const ids = Object.values(MINTS).join(',');
          const response = await fetch(`https://api.jup.ag/price/v3?ids=${ids}`);
          const data = await response.json();
          
          const getPrice = (mint: string) => data[mint]?.usdPrice || 0;

          const pSOL = getPrice(MINTS.SOL);
          const pUSDC = getPrice(MINTS.USDC);
          const pJUP = getPrice(MINTS.JUP);
          const pBONK = getPrice(MINTS.BONK);
          const pWIF = getPrice(MINTS.WIF);

          // Simulated balances combined with LIVE prices
          const balances = {
            SOL: 45,
            JUP: 1500,
            USDC: 2000,
            BONK: 150000000,
            WIF: 500
          };

          const solValue = balances.SOL * pSOL;
          const usdcValue = balances.USDC * pUSDC;
          const jupValue = balances.JUP * pJUP;
          const degenValue = (balances.BONK * pBONK) + (balances.WIF * pWIF);
          
          const totalValue = solValue + usdcValue + jupValue + degenValue;
          
          setMetrics({
            tvl: '$' + totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            blueChipRatio: ((solValue + usdcValue) / totalValue * 100).toFixed(1) + '%',
            blueChipRaw: (solValue + usdcValue) / totalValue * 100,
            midCapRatio: (jupValue / totalValue * 100).toFixed(1) + '%',
            midCapRaw: jupValue / totalValue * 100,
            degenRatio: (degenValue / totalValue * 100).toFixed(1) + '%',
            degenRaw: degenValue / totalValue * 100,
            riskScore: degenValue / totalValue > 0.2 ? 'High' : 'Moderate',
            gasFee: 'Live Tracker',
            dominantSector: degenValue > jupValue ? 'Memecoins' : 'DeFi',
            prices: {
                SOL: pSOL,
                JUP: pJUP,
                BONK: pBONK,
                WIF: pWIF
            }
          });
        } catch (error) {
          console.error("Failed to fetch from Jupiter API:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPrices();
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

              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span className="text-muted">Live Jupiter Prices:</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  <span>SOL: <strong className="text-green">${metrics.prices.SOL.toFixed(2)}</strong></span>
                  <span>JUP: <strong className="text-green">${metrics.prices.JUP.toFixed(3)}</strong></span>
                  <span>WIF: <strong className="text-green">${metrics.prices.WIF.toFixed(3)}</strong></span>
                  <span>BONK: <strong className="text-green">${metrics.prices.BONK.toFixed(7)}</strong></span>
                </div>
              </div>

              <h3 style={{ marginTop: '24px' }}><PieChart size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Asset Allocation</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Blue Chip (SOL, USDC)</span>
                  <span className="text-muted">{metrics.blueChipRatio}</span>
                </div>
                <div style={{ background: 'var(--border-glass)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: '#3b82f6', width: `${metrics.blueChipRaw}%`, height: '100%', transition: 'width 1s ease' }}></div>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Mid-Cap (JUP, PYTH)</span>
                  <span className="text-muted">{metrics.midCapRatio}</span>
                </div>
                <div style={{ background: 'var(--border-glass)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: '#f59e0b', width: `${metrics.midCapRaw}%`, height: '100%', transition: 'width 1s ease' }}></div>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>High-Risk (Memes)</span>
                  <span className="text-muted">{metrics.degenRatio}</span>
                </div>
                <div style={{ background: 'var(--border-glass)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: '#ef4444', width: `${metrics.degenRaw}%`, height: '100%', transition: 'width 1s ease' }}></div>
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
