import { css } from 'lit';

export const editorStyles = css`
  :host {
    display: block;
  }

  .form {
    display: grid;
    gap: 14px;
  }

  .section {
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    border-radius: 14px;
    padding: 10px 12px 12px;
  }

  summary {
    color: var(--primary-text-color);
    cursor: pointer;
    font-size: 14px;
    font-weight: 750;
    line-height: 1.3;
    margin-bottom: 8px;
  }

  summary:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 3px;
  }
`;
