export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export enum PracticeMode {
  ARTICLES = 'articles',
  WORDS = 'words',
  SENTENCES = 'sentences',
  CODE = 'code'
}

export interface Score {
  id: string;
  wpm: number;
  accuracy: number;
  difficulty: Difficulty;
  mode: PracticeMode;
  timestamp: number;
  duration: number;
  totalChars: number;
  correctChars: number;
}

export interface LeaderboardEntry extends Score {
  rank: number;
}
