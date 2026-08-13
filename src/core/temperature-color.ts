import {
  calculateTemperatureProgress,
  normalizeTemperatureThresholds,
  type TemperatureProgressThresholds,
  type TemperatureStatus,
} from './temperature-progress';

export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

export interface HsColor {
  hue: number;
  saturation: number;
}

export interface SemanticTemperatureColor {
  rgb: RgbColor;
  hs: HsColor;
  status: TemperatureStatus;
}

export const READY_SIGNAL_RGB_COLORS = {
  green: { red: 42, green: 202, blue: 116 },
  gold: { red: 238, green: 185, blue: 58 },
  red: { red: 232, green: 80, blue: 56 },
  blue: { red: 63, green: 140, blue: 255 },
  purple: { red: 158, green: 111, blue: 255 },
  white: { red: 255, green: 244, blue: 224 },
} as const;

export type ReadyNamedColor = keyof typeof READY_SIGNAL_RGB_COLORS;

const BLUE: RgbColor = { red: 63, green: 140, blue: 255 };
const CYAN: RgbColor = { red: 34, green: 199, blue: 216 };
const GREEN: RgbColor = { red: 47, green: 184, blue: 111 };
const YELLOW: RgbColor = { red: 235, green: 205, blue: 74 };
const GOLD: RgbColor = { red: 215, green: 179, blue: 57 };
const ORANGE: RgbColor = { red: 236, green: 134, blue: 50 };
const RED: RgbColor = { red: 228, green: 93, blue: 63 };
const UNAVAILABLE: RgbColor = { red: 128, green: 128, blue: 128 };

export function getTemperatureSemanticColor(
  controlTemperature: number | undefined,
  targetTemperature: number | undefined,
  thresholds: Partial<TemperatureProgressThresholds>,
): SemanticTemperatureColor {
  const progress = calculateTemperatureProgress(controlTemperature, targetTemperature, thresholds);
  const normalizedThresholds = normalizeTemperatureThresholds(thresholds);
  const rgb =
    progress.difference === undefined
      ? UNAVAILABLE
      : mapDifferenceToRgb(
          progress.difference,
          normalizedThresholds.nearTargetThreshold,
          normalizedThresholds.targetReachedTolerance,
        );

  return {
    rgb,
    hs: rgbToHs(rgb),
    status: progress.status,
  };
}

export function normalizeReadyColor(color: string | undefined): RgbColor {
  if (color && color in READY_SIGNAL_RGB_COLORS) {
    return READY_SIGNAL_RGB_COLORS[color as ReadyNamedColor];
  }

  return READY_SIGNAL_RGB_COLORS.green;
}

export function normalizeRgbColor(color: Partial<RgbColor>): RgbColor {
  return {
    red: clampColorChannel(color.red),
    green: clampColorChannel(color.green),
    blue: clampColorChannel(color.blue),
  };
}

export function rgbToArray(color: RgbColor): [number, number, number] {
  const normalized = normalizeRgbColor(color);
  return [normalized.red, normalized.green, normalized.blue];
}

export function rgbToHs(color: RgbColor): HsColor {
  const normalized = normalizeRgbColor(color);
  const red = normalized.red / 255;
  const green = normalized.green / 255;
  const blue = normalized.blue / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;

  if (delta === 0) {
    return { hue: 0, saturation: 0 };
  }

  let hue: number;
  if (maximum === red) {
    hue = ((green - blue) / delta) % 6;
  } else if (maximum === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  hue = Math.round(hue * 60);
  if (hue < 0) {
    hue += 360;
  }

  return {
    hue,
    saturation: Number(((delta / maximum) * 100).toFixed(1)),
  };
}

function mapDifferenceToRgb(
  difference: number,
  nearTargetThreshold: number,
  targetReachedTolerance: number,
): RgbColor {
  if (difference < -20) {
    return BLUE;
  }

  if (difference <= -nearTargetThreshold) {
    const span = Math.max(1, 20 - nearTargetThreshold);
    const progress = clampRatio((difference + 20) / span);
    return progress < 0.5
      ? interpolateRgb(BLUE, CYAN, progress * 2)
      : interpolateRgb(CYAN, GREEN, (progress - 0.5) * 2);
  }

  if (difference < -targetReachedTolerance) {
    const span = Math.max(1, nearTargetThreshold - targetReachedTolerance);
    return interpolateRgb(GREEN, YELLOW, clampRatio((difference + nearTargetThreshold) / span));
  }

  if (difference <= targetReachedTolerance) {
    return GOLD;
  }

  return interpolateRgb(ORANGE, RED, clampRatio((difference - targetReachedTolerance) / 20));
}

function interpolateRgb(start: RgbColor, end: RgbColor, ratio: number): RgbColor {
  const clampedRatio = clampRatio(ratio);

  return {
    red: Math.round(start.red + (end.red - start.red) * clampedRatio),
    green: Math.round(start.green + (end.green - start.green) * clampedRatio),
    blue: Math.round(start.blue + (end.blue - start.blue) * clampedRatio),
  };
}

function clampRatio(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), 1);
}

function clampColorChannel(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) {
    return 0;
  }

  return Math.round(Math.min(Math.max(value, 0), 255));
}
