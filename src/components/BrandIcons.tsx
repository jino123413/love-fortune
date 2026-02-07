import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Consistent heart path used across all heart variants
const HEART_PATH = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

/** Heart with a small sparkle -- main app symbol */
export const LoveHeartIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path d={HEART_PATH} fill="white" />
    <path
      d="M17 2l.6 1.4L19 4l-1.4.6L17 6l-.6-1.4L15 4l1.4-.6L17 2z"
      fill="white"
    />
  </svg>
);

/** Heart with a pulse line for loading / love index */
export const HeartPulseIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path d={HEART_PATH} fill="white" opacity="0.3" />
    <path d={HEART_PATH} fill="none" stroke="white" strokeWidth="1.5" />
    <polyline
      points="4,13 8,13 10,9 12,16 14,11 16,13 20,13"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Solid filled heart for score display */
export const HeartFilledIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path d={HEART_PATH} fill="white" />
  </svg>
);

/** Flame icon for streak badge */
export const StreakFireIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path
      d="M12 23c-4.97 0-8-3.03-8-7 0-2.72 1.48-5.26 3-7l1.5 1.5c.33.33.87.1.87-.37V6c0-3.31 2.69-4 5.63-4 0 2.49.88 4.73 2.38 6.49A8.47 8.47 0 0120 16c0 3.97-3.03 7-8 7z"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 23c-2.21 0-4-1.79-4-4 0-1.48.81-2.77 1.63-3.77l.77.77c.16.16.43.05.43-.18V13.5c0-.83.67-1.5 1.5-1.5.65 0 1.2.42 1.41 1A4.5 4.5 0 0116 19c0 2.21-1.79 4-4 4z"
      fill="white"
      opacity="0.6"
    />
  </svg>
);

/** Sparkle star for lucky items */
export const SparkleIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path
      d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M19 16l.8 1.8L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"
      fill="white"
    />
  </svg>
);

/** Palette circle for lucky color */
export const LuckyColorIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <circle cx="12" cy="12" r="9.5" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="7.5" r="2" fill="white" />
    <circle cx="7.5" cy="13" r="2" fill="white" opacity="0.7" />
    <circle cx="16.5" cy="13" r="2" fill="white" opacity="0.5" />
    <circle cx="12" cy="17" r="1.5" fill="white" opacity="0.85" />
  </svg>
);

/** Number / hashtag icon for lucky number */
export const LuckyNumberIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path
      d="M10 3l-2 18M16 3l-2 18M3 9h18M3 15h18"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

/** Compass for lucky direction */
export const LuckyCompassIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <circle cx="12" cy="12" r="9.5" stroke="white" strokeWidth="1.5" />
    <polygon
      points="12,4 14,10 12,12 10,10"
      fill="white"
    />
    <polygon
      points="12,20 10,14 12,12 14,14"
      fill="white"
      opacity="0.5"
    />
    <circle cx="12" cy="12" r="1.5" fill="white" />
  </svg>
);

/** Clock for lucky time */
export const LuckyClockIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <circle cx="12" cy="12" r="9.5" stroke="white" strokeWidth="1.5" />
    <path
      d="M12 6v6l4 3"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Small heart at center */}
    <circle cx="12" cy="12" r="1.2" fill="white" />
  </svg>
);

/** Lightbulb for advice */
export const AdviceIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path
      d="M9 21h6M12 2a7 7 0 00-4 12.73V17a1 1 0 001 1h6a1 1 0 001-1v-2.27A7 7 0 0012 2z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17v-2.27A5 5 0 1114 14.73V17"
      fill="white"
      opacity="0.2"
    />
  </svg>
);

/** Outline heart for activity checklist */
export const HeartLineIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path
      d={HEART_PATH}
      fill="none"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

/** Star with smile for compatibility section */
export const CompatibilityStarIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path
      d="M12 2l2.9 5.9L21 9l-4.5 4.4L17.6 20 12 17.1 6.4 20l1.1-6.6L3 9l6.1-1.1L12 2z"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Smile */}
    <circle cx="9.5" cy="10" r="0.8" fill="white" />
    <circle cx="14.5" cy="10" r="0.8" fill="white" />
    <path
      d="M9.5 13c1 1.2 4 1.2 5 0"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/** Heart-shaped lock for premium content */
export const LockHeartIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
    />
    {/* Lock body */}
    <rect x="9" y="11" width="6" height="5" rx="1" fill="white" />
    {/* Lock shackle */}
    <path
      d="M10 11V9a2 2 0 114 0v2"
      stroke="white"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Keyhole */}
    <circle cx="12" cy="13.5" r="0.8" fill="#1A0A10" />
  </svg>
);

/** Refresh icon for "check again tomorrow" */
export const RefreshIcon: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
  >
    <path
      d="M4 12a8 8 0 0114.93-4M20 12a8 8 0 01-14.93 4"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M20 4v4h-4"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 20v-4h4"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Falling Heart SVG data URIs
// These replace the emoji hearts in the falling-hearts animation.
// Each is a 24x24 SVG encoded as a data URI for use as CSS background-image
// or as content in the animation spans.
// ---------------------------------------------------------------------------

const svgToDataUri = (svg: string) =>
  `data:image/svg+xml,${encodeURIComponent(svg)}`;

/** Solid heart */
const solidHeartSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="${HEART_PATH}" fill="#E91E63"/></svg>`;

/** Outline heart */
const outlineHeartSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="${HEART_PATH}" stroke="#FF80AB" stroke-width="1.5" fill="none"/></svg>`;

/** Sparkle heart (heart with a small sparkle) */
const sparkleHeartSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="${HEART_PATH}" fill="#C2185B"/><path d="M17 2l.6 1.4L19 4l-1.4.6L17 6l-.6-1.4L15 4l1.4-.6L17 2z" fill="#FF80AB"/></svg>`;

/** Double heart (small heart overlapping) */
const doubleHeartSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.35l-1.05-.96C4.7 14.34 2 11.55 2 8.15 2 5.52 4.09 3.5 6.75 3.5c1.35 0 2.64.63 3.5 1.62a5.04 5.04 0 013.5-1.62c2.66 0 4.75 2.02 4.75 4.65 0 3.4-2.7 6.19-7.2 10.24L10 19.35z" fill="#E91E63" opacity="0.5"/><path d="M15 20.35l-1.05-.96C9.7 15.34 7 12.55 7 9.15 7 6.52 9.09 4.5 11.75 4.5c1.35 0 2.64.63 3.5 1.62a5.04 5.04 0 013.5-1.62C21.41 4.5 23.5 6.52 23.5 9.15c0 3.4-2.7 6.19-7.2 10.24L15 20.35z" fill="#E91E63"/></svg>`;

/**
 * Array of 4 falling-heart SVG data URIs to replace emoji hearts.
 * Index mapping: 0 = solid, 1 = outline, 2 = sparkle, 3 = double
 */
export const FallingHearts: string[] = [
  svgToDataUri(solidHeartSvg),
  svgToDataUri(outlineHeartSvg),
  svgToDataUri(sparkleHeartSvg),
  svgToDataUri(doubleHeartSvg),
];
