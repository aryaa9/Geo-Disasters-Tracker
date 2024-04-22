// src/services/EventService.ts
import { NaturalEvent } from '../types';  // adjust the path as necessary

const fetchEvents = async (category: string): Promise<NaturalEvent[]> => {
  const url = `https://eonet.gsfc.nasa.gov/api/v3/events?category=${category}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.events as NaturalEvent[];
};

export const EventService = {
  fetchWildfires: () => fetchEvents('wildfires'),
  fetchVolcanoes: () => fetchEvents('volcanoes')
};
