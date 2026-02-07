import React, { useState, useCallback, useEffect } from 'react';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import { FortuneResult, StreakData } from './types';
import { getLoveFortune } from './utils/fortune-engine';
import { getStreakData, updateStreak, hasViewedToday, markViewedToday } from './utils/storage';
import { useInterstitialAd } from './hooks/useInterstitialAd';
import { DeviceViewport } from './components/DeviceViewport';
import ResultScreen from './components/ResultScreen';
import { StreakFireIcon, HeartPulseIcon, FallingHearts } from './components/BrandIcons';

type Screen = 'loading' | 'result';

const LOADING_MESSAGES = [
  '오늘의 연애 에너지를 읽고 있어요...',
  '별들이 당신의 사랑을 점치고 있어요...',
  '하트가 당신에게 메시지를 보내고 있어요...',
  '운명의 실타래를 풀고 있어요...',
];

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('loading');
  const [fortuneResult, setFortuneResult] = useState<FortuneResult | null>(null);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    lastVisitDate: '',
    totalVisits: 0,
  });
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const { loading: adLoading, showInterstitialAd } = useInterstitialAd();

  // Generate fortune on mount
  useEffect(() => {
    const loadFortune = async () => {
      const streakData = await getStreakData();
      setStreak(streakData);

      // Cycle loading messages
      let msgIndex = 0;
      const msgInterval = setInterval(() => {
        msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
        setLoadingMessage(LOADING_MESSAGES[msgIndex]);
      }, 1200);

      // Simulate reading time
      setTimeout(async () => {
        clearInterval(msgInterval);

        const result = getLoveFortune();
        setFortuneResult(result);

        const updatedStreak = await updateStreak();
        setStreak(updatedStreak);
        await markViewedToday();

        try {
          generateHapticFeedback({ type: 'softMedium' });
        } catch {}

        setScreen('result');
      }, 2500);
    };

    loadFortune();
  }, []);

  const handleUnlockPremium = useCallback(() => {
    showInterstitialAd({
      onDismiss: () => {
        setPremiumUnlocked(true);
        try {
          generateHapticFeedback({ type: 'softMedium' });
        } catch {}
      },
    });
  }, [showInterstitialAd]);

  const handleRetry = useCallback(() => {
    // Just scroll to top as fortune changes daily
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <DeviceViewport />

      {/* Falling Hearts Background */}
      <div className="hearts-bg" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className={`falling-heart ${i % 3 === 0 ? 'large' : ''}`}
            style={{
              left: `${(i * 7.3) % 100}%`,
              animationDuration: `${6 + (i % 5) * 2}s`,
              animationDelay: `${(i * 1.3) % 8}s`,
              opacity: 0.15 + (i % 4) * 0.05,
            }}
          >
            <img
              src={FallingHearts[i % 4]}
              alt=""
              width={i % 3 === 0 ? 20 : 14}
              height={i % 3 === 0 ? 20 : 14}
              style={{ display: 'block' }}
            />
          </span>
        ))}
      </div>

      <div className="app">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="header-title">연애 뭐래</h1>
            {streak.currentStreak > 0 && (
              <div className="streak-badge">
                <StreakFireIcon size={16} />
                <span>{streak.currentStreak}일 연속</span>
              </div>
            )}
          </div>
        </header>

        {/* Loading Screen */}
        {screen === 'loading' && (
          <div className="loading-screen">
            <div className="loading-heart-container">
              <div className="loading-heart">
                <HeartPulseIcon size={48} />
              </div>
            </div>
            <p className="loading-text">{loadingMessage}</p>
          </div>
        )}

        {/* Result Screen */}
        {screen === 'result' && fortuneResult && (
          <ResultScreen
            result={fortuneResult}
            premiumUnlocked={premiumUnlocked}
            onUnlockPremium={handleUnlockPremium}
            onRetry={handleRetry}
            adLoading={adLoading}
          />
        )}
      </div>
    </>
  );
};

export default App;
