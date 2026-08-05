import { css } from 'lit';

export const editorStyles = css`
  :host {
    display: block;
  }

  .form {
    display: grid;
    gap: 18px;
  }

  .section {
    display: grid;
    gap: 8px;
  }

  h3 {
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
  }
`;
