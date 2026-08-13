import { getTemperatureStatus, type TemperatureProgressThresholds } from './temperature-progress';

export interface ReadySignalDetectorState {
  eligible: boolean;
  ready: boolean;
  acknowledged: boolean;
}

export interface ReadySignalInput {
  saunaOn: boolean;
  controlTemperature: number | undefined;
  targetTemperature: number | undefined;
  thresholds: Partial<TemperatureProgressThresholds>;
}

export interface ReadySignalDetection {
  state: ReadySignalDetectorState;
  triggered: boolean;
}

export function createReadySignalDetectorState(): ReadySignalDetectorState {
  return {
    eligible: true,
    ready: false,
    acknowledged: false,
  };
}

export function acknowledgeReadySignal(state: ReadySignalDetectorState): ReadySignalDetectorState {
  return {
    ...state,
    acknowledged: true,
  };
}

export function detectReadySignalTransition(
  previousState: ReadySignalDetectorState,
  input: ReadySignalInput,
): ReadySignalDetection {
  if (!input.saunaOn) {
    return {
      state: createReadySignalDetectorState(),
      triggered: false,
    };
  }

  const ready = isReady(input);
  const resetByHysteresis = hasResetByHysteresis(input);
  const eligible = resetByHysteresis ? true : previousState.eligible;
  const acknowledged = resetByHysteresis ? false : previousState.acknowledged;
  const triggered = ready && eligible && !acknowledged && !previousState.ready;

  return {
    state: {
      eligible: triggered ? false : eligible,
      ready,
      acknowledged,
    },
    triggered,
  };
}

export function isReady(input: ReadySignalInput): boolean {
  if (!input.saunaOn) {
    return false;
  }

  return (
    getTemperatureStatus(input.controlTemperature, input.targetTemperature, input.thresholds) ===
    'target_reached'
  );
}

function hasResetByHysteresis(input: ReadySignalInput): boolean {
  if (input.controlTemperature === undefined || input.targetTemperature === undefined) {
    return false;
  }

  const nearTargetThreshold =
    typeof input.thresholds.nearTargetThreshold === 'number' &&
    Number.isFinite(input.thresholds.nearTargetThreshold)
      ? Math.max(0, input.thresholds.nearTargetThreshold)
      : 5;

  return input.controlTemperature < input.targetTemperature - nearTargetThreshold;
}
