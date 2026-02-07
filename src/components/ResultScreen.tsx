import React from 'react';
import { FortuneResult } from '../types';
import { getActivityRecommendation } from '../utils/fortune-engine';
import FortuneCard from './FortuneCard';
import {
  HeartLineIcon,
  CompatibilityStarIcon,
  LockHeartIcon,
  RefreshIcon,
} from './BrandIcons';

interface ResultScreenProps {
  result: FortuneResult;
  premiumUnlocked: boolean;
  onUnlockPremium: () => void;
  onRetry: () => void;
  adLoading: boolean;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  premiumUnlocked,
  onUnlockPremium,
  onRetry,
  adLoading,
}) => {
  const activity = getActivityRecommendation(result.grade);

  return (
    <div className="result-screen">
      <FortuneCard result={result} />

      {/* Activity Recommendation - Differentiating Feature */}
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

      {/* Premium Section - Compatibility Sign */}
      {result.premiumContent?.compatibility && (
        <div className="premium-section">
          <div className={`premium-card${premiumUnlocked ? ' unlocked' : ''}`}>
            {premiumUnlocked ? (
              <div className="premium-unlocked-content">
                <h3 className="premium-content-title">
                  <CompatibilityStarIcon size={18} />
                  오늘의 궁합 별자리
                </h3>
                <p className="premium-content-text">
                  {result.premiumContent.compatibility}
                </p>
              </div>
            ) : (
              <>
                <div className="premium-locked-icon">
                  <LockHeartIcon size={32} />
                </div>
                <p className="premium-locked-title">궁합 별자리 보기</p>
                <p className="premium-locked-desc">
                  오늘 나와 잘 맞는 별자리를 확인해보세요
                </p>
                <button
                  className="btn-premium"
                  onClick={onUnlockPremium}
                  disabled={adLoading}
                >
                  <span className="ad-badge">AD</span>
                  {adLoading ? '로딩 중...' : '궁합 별자리 보기'}
                </button>
                <p className="ad-notice" style={{ marginTop: 8 }}>
                  광고 시청 후 궁합 정보를 확인하세요
                </p>
              </>
            )}
          </div>
        </div>
      )}

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
