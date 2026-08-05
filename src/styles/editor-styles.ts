import { css } from 'lit';

export const editorStyles = css`
  :host {
    display: block;
  }

  .form {
    display: grid;
    gap: 12px;
  }

  label {
    color: var(--primary-text-color);
    display: grid;
    font-size: 14px;
    gap: 6px;
  }

  input {
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    box-sizing: border-box;
    color: var(--primary-text-color);
    font: inherit;
    min-height: 40px;
    padding: 8px 10px;
    width: 100%;
  }
`;
