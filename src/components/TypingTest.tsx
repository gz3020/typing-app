import React, { useState, useEffect, useRef } from 'react';
import { Difficulty, PracticeMode, Score } from '../types';
import { storage } from '../utils/storage';
import { textGenerator } from '../utils/textGenerator';
import './TypingTest.css';

interface Props {
  difficulty: Difficulty;
  mode: PracticeMode;
  onScoreSaved: (score: Score) => void;
}

export const TypingTest: React.FC<Props> = ({ difficulty, mode, onScoreSaved }) => {
  const [text, setText] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const newText = textGenerator.generate(difficulty, mode);
    setText(newText);
  }, [difficulty, mode]);

  useEffect(() => {
    if (isActive && !isFinished && timeElapsed > 0) {
      const currentWpm = Math.round((input.length / 5 / (timeElapsed / 60)) * 10) / 10;
      setWpm(Math.max(0, currentWpm));
    }
  }, [timeElapsed, input]);

  useEffect(() => {
    if (isActive && !isFinished) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isFinished]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    setInput(newInput);

    if (!isActive && newInput.length > 0) {
      setIsActive(true);
    }

    if (newInput === text) {
      setIsActive(false);
      setIsFinished(true);
      calculateScore(newInput);
    }
  };

  const calculateScore = (finalInput: string) => {
    const correctChars = finalInput.split('').filter((char, i) => char === text[i]).length;
    const accuracy = Math.round((correctChars / text.length) * 100 * 10) / 10;
    const finalWpm = Math.round((text.split(' ').length / (timeElapsed / 60)) * 10) / 10;

    const score: Omit<Score, 'id'> = {
      wpm: Math.max(0, finalWpm),
      accuracy: Math.min(100, accuracy),
      difficulty,
      mode,
      timestamp: Date.now(),
      duration: timeElapsed,
      totalChars: text.length,
      correctChars
    };

    const savedScore = storage.saveScore(score);
    onScoreSaved(savedScore);
  };

  const handleReset = () => {
    setInput('');
    setTimeElapsed(0);
    setIsActive(false);
    setIsFinished(false);
    setWpm(0);
    const newText = textGenerator.generate(difficulty, mode);
    setText(newText);
    inputRef.current?.focus();
  };

  const accuracy = input.length > 0 
    ? Math.round((input.split('').filter((char, i) => char === text[i]).length / input.length) * 100)
    : 0;

  const progress = (input.length / text.length) * 100;

  return (
    <div className="typing-test glass-strong">
      <div className="typing-container">
        {/* Live Stats */}
        <div className="live-stats">
          <div className="stat-box">
            <div className="stat-value">{wpm}</div>
            <div className="stat-label">WPM</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{accuracy}</div>
            <div className="stat-label">%</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{timeElapsed}</div>
            <div className="stat-label">sec</div>
          </div>
          <div className="progress-ring">
            <svg width="60" height="60">
              <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle
                cx="30"
                cy="30"
                r="28"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="2"
                strokeDasharray={`${progress * 1.76} 176`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-text">{Math.round(progress)}%</div>
          </div>
        </div>

        {/* Text Display */}
        <div className="text-display">
          {text.split('').map((char, i) => (
            <span
              key={i}
              className={`char ${
                i < input.length
                  ? input[i] === char
                    ? 'correct'
                    : 'incorrect'
                  : i === input.length
                  ? 'current'
                  : ''
              }`}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Input */}
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          placeholder={isFinished ? "You did great! 🎉" : "Click and start typing..."}
          className="typing-input"
          disabled={isFinished}
          autoFocus
        />

        {/* Results */}
        {isFinished && (
          <div className="results-card">
            <div className="results-header">
              <h3>🎉 Test Complete!</h3>
              <p>Awesome performance!</p>
            </div>
            
            <div className="results-grid">
              <div className="result-item">
                <span className="result-icon">⚡</span>
                <div className="result-data">
                  <span className="result-label">Speed</span>
                  <span className="result-value">{wpm} WPM</span>
                </div>
              </div>
              <div className="result-item">
                <span className="result-icon">🎯</span>
                <div className="result-data">
                  <span className="result-label">Accuracy</span>
                  <span className="result-value">{accuracy}%</span>
                </div>
              </div>
              <div className="result-item">
                <span className="result-icon">⏱️</span>
                <div className="result-data">
                  <span className="result-label">Time</span>
                  <span className="result-value">{timeElapsed}s</span>
                </div>
              </div>
              <div className="result-item">
                <span className="result-icon">✅</span>
                <div className="result-data">
                  <span className="result-label">Correct</span>
                  <span className="result-value">{text.split('').filter((c, i) => input[i] === c).length}/{text.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <button onClick={handleReset} className="btn btn-primary btn-large">
          {isFinished ? '🔄 Try Again' : '↻ Reset'}
        </button>
      </div>
    </div>
  );
};
