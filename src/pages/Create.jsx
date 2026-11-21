import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create({ addEvent }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Birthday");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || price === "" || Number(price) <= 0 || description.trim() === "") {
      setError("Please fill all fields with valid values.");
      return;
    }

    addEvent({ name: name.trim(), category, price: Number(price), description: description.trim() });
    navigate("/events");
  };

  return (
    <div className="form-box">
      <h2>Add Custom Celebration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Theme Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jungle Safari Party" />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Birthday</option>
          <option>Haldi</option>
          <option>Marriage</option>
          <option>Baby Shower</option>
          <option>Other</option>
        </select>

        <label>Base Price (₹)</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 25000" />

        <label>Description</label>
        <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short details about the package" />

        {error && <span className="error">{error}</span>}
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default Create;
