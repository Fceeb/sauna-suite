import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  .content {
    display: grid;
    gap: 16px;
    padding: 16px;
  }

  .header {
    align-items: center;
    display: grid;
    gap: 12px;
    grid-template-columns: 1fr auto;
  }

  .title {
    color: var(--primary-text-color);
    font-size: 22px;
    font-weight: 700;
    line-height: 1.25;
  }

  .state {
    color: var(--secondary-text-color);
    font-size: 13px;
    margin-top: 4px;
  }

  .power-button,
  .step-button {
    align-items: center;
    background: var(--primary-color);
    border: 0;
    border-radius: 999px;
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-weight: 700;
    justify-content: center;
  }

  .power-button {
    height: 54px;
    min-width: 120px;
    padding: 0 18px;
  }

  .power-button.off {
    background: var(--disabled-color);
  }

  .power-button:disabled,
  .step-button:disabled,
  input:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .main {
    align-items: stretch;
    display: grid;
    gap: 16px;
    grid-template-columns: minmax(0, 1.3fr) minmax(220px, 0.7fr);
  }

  .hero-temperature {
    background: color-mix(in srgb, var(--primary-color) 10%, var(--card-background-color));
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    display: grid;
    gap: 12px;
    padding: 18px;
  }

  .label {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.3;
  }

  .value {
    color: var(--primary-text-color);
    font-size: 40px;
    font-weight: 750;
    line-height: 1;
  }

  .value.unavailable {
    color: var(--secondary-text-color);
    font-size: 20px;
    font-weight: 550;
  }

  .progress-track {
    background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    border-radius: 999px;
    height: 12px;
    overflow: hidden;
  }

  .progress-bar {
    border-radius: inherit;
    height: 100%;
    transition: width 160ms ease;
  }

  .status-line,
  .error {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.4;
  }

  .error {
    color: var(--error-color);
  }

  .grid {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  }

  .metric,
  .target-control,
  .trend-panel {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    display: grid;
    gap: 8px;
    padding: 12px;
  }

  .metric-value {
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: 650;
    line-height: 1.2;
  }

  .metric-value.unavailable {
    color: var(--secondary-text-color);
    font-size: 14px;
    font-weight: 500;
  }

  .target-actions {
    align-items: center;
    display: flex;
    gap: 10px;
  }

  .step-button {
    height: 40px;
    width: 40px;
  }

  input[type='range'] {
    accent-color: var(--primary-color);
    width: 100%;
  }

  .trend {
    display: block;
    height: 80px;
    width: 100%;
  }

  .trend-empty {
    color: var(--secondary-text-color);
    font-size: 13px;
    min-height: 48px;
  }

  @media (max-width: 640px) {
    .header,
    .main {
      grid-template-columns: 1fr;
    }

    .power-button {
      width: 100%;
    }
  }
`;
