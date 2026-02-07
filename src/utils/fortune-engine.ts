import { FortuneResult } from '../types';
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
    grade: fortune.grade,
    title: fortune.title,
    description: fortune.description,
    scores: [
      { label: '매력운', value: fortune.charm },
      { label: '만남운', value: fortune.encounter },
      { label: '케미운', value: fortune.chemistry },
    ],
    luckyItems: {
      color: fortune.luckyColor,
      number: fortune.luckyNumber,
      direction: fortune.luckyDirection,
      time: fortune.luckyTime,
    },
    advice: fortune.advice,
    premiumContent: {
      compatibility: fortune.compatibilitySign,
    },
  };
}

export function getActivityRecommendation(grade: 'S' | 'A' | 'B' | 'C' | 'D'): {
  emoji: string;
  title: string;
  description: string;
  activities: string[];
} {
  const recommendations = {
    S: {
      emoji: '💘',
      title: '오늘은 고백의 날!',
      description: '우주가 당신의 사랑을 축복하는 날이에요. 용기를 내보세요!',
      activities: [
        '마음에 두고 있던 사람에게 고백하기',
        '연인에게 깜짝 이벤트 준비하기',
        '새로운 장소에서 특별한 데이트하기',
        '사랑의 편지 쓰기',
      ],
    },
    A: {
      emoji: '💕',
      title: '데이트 약속을 잡아보세요',
      description: '좋은 에너지가 넘치는 날, 적극적으로 다가가 보세요.',
      activities: [
        '좋아하는 사람에게 먼저 연락하기',
        '함께 가고 싶은 맛집 리스트 공유하기',
        '산책이나 카페 데이트 제안하기',
        '상대의 관심사에 대해 질문하기',
      ],
    },
    B: {
      emoji: '💗',
      title: '연락을 먼저 해보세요',
      description: '소소한 대화가 관계를 따뜻하게 만들어줘요.',
      activities: [
        '안부 메시지 보내기',
        '좋은 노래나 영상 공유하기',
        '함께했던 추억 사진 보내기',
        '상대가 좋아할 만한 정보 공유하기',
      ],
    },
    C: {
      emoji: '💜',
      title: '자기 관리에 집중하는 날',
      description: '나를 가꾸는 시간이 더 좋은 인연을 끌어당겨요.',
      activities: [
        '새로운 헤어스타일이나 패션 시도하기',
        '운동이나 요가로 몸과 마음 관리하기',
        '좋아하는 책이나 영화 즐기기',
        '자기 전 스킨케어 루틴 실천하기',
      ],
    },
    D: {
      emoji: '🤍',
      title: '혼자만의 시간이 필요한 날',
      description: '충분한 휴식이 내일의 나를 더 빛나게 해줘요.',
      activities: [
        '좋아하는 음악 들으며 명상하기',
        '감정 일기 써보기',
        '혼자 좋아하는 카페에서 시간 보내기',
        '일찍 잠자리에 들어 충분히 쉬기',
      ],
    },
  };

  return recommendations[grade];
}
