import { describe, expect, it } from 'vitest';

import { CARD_TAG, EDITOR_TAG, TEMPERATURE_TREND_TAG } from '../models/constants';
import { defineCustomElement, type CustomElementRegistryLike } from './custom-element-registry';

const TestCardElement = class {} as CustomElementConstructor;
const TestEditorElement = class {} as CustomElementConstructor;
const TestTrendElement = class {} as CustomElementConstructor;

function createRegistry(): CustomElementRegistryLike & { defineCount: number } {
  const definitions = new Map<string, CustomElementConstructor>();

  return {
    defineCount: 0,
    define(name: string, constructor: CustomElementConstructor): void {
      if (definitions.has(name)) {
        throw new Error(`Custom element already defined: ${name}`);
      }

      definitions.set(name, constructor);
      this.defineCount += 1;
    },
    get(name: string): CustomElementConstructor | undefined {
      return definitions.get(name);
    },
  };
}

function registerBundleElements(registry: CustomElementRegistryLike): void {
  defineCustomElement(registry, CARD_TAG, TestCardElement);
  defineCustomElement(registry, EDITOR_TAG, TestEditorElement);
  defineCustomElement(registry, TEMPERATURE_TREND_TAG, TestTrendElement);
}

describe('custom element registry guard', () => {
  it('does not throw when the bundle registration runs twice', () => {
    const registry = createRegistry();

    expect(() => {
      registerBundleElements(registry);
      registerBundleElements(registry);
    }).not.toThrow();

    expect(registry.defineCount).toBe(3);
  });
});
