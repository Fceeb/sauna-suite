import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    background: var(--ha-card-background, var(--card-background-color));
    border-radius: var(--ha-card-border-radius, 18px);
    box-shadow: var(--ha-card-box-shadow, 0 10px 28px rgba(0, 0, 0, 0.08));
    overflow: hidden;
  }

  .content {
    color: var(--primary-text-color);
    display: grid;
    gap: 14px;
    padding: 16px;
  }

  .header {
    align-items: center;
    display: grid;
    gap: 12px;
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .brand-mark {
    align-items: center;
    background: color-mix(in srgb, var(--sauna-status-line) 14%, transparent);
    border-radius: 16px;
    color: var(--sauna-status-line);
    display: inline-flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }

  .brand-mark svg,
  .power-icon svg {
    display: block;
    fill: none;
    height: 22px;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.9;
    width: 22px;
  }

  .header-copy {
    min-width: 0;
  }

  .title {
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: 750;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .state,
  .label,
  .status-line,
  .difference,
  .error {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.35;
  }

  .state {
    margin-top: 3px;
  }

  .power-button,
  .step-button {
    align-items: center;
    border: 0;
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-weight: 700;
    justify-content: center;
  }

  .power-button {
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    border-radius: 999px;
    color: var(--primary-color);
    gap: 8px;
    min-height: 42px;
    min-width: 108px;
    padding: 0 14px;
  }

  .power-button.on {
    background: color-mix(in srgb, var(--accent-color, var(--primary-color)) 18%, transparent);
    color: var(--accent-color, var(--primary-color));
  }

  .power-button.off {
    background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
    color: var(--secondary-text-color);
  }

  .power-button:disabled,
  .step-button:disabled,
  input:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }

  .hero,
  .target-control,
  .trend-panel {
    background:
      linear-gradient(135deg, var(--sauna-status-fill), transparent 46%),
      color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    border-radius: 18px;
    display: grid;
    gap: 14px;
    padding: 16px;
  }

  .hero {
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 72%, transparent);
  }

  .hero-main {
    align-items: end;
    display: grid;
    gap: 16px;
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .hero-value,
  .target-value,
  .target-current,
  .tile-value {
    align-items: baseline;
    color: var(--primary-text-color);
    display: inline-flex;
    font-variant-numeric: tabular-nums;
    gap: 5px;
    letter-spacing: 0;
  }

  .hero-value {
    margin-top: 5px;
  }

  .hero-number {
    font-size: 58px;
    font-weight: 820;
    line-height: 0.95;
  }

  .hero-unit {
    color: var(--secondary-text-color);
    font-size: 24px;
    font-weight: 700;
  }

  .target-summary {
    background: color-mix(
      in srgb,
      var(--ha-card-background, var(--card-background-color)) 72%,
      transparent
    );
    border-radius: 16px;
    min-width: 116px;
    padding: 12px;
  }

  .target-value span,
  .target-current span {
    font-size: 28px;
    font-weight: 780;
  }

  .target-value small,
  .target-current small,
  .tile-value small {
    color: var(--secondary-text-color);
    font-size: 0.58em;
    font-weight: 650;
  }

  .unavailable {
    color: var(--secondary-text-color);
  }

  .progress-track {
    background: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
    border-radius: 999px;
    height: 10px;
    overflow: hidden;
  }

  .progress-bar {
    background: linear-gradient(90deg, var(--sauna-status-fill), var(--sauna-status-line));
    border-radius: inherit;
    height: 100%;
    min-width: 6px;
    transition: width 160ms ease;
  }

  .hero-meta {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
  }

  .status-chip {
    align-items: center;
    color: var(--primary-text-color);
    display: inline-flex;
    font-size: 13px;
    font-weight: 700;
    gap: 7px;
    line-height: 1.35;
  }

  .status-dot {
    background: var(--sauna-status-line);
    border-radius: 999px;
    box-shadow: 0 0 0 4px var(--sauna-status-fill);
    height: 8px;
    width: 8px;
  }

  .zones {
    display: grid;
    gap: 10px;
  }

  .zone-grid,
  .secondary-grid {
    display: grid;
    gap: 10px;
  }

  .zone-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .secondary-grid {
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  }

  .temperature-tile {
    background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    border-radius: 16px;
    display: grid;
    gap: 7px;
    min-width: 0;
    padding: 12px;
  }

  .temperature-tile.subtle {
    background: transparent;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 64%, transparent);
  }

  .tile-value span {
    font-size: 21px;
    font-weight: 760;
    line-height: 1.05;
  }

  .trend-panel {
    gap: 10px;
    padding-bottom: 12px;
  }

  .section-heading {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .trend {
    color: color-mix(in srgb, var(--secondary-text-color) 72%, transparent);
    display: block;
    height: 78px;
    width: 100%;
  }

  .target-reference-line {
    opacity: 0.72;
  }

  .trend-empty {
    color: var(--secondary-text-color);
    font-size: 13px;
    min-height: 42px;
  }

  .target-control {
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  }

  .target-header {
    align-items: center;
    display: grid;
    gap: 12px;
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .target-actions {
    align-items: center;
    display: flex;
    gap: 8px;
  }

  .step-button {
    background: color-mix(in srgb, var(--primary-color) 13%, transparent);
    border-radius: 14px;
    color: var(--primary-color);
    font-size: 20px;
    height: 38px;
    line-height: 1;
    width: 42px;
  }

  input[type='range'] {
    accent-color: var(--primary-color);
    width: 100%;
  }

  .error {
    color: var(--error-color);
  }

  @media (max-width: 560px) {
    .content {
      gap: 12px;
      padding: 14px;
    }

    .header {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .power-button {
      grid-column: 1 / -1;
      width: 100%;
    }

    .hero-main,
    .target-header {
      grid-template-columns: 1fr;
    }

    .target-summary {
      min-width: 0;
    }

    .hero-number {
      font-size: 48px;
    }

    .zone-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .progress-bar {
      transition: none;
    }
  }
`;
