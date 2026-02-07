import React from 'react';
import { FortuneResult } from '../types';
import {
  HeartPulseIcon,
  HeartFilledIcon,
  SparkleIcon,
  LuckyColorIcon,
  LuckyNumberIcon,
  LuckyCompassIcon,
  LuckyClockIcon,
  AdviceIcon,
} from './BrandIcons';

interface FortuneCardProps {
  result: FortuneResult;
}

const GRADE_LABELS: Record<string, string> = {
  S: '최고의 연애운',
  A: '좋은 연애운',
  B: '보통의 연애운',
  C: '주의가 필요한 날',
  D: '충전이 필요한 날',
};

const FortuneCard: React.FC<FortuneCardProps> = ({ result }) => {
  return (
    <div className="fortune-result-card">
      <div className={`grade-badge grade-${result.grade}`}>
        <span className="grade-letter">{result.grade}</span>
        <span className="grade-label">{GRADE_LABELS[result.grade]}</span>
      </div>

      <h1 className="fortune-title">{result.title}</h1>
      <p className="fortune-description">{result.description}</p>

      {/* Score Bars */}
      <div className="scores-section">
        <h3 className="scores-title">
          <HeartPulseIcon size={18} />
          연애 지수
        </h3>
        {result.scores.map((score, index) => (
          <div key={index} className="score-row">
            <span className="score-label">
              <HeartFilledIcon size={14} className="score-heart-icon" />
              {score.label}
            </span>
            <div className="score-bar-bg">
              <div
                className="score-bar-fill"
                style={{
                  width: `${score.value}%`,
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            </div>
            <span className="score-value">{score.value}</span>
          </div>
        ))}
      </div>

      {/* Lucky Items */}
      <div className="lucky-section">
        <h3 className="lucky-title">
          <SparkleIcon size={18} />
          럭키 아이템
        </h3>
        <div className="lucky-grid">
          <div className="lucky-item">
            <div className="lucky-item-icon">
              <LuckyColorIcon size={20} />
            </div>
            <div className="lucky-item-label">행운의 색</div>
            <div className="lucky-item-value">{result.luckyItems.color}</div>
          </div>
          <div className="lucky-item">
            <div className="lucky-item-icon">
              <LuckyNumberIcon size={20} />
            </div>
            <div className="lucky-item-label">행운의 숫자</div>
            <div className="lucky-item-value">{result.luckyItems.number}</div>
          </div>
          <div className="lucky-item">
            <div className="lucky-item-icon">
              <LuckyCompassIcon size={20} />
            </div>
            <div className="lucky-item-label">행운의 방향</div>
            <div className="lucky-item-value">{result.luckyItems.direction}</div>
          </div>
          <div className="lucky-item">
            <div className="lucky-item-icon">
              <LuckyClockIcon size={20} />
            </div>
            <div className="lucky-item-label">럭키 타임</div>
            <div className="lucky-item-value">{result.luckyItems.time}</div>
          </div>
        </div>
      </div>

      {/* Advice */}
      <div className="advice-section">
        <div className="advice-card">
          <span className="advice-icon">
            <AdviceIcon size={20} />
          </span>
          <p className="advice-text">{result.advice}</p>
        </div>
      </div>
    </div>
  );
};

export default FortuneCard;
