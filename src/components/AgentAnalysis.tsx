import { FC } from 'react';
import { ShieldCheck, Scale, Zap, Cpu } from 'lucide-react';

interface Props {
  metrics: any;
}

export const AgentAnalysis: FC<Props> = ({ metrics }) => {
  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2><Cpu size={24} className="text-green" style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Aegis Rebalancing Engine</h2>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Network Gas: <span className="text-green">{metrics.gasFee}</span>
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
        Based on your current {metrics.riskScore.toLowerCase()} risk profile and over-exposure to {metrics.dominantSector}, the Alpha-Strategist has computed three distinct optimization pathways. Current Jupiter DEX liquidity depth is sufficient for all suggested routes.
      </p>

      <div className="strategies">
        {/* Conservative Strategy */}
        <div className="strategy-item conservative">
          <h4>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={18} color="#3b82f6"/> Conservative</span>
            <span style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.2)', padding: '4px 8px', borderRadius: '4px', color: '#3b82f6' }}>Yield & Stake</span>
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.5' }}>
            Rotate 15% of high-risk assets into LSTs (JitoSOL, mSOL). Deploy USDC into Kamino liquidity vaults for stable yield.
            <br/><br/>
            <strong>Expected APY:</strong> 8-12% | <strong>Drawdown Risk:</strong> Low
          </p>
        </div>

        {/* Balanced Strategy */}
        <div className="strategy-item balanced">
          <h4>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Scale size={18} color="#f59e0b"/> Balanced</span>
            <span style={{ fontSize: '12px', background: 'rgba(245, 158, 11, 0.2)', padding: '4px 8px', borderRadius: '4px', color: '#f59e0b' }}>Index Holding</span>
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.5' }}>
            Consolidate memecoin fragmentation into top-tier narrative leaders. Maintain 40% SOL, 30% USDC, 30% Mid-Cap ecosystem tokens (JUP, PYTH).
            <br/><br/>
            <strong>Expected APY:</strong> Market Avg | <strong>Drawdown Risk:</strong> Medium
          </p>
        </div>

        {/* Aggressive Strategy */}
        <div className="strategy-item aggressive">
          <h4>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} color="#ef4444"/> Aggressive</span>
            <span style={{ fontSize: '12px', background: 'rgba(239, 68, 104, 0.2)', padding: '4px 8px', borderRadius: '4px', color: '#ef4444' }}>Momentum Trading</span>
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.5' }}>
            Leverage over-exposure. Set trailing stop-losses on current AI runners via Jupiter Limit Orders. Re-allocate 10% into emerging early-stage unlisted SPL tokens monitored by the Aegis crawler.
            <br/><br/>
            <strong>Expected APY:</strong> Variable (High) | <strong>Drawdown Risk:</strong> Severe
          </p>
        </div>
      </div>
    </div>
  );
};
