import React from 'react';

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

export default DetailsPanel;
