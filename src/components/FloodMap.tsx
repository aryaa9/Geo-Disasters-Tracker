// src/components/FloodMap.tsx
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import EventFilter from './EventFilter';
import DetailsPanel from './DetailsPanel';
import { EventService } from '../components/EventService';
import { NaturalEvent } from '../types'; // Ensure the path is correct

const FloodMap = () => {
  const [events, setEvents] = useState<NaturalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<NaturalEvent | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (filter === 'all') {
      Promise.all([EventService.fetchWildfires(), EventService.fetchVolcanoes()])
        .then(([wildfires, volcanoes]) => setEvents([...wildfires, ...volcanoes]));
    } else {
      const fetchFunc = filter === 'wildfires' ? EventService.fetchWildfires : EventService.fetchVolcanoes;
      fetchFunc().then(setEvents);
    }
  }, [filter]);

  const getIcon = (event: NaturalEvent) => {
    return event.title.toLowerCase().includes('wildfire') ? L.divIcon({
      className: 'wildfire-icon',
      html: '🔥',
      iconSize: [30, 30]
    }) : L.divIcon({
      className: 'volcano-icon',
      html: '🌋',
      iconSize: [30, 30]
    });
  };

  return (
    <div className={selectedEvent ? 'details-panel-active' : ''}>
      <EventFilter filter={filter} setFilter={setFilter} />
      <div className="map-and-details-container">
        <MapContainer center={[0, 0]} zoom={2} className="map-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {events.map(event => (
            <Marker
              key={event.id}
              position={[event.geometry[0].coordinates[1], event.geometry[0].coordinates[0]]}
              icon={getIcon(event)}
              eventHandlers={{
                click: () => {
                  setSelectedEvent(event);
                },
              }}
            >
              <Popup>
                <strong>{event.title}</strong><br />
                Date: {new Date(event.geometry[0].date).toLocaleDateString()}<br />
                <a href={event.sources[0].url} target="_blank" rel="noopener noreferrer">More Info</a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <DetailsPanel event={selectedEvent} closePanel={() => setSelectedEvent(null)} />
      </div>
    </div>
  );
};

export default FloodMap;
