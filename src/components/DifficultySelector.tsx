import React from 'react';
import { Difficulty } from '../types';
import './Selector.css';

interface Props {
  selected: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficultyConfig = {
  [Difficulty.EASY]: { label: 'Easy', emoji: '🌱', color: 'green' },
  [Difficulty.MEDIUM]: { label: 'Medium', emoji: '🔥', color: 'orange' },
  [Difficulty.HARD]: { label: 'Hard', emoji: '⚡', color: 'red' }
};

export const DifficultySelector: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="selector glass">
      <label className="selector-label">
        <span className="label-icon">📊</span>
        Difficulty Level
      </label>
      <div className="selector-buttons">
        {Object.values(Difficulty).map(difficulty => {
          const config = difficultyConfig[difficulty];
          return (
            <button
              key={difficulty}
              className={`selector-btn ${selected === difficulty ? 'active' : ''}`}
              onClick={() => onChange(difficulty)}
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
