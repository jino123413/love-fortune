export interface LoveFortune {
  id: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  title: string;
  description: string;
  charm: number;
  encounter: number;
  chemistry: number;
  luckyColor: string;
  luckyNumber: number;
  luckyDirection: string;
  luckyTime: string;
  advice: string;
  compatibilitySign: string;
}

export interface FortuneResult {
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  title: string;
  description: string;
  scores: {
    label: string;
    value: number;
  }[];
  luckyItems: {
    color: string;
    number: number;
    direction: string;
    time: string;
  };
  advice: string;
  premiumContent?: {
    compatibility?: string;
  };
}

export interface StreakData {
  currentStreak: number;
  lastVisitDate: string;
  totalVisits: number;
}
