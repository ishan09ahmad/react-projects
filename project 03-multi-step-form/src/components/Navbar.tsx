import { NavLink } from "react-router";
import { nav } from "../utils/data.ts";

function Navbar() {
  return (
    <header className="sm:hidden flex items-center justify-center gap-4 py-2">
      <nav aria-label="Progress" className="flex items-center gap-4">
        {nav.map((item) => (
          <NavLink
            key={item.id}
            to={item.route}
            end={item.route === "/"}
            aria-label={`${item.step}: ${item.name}`}
            className={({ isActive }) =>
              `flex items-center justify-center rounded-full w-9 h-9 text-sm font-bold transition-colors ${
                isActive
                  ? "bg-[#BFE2FD] text-[#02295A] border-2 border-[#BFE2FD]"
                  : "bg-transparent text-white border-2 border-white"
              }`
            }
          >
            <span aria-hidden="true">{item.id}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
