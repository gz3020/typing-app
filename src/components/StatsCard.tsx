import React from 'react';
import './StatsCard.css';

interface Props {
  icon: string;
  label: string;
  value: number;
  unit: string;
  highlight?: boolean;
}

export const StatsCard: React.FC<Props> = ({ icon, label, value, unit, highlight }) => {
  return (
    <div className={`stats-card glass ${highlight ? 'highlight' : ''}`}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-label">{label}</h3>
        <p className="card-value">{value} <span className="card-unit">{unit}</span></p>
      </div>
    </div>
  );
};
