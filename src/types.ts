// src/types.ts
export interface NaturalEvent {
    id: string;
    geometry: Array<{
      coordinates: [number, number];
      date: string;
    }>;
    title: string;
    sources: Array<{
      url: string;
    }>;
  }
  