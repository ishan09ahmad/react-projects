import { NavLink } from "react-router";
import { nav } from "../utils/data.ts";

export default function Sidebar() {
  return (
    <aside className="hidden sm:block shrink-0 w-68 min-h-142 bg-[url(/src/assets/bg-sidebar-desktop.svg)] bg-no-repeat bg-cover bg-center rounded-xl p-8">
      <div className="flex flex-col gap-8">
        {nav.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <NavLink
              to={item.route}
              className={({ isActive }) =>
                `shrink-0 rounded-full flex items-center justify-center w-9 h-9 text-sm font-bold border transition-colors ${
                  isActive
                    ? "bg-[#BFE2FD] text-[#02295A] border-[#BFE2FD]"
                    : "bg-transparent text-white border-[#BFE2FD]"
                }`
              }
            >
              {item.id}
            </NavLink>

            <div className="flex flex-col gap-1">
              <p className="text-[#9699AB] text-[10px] uppercase tracking-wider">
                {item.step}
              </p>
              <p className="text-white text-xs font-bold tracking-wider">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
