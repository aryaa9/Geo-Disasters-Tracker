import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './FloodMapStyles.css';

const wildfireIcon = L.divIcon({
  className: 'wildfire-icon',
  html: '🔥',
  iconSize: [30, 30]
});

const volcanoIcon = L.divIcon({
  className: 'volcano-icon',
  html: '🌋',
  iconSize: [30, 30]
});


interface NaturalEvent {
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

interface DetailsPanelProps {
  event: NaturalEvent | null;
  closePanel: () => void;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ event, closePanel }) => {
  if (!event) return null;

  return (
    <div className="details-panel">
      <button onClick={closePanel}>Close</button>
      <h2>{event.title}</h2>
      <p>Date: {new Date(event.geometry[0].date).toLocaleDateString()}</p>
      <p>Location: {event.geometry[0].coordinates.join(', ')}</p>
      <a href={event.sources[0].url} target="_blank" rel="noopener noreferrer">More Info</a>
      {/* Add more details and images here */}
    </div>
  );
};

interface FilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const EventFilter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  return (
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="all">All Events</option>
      <option value="wildfires">Wildfires</option>
      <option value="volcanoes">Volcanoes</option>
    </select>
  );
};

const FloodMap = () => {
  const [wildfireEvents, setWildfireEvents] = useState<NaturalEvent[]>([]);
  const [volcanoEvents, setVolcanoEvents] = useState<NaturalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<NaturalEvent | null>(null);
  const [filter, setFilter] = useState('all');



  useEffect(() => {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires')
      .then(response => response.json())
      .then(data => {
        console.log('Wildfire Events:', data.events);
        setWildfireEvents(data.events);
      });
  }, []);

  useEffect(() => {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events?category=volcanoes')
      .then(response => response.json())
      .then(data => {
        console.log('Volcano Events:', data.events);
        setVolcanoEvents(data.events);
      });
  }, []);

  const filteredEvents = (): NaturalEvent[] => {
    switch (filter) {
      case 'all':
        return [ ...wildfireEvents, ...volcanoEvents];
      case 'wildfires':
        return wildfireEvents;
      case 'volcanoes':
        return volcanoEvents;
      default:
        return [];
    }
  };

  const getIcon = (event: NaturalEvent) => {
    if (event.title.toLowerCase().includes('wildfire')) {
      return wildfireIcon;
    } else if (event.title.toLowerCase().includes('volcano')) {
      return volcanoIcon;
    } 
    return wildfireIcon; // Default icon
  };
  

  return (
    <div>
      <EventFilter filter={filter} setFilter={setFilter} />
      <MapContainer center={[0, 0]} zoom={2} className="map-container">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredEvents().map(event => (
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
  );
        }

export default FloodMap;
