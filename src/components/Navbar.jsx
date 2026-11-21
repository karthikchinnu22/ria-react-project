import { NavLink } from "react-router-dom";

function Navbar({ bookingCount }) {
  return (
    <header className="navbar">
      <h2 className="logo">CelebrationCraft</h2>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/book">Book</NavLink>
        <NavLink to="/booked">Booked Events <span className="nav-count">{bookingCount}</span></NavLink>
        <NavLink to="/create">Add Event</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
