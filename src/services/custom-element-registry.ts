export interface CustomElementRegistryLike {
  define(name: string, constructor: CustomElementConstructor): void;
  get(name: string): CustomElementConstructor | undefined;
}

export function defineCustomElement(
  registry: CustomElementRegistryLike,
  name: string,
  constructor: CustomElementConstructor,
): void {
  if (!registry.get(name)) {
    registry.define(name, constructor);
  }
}
