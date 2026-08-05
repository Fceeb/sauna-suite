import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  .content {
    display: grid;
    gap: 12px;
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
`;
