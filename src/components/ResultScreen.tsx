import React from 'react';
import { FortuneResult } from '../types';
import { getActivityRecommendation, getWeeklyForecast } from '../utils/fortune-engine';
import FortuneCard from './FortuneCard';
import {
  HeartLineIcon,
  RefreshIcon,
} from './BrandIcons';

interface ResultScreenProps {
  result: FortuneResult;
  premiumUnlocked: boolean;
  onUnlockPremium: () => void;
  weeklyUnlocked: boolean;
  onUnlockWeekly: () => void;
  onRetry: () => void;
  adLoading: boolean;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  premiumUnlocked,
  onUnlockPremium,
  weeklyUnlocked,
  onUnlockWeekly,
  onRetry,
  adLoading,
}) => {
  const activity = getActivityRecommendation(result.phase);

  return (
    <div className="result-screen">
      <FortuneCard result={result} />

      {/* Activity Recommendation — Mission Card */}
      <div className="activity-section">
        <div className="activity-card">
          <div className="activity-header">
            <span className="activity-emoji">{activity.emoji}</span>
            <div>
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-desc">{activity.description}</p>
            </div>
          </div>
          <ul className="activity-list">
            {activity.activities.map((item, index) => (
              <li key={index} className="activity-item">
                <HeartLineIcon size={16} className="activity-check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mascot Speech Bubble — Advice */}
      <div className="mascot-advice-section">
        <div className="mascot-advice-bubble">
          <img src="/mascot/mascot-main.png" alt="" className="mascot-advice-img" />
          <div className="speech-bubble">
            <span className="speech-bubble-label">피기의 한마디</span>
            <p className="speech-bubble-text">{result.advice}</p>
          </div>
        </div>
      </div>

      {/* Premium Section 1 — Love Type */}
      {result.premiumContent?.loveType && (
        <div className="premium-section">
          <div className={`premium-card${premiumUnlocked ? ' unlocked' : ''}`}>
            {premiumUnlocked ? (
              <div className="premium-unlocked-content love-type-content">
                <div className="love-type-header">
                  <span className="love-type-emoji">{result.premiumContent.loveType.emoji}</span>
                  <div>
                    <h3 className="love-type-name">{result.premiumContent.loveType.name}</h3>
                    <p className="love-type-label">오늘의 연애 타입</p>
                  </div>
                </div>
                <p className="love-type-desc">{result.premiumContent.loveType.description}</p>
                <div className="love-type-action">
                  <span className="love-type-action-label">추천 행동</span>
                  <p className="love-type-action-text">{result.premiumContent.loveType.action}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="premium-locked-icon">
                  <img src="/mascot/premium-key-sm.png" alt="" className="premium-mascot" />
                </div>
                <p className="premium-locked-title">오늘의 연애 타입 확인하기</p>
                <p className="premium-locked-desc">
                  오늘 나는 어떤 연애 타입인지 확인해보세요
                </p>
                <button
                  className="btn-premium"
                  onClick={onUnlockPremium}
                  disabled={adLoading}
                >
                  <span className="ad-badge">AD</span>
                  {adLoading ? '로딩 중...' : '연애 타입 확인하기'}
                </button>
                <p className="ad-notice" style={{ marginTop: 8 }}>
                  광고 시청 후 연애 타입을 확인하세요
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Premium Section 2 — Weekly Forecast */}
      <div className="premium-section">
        <div className={`premium-card${weeklyUnlocked ? ' unlocked' : ''}`}>
          {weeklyUnlocked ? (
            <div className="premium-unlocked-content">
              <h3 className="premium-content-title">
                이번 주 연애 전망
              </h3>
              {(() => {
                const weekly = getWeeklyForecast();
                return (
                  <>
                    <div className="weekly-days">
                      {weekly.days.map((d, i) => (
                        <div key={i} className="weekly-day">
                          <span className="weekly-day-name">{d.day}</span>
                          <span className={`weekly-day-phase phase-${d.phase}`} />
                        </div>
                      ))}
                    </div>
                    <p className="weekly-summary">{weekly.summary}</p>
                  </>
                );
              })()}
            </div>
          ) : (
            <>
              <div className="premium-locked-icon">
                <img src="/mascot/premium-key-sm.png" alt="" className="premium-mascot" />
              </div>
              <p className="premium-locked-title">이번 주 연애 전망 미리보기</p>
              <p className="premium-locked-desc">
                이번 주 요일별 연애 운세를 확인해보세요
              </p>
              <button
                className="btn-premium"
                onClick={onUnlockWeekly}
                disabled={adLoading}
              >
                <span className="ad-badge">AD</span>
                {adLoading ? '로딩 중...' : '이번 주 전망 보기'}
              </button>
              <p className="ad-notice" style={{ marginTop: 8 }}>
                광고 시청 후 이번 주 전망을 확인하세요
              </p>
            </>
          )}
        </div>
      </div>

      {/* Retry Button */}
      <div className="button-group">
        <button className="btn-secondary" onClick={onRetry}>
          <RefreshIcon size={18} />
          내일 다시 확인하기
        </button>
        <p className="footer-note">매일 자정에 새로운 연애운이 업데이트됩니다</p>
      </div>
    </div>
  );
};

export default ResultScreen;
