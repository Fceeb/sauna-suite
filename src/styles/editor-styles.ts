import { css } from 'lit';

export const editorStyles = css`
  :host {
    display: block;
  }

  .form {
    display: grid;
    gap: 16px;
  }

  .fallback {
    color: var(--secondary-text-color);
    font-size: 14px;
    line-height: 1.5;
  }
`;
