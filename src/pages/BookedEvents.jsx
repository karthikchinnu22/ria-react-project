import { Link } from "react-router-dom";

function BookedEvents({ bookings }) {
  return (
    <section className="bookings-page">
      <div className="bookings-heading">
        <div>
          <span className="hero-kicker">YOUR CELEBRATION PLANS</span>
          <h1 className="section-title">Booked Events</h1>
          <p>Keep track of the celebration requests you have sent us.</p>
        </div>
        <Link to="/book" className="btn">Book an event</Link>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-bookings">
          <span aria-hidden="true">✦</span>
          <h2>No bookings yet</h2>
          <p>Your booked celebrations will show up here once you submit a request.</p>
          <Link to="/events" className="btn">Explore events</Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <article className="booking-card" key={booking.id}>
              <div className="booking-card-heading">
                <div>
                  <span className="tag">{booking.event.category}</span>
                  <h2>{booking.event.name}</h2>
                </div>
                <span className="booking-status">Request received</span>
              </div>
              <dl className="booking-card-details">
                <div><dt>Event date</dt><dd>{new Date(`${booking.date}T00:00:00`).toLocaleDateString()}</dd></div>
                <div><dt>Guests</dt><dd>{booking.guests}</dd></div>
                <div><dt>Booked by</dt><dd>{booking.name}</dd></div>
                <div><dt>Email</dt><dd>{booking.email}</dd></div>
                <div><dt>Phone</dt><dd>{booking.phone || "Not provided"}</dd></div>
                <div>
                  <dt>Package price</dt>
                  <dd>₹{Number(booking.event.price).toLocaleString("en-IN")}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default BookedEvents;
