import { type FC, useState } from 'react';
import { Cpu, Anchor, Tornado, TrendingUp, Shield, Activity, BarChart2 } from 'lucide-react';

interface Props {
  metrics: any;
}

export const AgentAnalysis: FC<Props> = ({ metrics }) => {
  const [activeCore, setActiveCore] = useState<'anchor' | 'vortex'>('anchor');

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2><Cpu size={24} className="text-green" style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Dual-Core Strategist</h2>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Network Gas: <span className="text-green">{metrics.gasFee}</span>
        </div>
      </div>

      {/* Core Toggle */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button 
          onClick={() => setActiveCore('anchor')}
          style={{ 
            flex: 1, 
            padding: '12px', 
            borderRadius: '8px', 
            border: `1px solid ${activeCore === 'anchor' ? '#3b82f6' : 'var(--border-glass)'}`,
            background: activeCore === 'anchor' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
            color: activeCore === 'anchor' ? '#3b82f6' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'inherit',
            fontWeight: 600,
            transition: 'all 0.3s ease'
          }}
        >
          <Anchor size={18} />
          The "Anchor"
        </button>
        <button 
          onClick={() => setActiveCore('vortex')}
          style={{ 
            flex: 1, 
            padding: '12px', 
            borderRadius: '8px', 
            border: `1px solid ${activeCore === 'vortex' ? '#ef4444' : 'var(--border-glass)'}`,
            background: activeCore === 'vortex' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
            color: activeCore === 'vortex' ? '#ef4444' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'inherit',
            fontWeight: 600,
            transition: 'all 0.3s ease'
          }}
        >
          <Tornado size={18} />
          The "Vortex"
        </button>
      </div>

      {/* Dynamic Content based on Core */}
      <div style={{ flex: 1, animation: 'fadeIn 0.3s ease-in-out' }} key={activeCore}>
        {activeCore === 'anchor' ? (
          <div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
              <strong>Focus:</strong> Wealth preservation and compound growth.<br/>
              Executing low-turnover strategies based on Staking yields, TVL, and Asset Correlation to mitigate {metrics.dominantSector} exposure.
            </p>

            <div className="strategies">
              <div className="strategy-item conservative" style={{ borderLeftColor: '#3b82f6' }}>
                <h4>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={18} color="#3b82f6"/> Liquid Staking Rotation</span>
                  <span style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.2)', padding: '4px 8px', borderRadius: '4px', color: '#3b82f6' }}>Low Risk</span>
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                  Move 20% of idle USDC into JupSOL for liquid staking to capture base network yield without impermanent loss.
                  <br/><br/>
                  <strong style={{ color: '#f3f4f6' }}>Metrics:</strong> Expected APY: 8.5% | Correlation: 1.0 to SOL
                </p>
              </div>

              <div className="strategy-item conservative" style={{ borderLeftColor: '#3b82f6' }}>
                <h4>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart2 size={18} color="#3b82f6"/> Blue-Chip Rebalancing</span>
                  <span style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.2)', padding: '4px 8px', borderRadius: '4px', color: '#3b82f6' }}>Low Risk</span>
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                  Harvest yield from DeFi vaults and consolidate into cold-storage SOL to build core position over a 6-month horizon.
                  <br/><br/>
                  <strong style={{ color: '#f3f4f6' }}>Metrics:</strong> TVL Depth: $1.2B | Target Allocation: 60%
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
              <strong>Focus:</strong> Capturing short-term momentum and price inefficiency.<br/>
              Executing high-conviction entries driven by RSI, MACD crossovers, volume spikes, and social frenzy indicators.
            </p>

            <div className="strategies">
              <div className="strategy-item aggressive" style={{ borderLeftColor: '#ef4444' }}>
                <h4>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18} color="#ef4444"/> Momentum Divergence</span>
                  <span style={{ fontSize: '12px', background: 'rgba(239, 68, 68, 0.2)', padding: '4px 8px', borderRadius: '4px', color: '#ef4444' }}>High Conviction</span>
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                  SOL/USDC is testing macro support at ${(metrics.prices?.SOL ? (metrics.prices.SOL * 0.95).toFixed(2) : '145.00')} with anomalous volume spikes. Execute a 48-hour long position targeting a 12% bounce.
                  <br/><br/>
                  <strong style={{ color: '#f3f4f6' }}>Metrics:</strong> 1H RSI: 28 (Oversold) | Vol Spike: +340%
                </p>
              </div>

              <div className="strategy-item aggressive" style={{ borderLeftColor: '#ef4444' }}>
                <h4>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={18} color="#ef4444"/> Sentiment Inefficiency</span>
                  <span style={{ fontSize: '12px', background: 'rgba(239, 68, 68, 0.2)', padding: '4px 8px', borderRadius: '4px', color: '#ef4444' }}>High Risk</span>
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                  Social "Frenzy" index for WIF is peaking while price lags. Initiate a short-term TWAP entry over the next 2 hours to front-run retail momentum.
                  <br/><br/>
                  <strong style={{ color: '#f3f4f6' }}>Metrics:</strong> Social Sentiment: Extreme Greed | MACD: Bullish Cross
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
