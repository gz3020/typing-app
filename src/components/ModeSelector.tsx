import React from 'react';
import { PracticeMode } from '../types';
import './Selector.css';

interface Props {
  selected: PracticeMode;
  onChange: (mode: PracticeMode) => void;
}

const modeConfig = {
  [PracticeMode.ARTICLES]: { label: 'Articles', emoji: '📄' },
  [PracticeMode.WORDS]: { label: 'Words', emoji: '✏️' },
  [PracticeMode.SENTENCES]: { label: 'Sentences', emoji: '📝' },
  [PracticeMode.CODE]: { label: 'Code', emoji: '💻' }
};

export const ModeSelector: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="selector glass">
      <label className="selector-label">
        <span className="label-icon">🎮</span>
        Practice Mode
      </label>
      <div className="selector-buttons">
        {Object.values(PracticeMode).map(mode => {
          const config = modeConfig[mode];
          return (
            <button
              key={mode}
              className={`selector-btn ${selected === mode ? 'active' : ''}`}
              onClick={() => onChange(mode)}
            >
              <span className="btn-emoji">{config.emoji}</span>
              <span className="btn-label">{config.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
