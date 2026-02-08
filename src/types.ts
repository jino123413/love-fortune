export interface DateScenario {
  spot: string;
  style: string;
  food: string;
  song: string;
  sentence: string;
}

export interface LoveType {
  name: string;
  emoji: string;
  description: string;
  action: string;
}

export type LovePhase = 'plasma' | 'gas' | 'liquid' | 'solid';

export interface LoveFortune {
  id: number;
  phase: LovePhase;
  title: string;
  description: string;
  charmIntensity: number;
  encounterIntensity: number;
  chemistryIntensity: number;
  dateScenario: DateScenario;
  advice: string;
  loveType: LoveType;
}

export interface FortuneResult {
  phase: LovePhase;
  title: string;
  description: string;
  intensities: {
    label: string;
    level: number;
  }[];
  dateScenario: DateScenario;
  advice: string;
  premiumContent?: {
    loveType?: LoveType;
  };
}

export interface WeeklyForecast {
  days: { day: string; phase: LovePhase }[];
  summary: string;
}

export interface StreakData {
  currentStreak: number;
  lastVisitDate: string;
  totalVisits: number;
}
