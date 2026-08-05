import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  .content {
    display: grid;
    gap: 14px;
    padding: 16px;
  }

  .eyebrow {
    color: var(--secondary-text-color);
    font-size: 12px;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .title {
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
  }

  .description {
    color: var(--secondary-text-color);
    font-size: 14px;
    line-height: 1.5;
  }

  .grid {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .metric {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    display: grid;
    gap: 4px;
    min-height: 72px;
    padding: 10px 12px;
  }

  .metric-label {
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 1.3;
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

  .status {
    align-items: center;
    color: var(--warning-color, #f4b740);
    display: flex;
    font-size: 13px;
    font-weight: 600;
    gap: 8px;
  }
`;
