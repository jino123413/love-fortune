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
    <path d={HEART_PATH} fill="currentColor" />
    <path
      d="M17 2l.6 1.4L19 4l-1.4.6L17 6l-.6-1.4L15 4l1.4-.6L17 2z"
      fill="currentColor"
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
    <path d={HEART_PATH} fill="currentColor" opacity="0.3" />
    <path d={HEART_PATH} fill="none" stroke="currentColor" strokeWidth="1.5" />
    <polyline
      points="4,13 8,13 10,9 12,16 14,11 16,13 20,13"
      fill="none"
      stroke="currentColor"
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
    <path d={HEART_PATH} fill="currentColor" />
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 23c-2.21 0-4-1.79-4-4 0-1.48.81-2.77 1.63-3.77l.77.77c.16.16.43.05.43-.18V13.5c0-.83.67-1.5 1.5-1.5.65 0 1.2.42 1.41 1A4.5 4.5 0 0116 19c0 2.21-1.79 4-4 4z"
      fill="currentColor"
      opacity="0.6"
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
      stroke="currentColor"
      strokeWidth="1.5"
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
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Lock body */}
    <rect x="9" y="11" width="6" height="5" rx="1" fill="currentColor" />
    {/* Lock shackle */}
    <path
      d="M10 11V9a2 2 0 114 0v2"
      stroke="currentColor"
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
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M20 4v4h-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 20v-4h4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Falling Heart SVG data URIs
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
