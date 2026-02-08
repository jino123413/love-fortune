import { FortuneResult, LovePhase } from '../types';
import { loveFortunes } from '../data/love-fortunes';

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function getLoveFortune(): FortuneResult {
  const today = getTodayString();
  const index = hashCode(today + 'love') % loveFortunes.length;
  const fortune = loveFortunes[index];

  return {
    phase: fortune.phase,
    title: fortune.title,
    description: fortune.description,
    intensities: [
      { label: '매력', level: fortune.charmIntensity },
      { label: '만남', level: fortune.encounterIntensity },
      { label: '케미', level: fortune.chemistryIntensity },
    ],
    dateScenario: fortune.dateScenario,
    advice: fortune.advice,
    premiumContent: {
      loveType: fortune.loveType,
    },
  };
}

export function getActivityRecommendation(phase: LovePhase): {
  emoji: string;
  title: string;
  description: string;
  activities: string[];
} {
  const recommendations: Record<LovePhase, { emoji: string; title: string; description: string; activities: string[] }> = {
    plasma: {
      emoji: '💘',
      title: '오늘은 고백의 날!',
      description: '에너지가 폭발하는 날이에요. 용기를 내보세요!',
      activities: [
        '마음에 두고 있던 사람에게 고백하기',
        '연인에게 깜짝 이벤트 준비하기',
        '새로운 장소에서 특별한 데이트하기',
        '사랑의 편지 쓰기',
      ],
    },
    gas: {
      emoji: '💕',
      title: '데이트 약속을 잡아보세요',
      description: '가벼운 설렘이 가득한 날, 적극적으로 다가가 보세요.',
      activities: [
        '좋아하는 사람에게 먼저 연락하기',
        '함께 가고 싶은 맛집 리스트 공유하기',
        '산책이나 카페 데이트 제안하기',
        '상대의 관심사에 대해 질문하기',
      ],
    },
    liquid: {
      emoji: '💗',
      title: '자연스럽게 흘러가는 하루',
      description: '소소한 대화가 관계를 따뜻하게 만들어줘요.',
      activities: [
        '안부 메시지 보내기',
        '좋은 노래나 영상 공유하기',
        '함께했던 추억 사진 보내기',
        '상대가 좋아할 만한 정보 공유하기',
      ],
    },
    solid: {
      emoji: '🤍',
      title: '내면을 단단히 다지는 날',
      description: '나를 가꾸는 시간이 더 좋은 인연을 끌어당겨요.',
      activities: [
        '좋아하는 음악 들으며 명상하기',
        '새로운 헤어스타일이나 패션 시도하기',
        '감정 일기 써보기',
        '좋아하는 책이나 영화 즐기기',
      ],
    },
  };

  return recommendations[phase];
}

export function getWeeklyForecast(): { days: { day: string; phase: LovePhase }[]; summary: string } {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const days: { day: string; phase: LovePhase }[] = [];
  const phases: LovePhase[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const index = hashCode(dateStr + 'love') % loveFortunes.length;
    const fortune = loveFortunes[index];
    const phase = fortune.phase;
    phases.push(phase);
    days.push({ day: dayNames[i], phase });
  }

  const hotDays = phases.filter(p => p === 'plasma' || p === 'gas').length;

  let summary = '';
  if (hotDays >= 5) summary = '이번 주는 사랑이 넘치는 한 주예요';
  else if (hotDays >= 3) summary = '이번 주는 좋은 기운이 함께하는 한 주예요';
  else if (hotDays >= 1) summary = '이번 주는 자기 관리에 집중하면 좋은 한 주예요';
  else summary = '이번 주는 마음의 충전이 필요한 한 주예요';

  return { days, summary };
}
