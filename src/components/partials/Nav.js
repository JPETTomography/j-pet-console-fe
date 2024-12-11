const Nav = () => {
  return (
    <nav>
      <ul className="list-none flex items-center gap-16">
        {["users", "experiments", "detectors", "tags", "radioisotopes"].map(
          (navlink, index) => {
            return (
              <li key={index}>
                <a
                  href={`/${navlink}`}
                  className="capitalize font-medium outline-offset-4 hover:text-sky-700 hover:underline transition-colors duration-300"
                >
                  {navlink}
                </a>
              </li>
            );
          }
        )}
      </ul>
    </nav>
  );
};

export default Nav;
