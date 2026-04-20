import { NavLink } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-forest text-white"
      : "text-slate-700 hover:bg-white hover:text-forest"
  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest`;

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <NavLink to="/" className="text-xl font-bold text-forest">
            Urban Harvest Hub
          </NavLink>
          <p className="mt-1 text-sm text-slate-500">
            Eco-friendly products, workshops, and community events
          </p>
        </div>

        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/categories" className={navLinkClass}>
            Categories
          </NavLink>
          <NavLink to="/booking" className={navLinkClass}>
            Booking
          </NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
