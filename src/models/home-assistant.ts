export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  language?: string;
  selectedLanguage?: string;
  states: Record<string, HassEntity>;
  localize?: (key: string, ...args: unknown[]) => string;
  callService?: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => Promise<void>;
  callApi?: <T>(method: string, path: string) => Promise<T>;
}
