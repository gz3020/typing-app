import React, { useState, useEffect } from 'react';
import { TypingTest } from './components/TypingTest';
import { DifficultySelector } from './components/DifficultySelector';
import { ModeSelector } from './components/ModeSelector';
import { Leaderboard } from './components/Leaderboard';
import { StatsCard } from './components/StatsCard';
import { Difficulty, PracticeMode, Score } from './types';
import './styles/globals.css';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [mode, setMode] = useState<PracticeMode>(PracticeMode.ARTICLES);
  const [tab, setTab] = useState<'test' | 'leaderboard' | 'stats'>('test');
  const [lastScore, setLastScore] = useState<Score | null>(null);
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('typing-practice-scores');
    if (stored) setScores(JSON.parse(stored));
  }, []);

  const personalStats = {
    totalTests: scores.length,
    avgWpm: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b.wpm, 0) / scores.length) : 0,
    bestWpm: scores.length > 0 ? Math.max(...scores.map(s => s.wpm)) : 0,
    avgAccuracy: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b.accuracy, 0) / scores.length) : 0,
  };

  return (
    <div className="app">
      <div className="animated-bg" />
      
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">⌨️</span>
              <div className="logo-text">
                <h1>TypeVibe</h1>
                <p>Feel the rhythm of typing</p>
              </div>
            </div>
            
            <nav className="nav-tabs glass">
              {(['test', 'stats', 'leaderboard'] as const).map(t => (
                <button
                  key={t}
                  className={`nav-tab ${tab === t ? 'active' : ''}`}
                  onClick={() => setTab(t)}
                >
                  {t === 'test' && '🚀 Practice'}
                  {t === 'stats' && '📊 Stats'}
                  {t === 'leaderboard' && '🏆 Leaderboard'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {tab === 'test' && (
            <div className="test-section">
              <div className="controls-grid">
                <DifficultySelector selected={difficulty} onChange={setDifficulty} />
                <ModeSelector selected={mode} onChange={setMode} />
              </div>

              {lastScore && (
                <div className="score-toast glass">
                  <div className="toast-icon">✨</div>
                  <div className="toast-content">
                    <p className="toast-title">Great job!</p>
                    <p className="toast-desc">
                      {lastScore.wpm} WPM • {lastScore.accuracy}% accuracy
                    </p>
                  </div>
                </div>
              )}

              <TypingTest
                difficulty={difficulty}
                mode={mode}
                onScoreSaved={(score) => {
                  setLastScore(score);
                  const updated = [...scores, score];
                  setScores(updated);
                  localStorage.setItem('typing-practice-scores', JSON.stringify(updated));
                }}
              />
            </div>
          )}

          {tab === 'stats' && (
            <div className="stats-section">
              <h2 className="section-title">Your Performance</h2>
              <div className="stats-grid">
                <StatsCard
                  icon="🔥"
                  label="Total Tests"
                  value={personalStats.totalTests}
                  unit="tests"
                />
                <StatsCard
                  icon="⚡"
                  label="Average WPM"
                  value={personalStats.avgWpm}
                  unit="wpm"
                  highlight
                />
                <StatsCard
                  icon="🚀"
                  label="Best WPM"
                  value={personalStats.bestWpm}
                  unit="wpm"
                  highlight
                />
                <StatsCard
                  icon="🎯"
                  label="Avg Accuracy"
                  value={personalStats.avgAccuracy}
                  unit="%"
                />
              </div>
            </div>
          )}

          {tab === 'leaderboard' && <Leaderboard scores={scores} />}
        </div>
      </main>
    </div>
  );
}

export default App;
