import type { MealContext } from './types/database';
import { colors } from '../theme/colors';

// Korean labels for the 4 meal contexts per PRD §6.2.
// English enum values live in the DB; Korean lives in the app — keeps the
// schema language-agnostic for v2.0+ multilingual.
export const MEAL_CONTEXT_LABELS: Record<MealContext, string> = {
  fasting: '공복',
  pre_meal: '식전',
  post_meal_1h: '식후 1시간',
  post_meal_2h: '식후 2시간',
};

export const MEAL_CONTEXT_OPTIONS: readonly MealContext[] = [
  'fasting',
  'pre_meal',
  'post_meal_1h',
  'post_meal_2h',
];

// Fixed coded Level 0–1 nudges per PRD §6.2 + §7.
// No API call. One per meal context. Tip + one-sentence reason.
// Voice: warm, conversational, never alarming (PRD §5.1).
// Final wording to be reviewed by korean-voice-agent before launch.
export const GLUCOSE_NUDGES: Record<MealContext, { tip: string; reason: string }> = {
  fasting: {
    tip: '아침 공복에 물 한 잔으로 하루를 시작해볼까요?',
    reason: '수분은 혈당을 천천히 안정시키는 데 도움이 돼요.',
  },
  pre_meal: {
    tip: '식사 전 깊게 숨 한 번 쉬고 천천히 드셔보세요.',
    reason: '천천히 먹으면 식후 혈당이 덜 오른답니다.',
  },
  post_meal_1h: {
    tip: '식후 10분 가볍게 걸어볼까요? 🥦',
    reason: '걷기는 근육이 포도당을 소비하도록 도와줘요.',
  },
  post_meal_2h: {
    tip: '오늘도 잘 챙겨드셨네요. 따뜻한 차 한 잔 어떠세요?',
    reason: '식후 2시간이 지났다면 혈당이 안정 구간으로 돌아가요.',
  },
};

// Clinical reference bands (mg/dL) from KDA 2023/2025 + ADA — see Feasibility doc.
// Used as the "judgment" line, NOT social comparison.
// < 100 normal · 100–125 borderline · ≥ 126 elevated.
export function glucoseBandColor(valueMgDl: number): string {
  if (valueMgDl < 100) return colors.primary;
  if (valueMgDl < 126) return colors.warning;
  return colors.error;
}

export function formatGlucoseTimestamp(isoString: string): string {
  const d = new Date(isoString);
  const now = new Date();
  const isToday =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');

  if (isToday) return `오늘 ${hh}:${mm}`;

  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${month}월 ${day}일 ${hh}:${mm}`;
}
