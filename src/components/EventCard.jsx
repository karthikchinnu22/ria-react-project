import { useNavigate } from "react-router-dom";

function EventCard({ name, category, price, description }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <span className="tag">{category}</span>
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="price">₹{Number(price).toLocaleString("en-IN")}</p>
      <button onClick={() => navigate("/book", { state: { eventName: name } })}>
        Book Now
      </button>
    </div>
  );
}

export default EventCard;
