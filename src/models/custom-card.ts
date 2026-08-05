export interface CustomCardMetadata {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
}

declare global {
  interface Window {
    customCards?: CustomCardMetadata[];
  }
}
