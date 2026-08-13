import { describe, expect, it } from 'vitest';

import {
  acknowledgeReadySignal,
  createReadySignalDetectorState,
  detectReadySignalTransition,
} from './ready-signal';

describe('ready signal detector', () => {
  it('triggers only on the not-ready to ready transition', () => {
    let state = createReadySignalDetectorState();

    let detection = detectReadySignalTransition(state, input(76));
    expect(detection.triggered).toBe(false);
    state = detection.state;

    detection = detectReadySignalTransition(state, input(80));
    expect(detection.triggered).toBe(true);
    state = detection.state;

    detection = detectReadySignalTransition(state, input(81));
    expect(detection.triggered).toBe(false);
  });

  it('does not retrigger until hysteresis resets eligibility', () => {
    let state = detectReadySignalTransition(createReadySignalDetectorState(), input(80)).state;

    state = detectReadySignalTransition(state, input(78)).state;
    expect(detectReadySignalTransition(state, input(80)).triggered).toBe(false);

    state = detectReadySignalTransition(state, input(74)).state;
    expect(detectReadySignalTransition(state, input(80)).triggered).toBe(true);
  });

  it('resets when the sauna is switched off', () => {
    let state = detectReadySignalTransition(createReadySignalDetectorState(), input(80)).state;

    state = detectReadySignalTransition(state, { ...input(80), saunaOn: false }).state;

    expect(detectReadySignalTransition(state, input(80)).triggered).toBe(true);
  });

  it('does not trigger an acknowledged ready event until reset', () => {
    let state = detectReadySignalTransition(createReadySignalDetectorState(), input(80)).state;
    state = acknowledgeReadySignal(state);

    expect(detectReadySignalTransition(state, input(81)).triggered).toBe(false);
  });
});

function input(controlTemperature: number) {
  return {
    saunaOn: true,
    controlTemperature,
    targetTemperature: 80,
    thresholds: {
      nearTargetThreshold: 5,
      targetReachedTolerance: 2,
    },
  };
}
