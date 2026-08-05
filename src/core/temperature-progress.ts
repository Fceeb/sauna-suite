export const TEMPERATURE_STATUSES = [
  'unavailable',
  'far_below',
  'heating',
  'near_target',
  'target_reached',
  'above_target',
] as const;

export type TemperatureStatus = (typeof TEMPERATURE_STATUSES)[number];

export interface TemperatureProgressThresholds {
  nearTargetThreshold: number;
  targetReachedTolerance: number;
  aboveTargetThreshold: number;
}

export interface TemperatureProgress {
  difference?: number | undefined;
  progress: number;
  status: TemperatureStatus;
}

export interface TemperatureStatusColors {
  line: string;
  fill: string;
}

export const DEFAULT_TEMPERATURE_THRESHOLDS: TemperatureProgressThresholds = {
  nearTargetThreshold: 5,
  targetReachedTolerance: 2,
  aboveTargetThreshold: 2,
};

export const TEMPERATURE_STATUS_COLORS: Record<TemperatureStatus, TemperatureStatusColors> = {
  unavailable: {
    line: 'var(--disabled-text-color)',
    fill: 'rgba(128, 128, 128, 0.12)',
  },
  far_below: {
    line: '#3f8cff',
    fill: 'rgba(63, 140, 255, 0.16)',
  },
  heating: {
    line: '#22c7d8',
    fill: 'rgba(34, 199, 216, 0.16)',
  },
  near_target: {
    line: '#2fb86f',
    fill: 'rgba(47, 184, 111, 0.16)',
  },
  target_reached: {
    line: '#d7b339',
    fill: 'rgba(215, 179, 57, 0.18)',
  },
  above_target: {
    line: '#e45d3f',
    fill: 'rgba(228, 93, 63, 0.18)',
  },
};

export function calculateTemperatureDifferenceToTarget(
  controlTemperature: number | undefined,
  targetTemperature: number | undefined,
): number | undefined {
  if (controlTemperature === undefined || targetTemperature === undefined) {
    return undefined;
  }

  return controlTemperature - targetTemperature;
}

export function normalizeTemperatureThresholds(
  thresholds: Partial<TemperatureProgressThresholds>,
): TemperatureProgressThresholds {
  const nearTargetThreshold = normalizePositive(
    thresholds.nearTargetThreshold,
    DEFAULT_TEMPERATURE_THRESHOLDS.nearTargetThreshold,
  );
  const targetReachedTolerance = normalizePositive(
    thresholds.targetReachedTolerance,
    DEFAULT_TEMPERATURE_THRESHOLDS.targetReachedTolerance,
  );

  return {
    nearTargetThreshold,
    targetReachedTolerance,
    aboveTargetThreshold: Math.max(
      targetReachedTolerance,
      normalizePositive(
        thresholds.aboveTargetThreshold,
        DEFAULT_TEMPERATURE_THRESHOLDS.aboveTargetThreshold,
      ),
    ),
  };
}

export function getTemperatureStatus(
  controlTemperature: number | undefined,
  targetTemperature: number | undefined,
  thresholds: Partial<TemperatureProgressThresholds>,
): TemperatureStatus {
  const difference = calculateTemperatureDifferenceToTarget(controlTemperature, targetTemperature);

  if (difference === undefined) {
    return 'unavailable';
  }

  const normalizedThresholds = normalizeTemperatureThresholds(thresholds);

  if (difference < -20) {
    return 'far_below';
  }

  if (difference <= -normalizedThresholds.nearTargetThreshold) {
    return 'heating';
  }

  if (difference < 0) {
    return 'near_target';
  }

  if (difference <= normalizedThresholds.aboveTargetThreshold) {
    return 'target_reached';
  }

  return 'above_target';
}

export function calculateNormalizedHeatingProgress(
  controlTemperature: number | undefined,
  targetTemperature: number | undefined,
): number {
  if (
    controlTemperature === undefined ||
    targetTemperature === undefined ||
    targetTemperature <= 0
  ) {
    return 0;
  }

  return Math.min(Math.max(controlTemperature / targetTemperature, 0), 1);
}

export function calculateTemperatureProgress(
  controlTemperature: number | undefined,
  targetTemperature: number | undefined,
  thresholds: Partial<TemperatureProgressThresholds>,
): TemperatureProgress {
  return {
    difference: calculateTemperatureDifferenceToTarget(controlTemperature, targetTemperature),
    progress: calculateNormalizedHeatingProgress(controlTemperature, targetTemperature),
    status: getTemperatureStatus(controlTemperature, targetTemperature, thresholds),
  };
}

export function getTemperatureStatusColors(status: TemperatureStatus): TemperatureStatusColors {
  return TEMPERATURE_STATUS_COLORS[status];
}

export function getProgressColorStops(status: TemperatureStatus): readonly string[] {
  const colors = getTemperatureStatusColors(status);
  return [colors.fill, colors.line];
}

function normalizePositive(value: number | undefined, fallback: number): number {
  if (value === undefined || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(0, value);
}
