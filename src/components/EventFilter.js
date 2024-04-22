// src/components/EventFilter.js
import React from 'react';

const EventFilter = ({ filter, setFilter }) => {
  return (
    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="event-filter-select">
      <option value="all">All Events</option>
      <option value="wildfires">Wildfires</option>
      <option value="volcanoes">Volcanoes</option>
    </select>
  );
};

export default EventFilter;
