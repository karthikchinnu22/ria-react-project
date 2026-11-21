import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Booking({ events, addBooking }) {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState(location.state?.eventName || "");
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (name.trim() === "") newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!/^\+?[\d\s().-]+$/.test(phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      newErrors.phone = "Enter a valid phone number (7–15 digits)";
    }
    if (date === "") newErrors.date = "Please select an event date";
    if (guests === "" || Number(guests) <= 0) newErrors.guests = "Enter a valid guest count";
    if (eventType === "") newErrors.eventType = "Please select a celebration type";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newBooking = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date,
        guests,
        event: events.find((event) => event.name === eventType),
      };
      addBooking(newBooking);
      setBooking(newBooking);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setGuests("");
    setEventType("");
    setErrors({});
    setBooking(null);
  };

  if (booking) {
    return (
      <div className="form-box success">
        <span className="booking-confirmation-icon" aria-hidden="true">✓</span>
        <h2>Booking request received!</h2>
        <p>Thanks, {booking.name}. Here are the details you submitted:</p>
        <dl className="booking-summary">
          <div><dt>Celebration</dt><dd>{booking.event.name}</dd></div>
          <div><dt>Category</dt><dd>{booking.event.category}</dd></div>
          <div><dt>Event date</dt><dd>{booking.date}</dd></div>
          <div><dt>Guests</dt><dd>{booking.guests}</dd></div>
          <div><dt>Gmail address</dt><dd>{booking.email}</dd></div>
          <div><dt>Phone number</dt><dd>{booking.phone}</dd></div>
          <div>
            <dt>Package price</dt>
            <dd>₹{Number(booking.event.price).toLocaleString("en-IN")}</dd>
          </div>
        </dl>
        <p className="booking-follow-up">Our team will contact you about the next steps.</p>
        <Link to="/booked" className="btn confirmation-bookings-link">View booked events</Link>
        <button onClick={resetForm}>Make Another Booking</button>
      </div>
    );
  }

  return (
    <div className="form-box">
      <h2>Book Your Celebration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="booking-name">Your Name</label>
        <input id="booking-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        {errors.name && <span className="error">{errors.name}</span>}

        <label htmlFor="booking-email">Gmail Address</label>
        <input id="booking-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@gmail.com" />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="booking-phone">Phone Number</label>
        <input id="booking-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +91 98765 43210" />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label htmlFor="booking-date">Event Date</label>
        <input id="booking-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {errors.date && <span className="error">{errors.date}</span>}

        <label htmlFor="booking-guests">Number of Guests</label>
        <input id="booking-guests" type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="e.g. 100" />
        {errors.guests && <span className="error">{errors.guests}</span>}

        <label htmlFor="booking-event">Celebration Type</label>
        <select id="booking-event" value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="">-- Select --</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.name}>{ev.name}</option>
          ))}
        </select>
        {errors.eventType && <span className="error">{errors.eventType}</span>}

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}

export default Booking;
