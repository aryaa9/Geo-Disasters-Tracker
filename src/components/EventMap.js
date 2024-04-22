// src/components/EventMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const EventMap = ({ events, onEventSelect, getIcon }) => (
  <MapContainer center={[0, 0]} zoom={2} className="map-container">
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {events.map(event => (
      <Marker
        key={event.id}
        position={[event.geometry[0].coordinates[1], event.geometry[0].coordinates[0]]}
        icon={getIcon(event)}
        eventHandlers={{ click: () => onEventSelect(event) }}
      >
        <Popup>
          <strong>{event.title}</strong><br />
          Date: {new Date(event.geometry[0].date).toLocaleDateString()}<br />
          <a href={event.sources[0].url} target="_blank" rel="noopener noreferrer">More Info</a>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default EventMap;
