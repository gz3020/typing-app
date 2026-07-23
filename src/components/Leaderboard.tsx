import React from 'react';
import { Score } from '../types';
import './Leaderboard.css';

interface Props {
  scores: Score[];
}

export const Leaderboard: React.FC<Props> = ({ scores }) => {
  const leaderboard = scores
    .sort((a, b) => b.wpm - a.wpm)
    .slice(0, 20)
    .map((score, index) => ({ ...score, rank: index + 1 }));

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  return (
    <div className="leaderboard">
      <h2 className="section-title">🏆 Leaderboard</h2>
      
      {leaderboard.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🚀</div>
          <p>No scores yet. Start typing to make the leaderboard!</p>
        </div>
      ) : (
        <div className="leaderboard-table glass">
          <div className="table-header">
            <div className="col-rank">Rank</div>
            <div className="col-wpm">WPM</div>
            <div className="col-acc">Accuracy</div>
            <div className="col-mode">Mode</div>
            <div className="col-date">Date</div>
          </div>
          
          {leaderboard.map((entry, index) => (
            <div key={entry.id} className={`table-row ${index < 3 ? 'medal' : ''}`}>
              <div className="col-rank">
                <span className="rank-badge">
                  {getMedalEmoji(entry.rank) || `#${entry.rank}`}
                </span>
              </div>
              <div className="col-wpm">
                <span className="wpm-value">{entry.wpm}</span>
              </div>
              <div className="col-acc">
                <span className="acc-value">{entry.accuracy}%</span>
              </div>
              <div className="col-mode">
                <span className="mode-badge">{entry.mode}</span>
              </div>
              <div className="col-date">
                {new Date(entry.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
