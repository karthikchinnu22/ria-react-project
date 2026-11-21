import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";

function Events({ events }) {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("category") || "");

  const filtered = events.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="section-title">Event Catalog</h2>
      <input
        className="search"
        type="text"
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map((e) => (
          <EventCard
            key={e.id}
            name={e.name}
            category={e.category}
            price={e.price}
            description={e.description}
          />
        ))}
      </div>

      {filtered.length === 0 && <p className="empty">No events found. Try a different search.</p>}
    </div>
  );
}

export default Events;
