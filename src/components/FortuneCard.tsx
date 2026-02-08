import React from 'react';
import { FortuneResult, LovePhase } from '../types';
import { HeartPulseIcon } from './BrandIcons';

interface FortuneCardProps {
  result: FortuneResult;
}

const PHASE_LABELS: Record<LovePhase, string> = {
  plasma: '타오르는 열정',
  gas: '가벼운 설렘',
  liquid: '잔잔한 흐름',
  solid: '차분한 안정',
};

const PHASE_NAMES: Record<LovePhase, string> = {
  plasma: '플라즈마',
  gas: '기체',
  liquid: '액체',
  solid: '고체',
};

const PHASE_MASCOT: Record<LovePhase, string> = {
  plasma: '/mascot/grade-s.png',
  gas: '/mascot/grade-a.png',
  liquid: '/mascot/grade-b.png',
  solid: '/mascot/grade-c.png',
};

const PHASE_PULSE_DURATION: Record<LovePhase, string> = {
  plasma: '0.6s',
  gas: '0.9s',
  liquid: '1.4s',
  solid: '2.2s',
};

const PHASE_ECG_STROKE: Record<LovePhase, number> = {
  plasma: 3.5,
  gas: 2.5,
  liquid: 2,
  solid: 1.5,
};

function getPhaseIntensity(intensities: { level: number }[]): number {
  const avg = intensities.reduce((sum, s) => sum + s.level, 0) / intensities.length;
  // Minimum 30% fill so heart is always visible
  return Math.max(30, Math.round(avg * 100));
}

const FortuneCard: React.FC<FortuneCardProps> = ({ result }) => {
  const fillPct = getPhaseIntensity(result.intensities);

  return (
    <div className="fortune-result-card">
      {/* Phase Mascot */}
      <div className="phase-mascot-container">
        <img
          src={PHASE_MASCOT[result.phase]}
          alt={PHASE_LABELS[result.phase]}
          className="phase-mascot"
        />
      </div>

      {/* Heart Gauge — density & saturation only, no numbers */}
      <div
        className={`heart-gauge phase-heart-${result.phase}`}
        style={{ '--pulse-speed': PHASE_PULSE_DURATION[result.phase] } as React.CSSProperties}
      >
        <div className="heart-gauge-fill" style={{ '--fill-pct': `${fillPct}%` } as React.CSSProperties}>
          <svg className="heart-gauge-svg" viewBox="0 0 24 24">
            <defs>
              <clipPath id="heartClip">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </clipPath>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="rgba(233,30,99,0.06)"
              stroke="rgba(233,30,99,0.15)"
              strokeWidth="0.5"
            />
            <g clipPath="url(#heartClip)">
              <rect
                className="heart-fill-rect"
                x="0" y="0" width="24" height="24"
                fill="currentColor"
              />
            </g>
          </svg>
        </div>
        <div className="heart-gauge-label">{PHASE_LABELS[result.phase]}</div>
      </div>

      <h1 className="fortune-title">{result.title}</h1>
      <p className="fortune-description">{result.description}</p>

      {/* ECG Waveform — intensity conveyed through stroke density & peak height only */}
      <div className="ecg-section">
        <h3 className="ecg-title">
          <HeartPulseIcon size={18} />
          연애 심전도
        </h3>
        <div className="ecg-wave-container">
          <svg className="ecg-svg" viewBox="0 0 300 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              className="ecg-path"
              d={generateECGPath(result.intensities.map(s => s.level))}
              fill="none"
              stroke="url(#ecgGrad)"
              strokeWidth={PHASE_ECG_STROKE[result.phase]}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="ecg-path-glow"
              d={generateECGPath(result.intensities.map(s => s.level))}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={PHASE_ECG_STROKE[result.phase] * 2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.12"
            />
          </svg>
          {/* Labels with intensity dots — no numbers */}
          <div className="ecg-labels">
            {result.intensities.map((intensity, i) => (
              <div key={i} className="ecg-label">
                <span className="ecg-label-name">{intensity.label}</span>
                <span
                  className="ecg-label-dot"
                  style={{ '--dot-intensity': intensity.level } as React.CSSProperties}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Scenario */}
      <div className="scenario-section">
        <div className="scenario-card">
          <div className="scenario-icon">💌</div>
          <h3 className="scenario-title">오늘의 데이트 시나리오</h3>
          <p className="scenario-sentence">{result.dateScenario.sentence}</p>
        </div>
      </div>
    </div>
  );
};

/** Generate ECG path with 3 peaks. Levels are 0-1 intensity */
function generateECGPath(levels: number[]): string {
  const baseline = 60;
  const maxPeak = 50;
  const peakY = (level: number) => baseline - level * maxPeak;

  const segments = [
    `M 0,${baseline}`,
    `L 30,${baseline}`,
    `L 45,${baseline}`,
    `L 55,${baseline + 5}`,
    `L 65,${peakY(levels[0])}`,
    `L 75,${baseline + 8}`,
    `L 85,${baseline}`,
    `L 110,${baseline}`,
    `L 125,${baseline}`,
    `L 135,${baseline + 5}`,
    `L 145,${peakY(levels[1])}`,
    `L 155,${baseline + 8}`,
    `L 165,${baseline}`,
    `L 190,${baseline}`,
    `L 205,${baseline}`,
    `L 215,${baseline + 5}`,
    `L 225,${peakY(levels[2])}`,
    `L 235,${baseline + 8}`,
    `L 245,${baseline}`,
    `L 300,${baseline}`,
  ];

  return segments.join(' ');
}

export default FortuneCard;
