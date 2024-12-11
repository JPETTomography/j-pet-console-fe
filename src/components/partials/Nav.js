import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul className="list-none flex items-center gap-16">
        {["users", "experiments", "detectors", "tags", "radioisotopes"].map(
          (navlink, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={`/${navlink}`}
                  className={({ isActive }) => {
                    return `capitalize font-medium outline-offset-4 ${
                      isActive
                        ? "font-bold text-sky-700 hover:text-sky-900 underline"
                        : "hover:text-sky-700 hover:underline"
                    }`;
                  }}
                >
                  {navlink}
                </NavLink>
              </li>
            );
          }
        )}
      </ul>
    </nav>
  );
};

export default Nav;
