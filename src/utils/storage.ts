import { Score } from '../types';

const STORAGE_KEY = 'typing-practice-scores';

export const storage = {
  saveScore: (score: Omit<Score, 'id'>): Score => {
    const scores = storage.getScores();
    const newScore: Score = {
      ...score,
      id: Date.now().toString()
    };
    scores.push(newScore);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    return newScore;
  },

  getScores: (): Score[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getLeaderboard: (limit: number = 10): Score[] => {
    const scores = storage.getScores();
    return scores
      .sort((a, b) => b.wpm - a.wpm)
      .slice(0, limit);
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
