import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import Booking from "./pages/Booking.jsx";
import BookedEvents from "./pages/BookedEvents.jsx";
import Create from "./pages/Create.jsx";

const initialEvents = [
  { id: 1, name: "Birthday Bash", category: "Birthday", price: 15000, description: "Decor, cake table, games and music for all ages." },
  { id: 2, name: "Haldi Ceremony", category: "Haldi", price: 20000, description: "Yellow floral setup, props and photo corner." },
  { id: 3, name: "Royal Wedding", category: "Marriage", price: 150000, description: "Stage, mandap, lighting and full guest hospitality." },
  { id: 4, name: "Baby Shower", category: "Baby Shower", price: 18000, description: "Pastel theme decor, games and return gifts." },
  { id: 5, name: "Kids Theme Party", category: "Birthday", price: 22000, description: "Cartoon themed decor with a magician and balloons." },
  { id: 6, name: "Floral Haldi Special", category: "Haldi", price: 28000, description: "Marigold decor, swings and traditional seating." },
];

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [bookings, setBookings] = useState(() => {
    try {
      const savedBookings = localStorage.getItem("celebrationcraft-bookings");
      return savedBookings ? JSON.parse(savedBookings) : [];
    } catch (error) {
      console.error("Could not load saved bookings.", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("celebrationcraft-bookings", JSON.stringify(bookings));
    } catch (error) {
      console.error("Could not save bookings on this device.", error);
    }
  }, [bookings]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const addBooking = (booking) => {
    setBookings((currentBookings) => [
      { ...booking, id: `${Date.now()}-${currentBookings.length}` },
      ...currentBookings,
    ]);
  };

  return (
    <div>
      <Navbar bookingCount={bookings.length} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events events={events} />} />
          <Route path="/book" element={<Booking events={events} addBooking={addBooking} />} />
          <Route path="/booked" element={<BookedEvents bookings={bookings} />} />
          <Route path="/create" element={<Create addEvent={addEvent} />} />
        </Routes>
      </main>
      <footer className="footer">© 2026 CelebrationCraft</footer>
    </div>
  );
}

export default App;
