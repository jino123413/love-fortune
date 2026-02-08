import React, { useState, useCallback, useEffect, useRef } from 'react';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import { FortuneResult, StreakData } from './types';
import { getLoveFortune } from './utils/fortune-engine';
import { getStreakData, updateStreak, markViewedToday } from './utils/storage';
import { useInterstitialAd } from './hooks/useInterstitialAd';
import { DeviceViewport } from './components/DeviceViewport';
import ResultScreen from './components/ResultScreen';
import { LoveHeartIcon, FallingHearts } from './components/BrandIcons';

type Screen = 'loading' | 'revealing' | 'result';

const REVEAL_MESSAGES = [
  '두근두근...',
  '오늘의 연애운은...',
  '피기가 읽어보고 있어용...',
];

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('loading');
  const [fortuneResult, setFortuneResult] = useState<FortuneResult | null>(null);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [weeklyUnlocked, setWeeklyUnlocked] = useState(false);
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    lastVisitDate: '',
    totalVisits: 0,
  });
  const [fortuneReady, setFortuneReady] = useState(false);
  const [revealMsg, setRevealMsg] = useState('');
  const { loading: adLoading, showInterstitialAd } = useInterstitialAd();
  const revealTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Prepare fortune data on mount
  useEffect(() => {
    const prepare = async () => {
      const streakData = await getStreakData();
      setStreak(streakData);

      const result = getLoveFortune();
      setFortuneResult(result);

      const updatedStreak = await updateStreak();
      setStreak(updatedStreak);
      await markViewedToday();

      setFortuneReady(true);
    };
    prepare();
  }, []);

  const handleReveal = useCallback(() => {
    if (!fortuneReady || !fortuneResult) return;

    try {
      generateHapticFeedback({ type: 'softMedium' });
    } catch {}

    setScreen('revealing');
    setRevealMsg(REVEAL_MESSAGES[0]);

    // Cycle through reveal messages with increasing intensity
    let msgIdx = 0;
    const msgTimer = setInterval(() => {
      msgIdx++;
      if (msgIdx < REVEAL_MESSAGES.length) {
        setRevealMsg(REVEAL_MESSAGES[msgIdx]);
        try {
          generateHapticFeedback({ type: 'softHeavy' });
        } catch {}
      }
    }, 700);

    // Transition to result after animation
    revealTimerRef.current = setTimeout(() => {
      clearInterval(msgTimer);
      try {
        generateHapticFeedback({ type: 'rigid' });
      } catch {}
      setScreen('result');
    }, 2200);

    return () => {
      clearInterval(msgTimer);
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, [fortuneReady, fortuneResult]);

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

  const handleUnlockWeekly = useCallback(() => {
    showInterstitialAd({
      onDismiss: () => {
        setWeeklyUnlocked(true);
        try {
          generateHapticFeedback({ type: 'softMedium' });
        } catch {}
      },
    });
  }, [showInterstitialAd]);

  const handleRetry = useCallback(() => {
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
            <h1 className="header-title">연애 몇 점</h1>
            {streak.currentStreak > 0 && (
              <div className="streak-badge">
                <img src="/mascot/streak-fire-xs.png" alt="" className="streak-badge-icon" />
                <span>{streak.currentStreak}일 연속</span>
              </div>
            )}
          </div>
        </header>

        {/* Loading / Reveal Screen */}
        {(screen === 'loading' || screen === 'revealing') && (
          <div className={`loading-screen ${screen === 'revealing' ? 'revealing' : ''}`}>
            <div className={`loading-mascot-wrap ${screen === 'revealing' ? 'revealing' : ''}`}>
              <img src="/mascot/mascot-main.png" alt="연애 몇 점" className="loading-mascot" />
            </div>

            {screen === 'loading' && (
              <>
                <p className="loading-greeting">오늘의 연애운을 확인해볼까용?</p>
                <button
                  className={`btn-reveal ${fortuneReady ? 'ready' : ''}`}
                  onClick={handleReveal}
                  disabled={!fortuneReady}
                >
                  <LoveHeartIcon size={20} />
                  <span>{fortuneReady ? '오늘의 연애운 확인하기' : '준비 중...'}</span>
                </button>
                <p className="loading-hint">피기가 오늘의 운세를 준비했어용 꿀꿀~</p>
              </>
            )}

            {screen === 'revealing' && (
              <>
                {/* Burst hearts */}
                <div className="heart-burst" aria-hidden="true">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={i}
                      className="burst-heart"
                      style={{
                        '--burst-angle': `${i * 45}deg`,
                        '--burst-delay': `${i * 0.05}s`,
                        '--burst-distance': `${60 + (i % 3) * 20}px`,
                      } as React.CSSProperties}
                    >
                      <LoveHeartIcon size={12 + (i % 3) * 4} />
                    </span>
                  ))}
                </div>
                <p className="reveal-message">{revealMsg}</p>
              </>
            )}
          </div>
        )}

        {/* Result Screen */}
        {screen === 'result' && fortuneResult && (
          <ResultScreen
            result={fortuneResult}
            premiumUnlocked={premiumUnlocked}
            onUnlockPremium={handleUnlockPremium}
            weeklyUnlocked={weeklyUnlocked}
            onUnlockWeekly={handleUnlockWeekly}
            onRetry={handleRetry}
            adLoading={adLoading}
          />
        )}
      </div>
    </>
  );
};

export default App;
