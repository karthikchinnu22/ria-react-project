import { Link } from "react-router-dom";

const categories = [
  { name: "Birthday", icon: "🎂", text: "Fun-filled parties for every age." },
  { name: "Haldi", icon: "🌼", text: "Bright and traditional Haldi setups." },
  { name: "Marriage", icon: "💍", text: "Grand weddings planned end to end." },
  { name: "Baby Shower", icon: "🍼", text: "Sweet, soft celebrations for the little one." },
];

function Home() {
  return (
    <div>
      <section className="hero">
        <span className="hero-kicker">MADE FOR YOUR BIG MOMENTS</span>
        <h1>Good times, beautifully planned.</h1>
        <p>
          From the first idea to the final dance, find a celebration package
          that feels like you. Choose your favorite and let us handle the details.
        </p>
        <Link to="/events" className="btn">Explore the celebrations <span aria-hidden="true">→</span></Link>
        <div className="hero-note">Thoughtful details <span>·</span> Joyful gatherings <span>·</span> Your kind of party</div>
      </section>

      <h2 className="section-title">Our Celebrations</h2>
      <div className="grid">
        {categories.map((c) => (
          <Link
            key={c.name}
            to={`/events?category=${encodeURIComponent(c.name)}`}
            className="card category"
          >
            <div className="icon">{c.icon}</div>
            <h3>{c.name}</h3>
            <p>{c.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
