import Svg from "./Svg";

const Page = (props) => {
  const { children } = props;

  return (
    <>
      <header className="flex justify-between items-center gap-4 h-14 px-6 py-2 border-b">
        <a href="/" className="outline-offset-4">
          <img
            src="/images/logos/logo-full-h.svg"
            alt="J-PET logotype"
            className="h-10"
          />
        </a>

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
        <button
          type="button"
          className="flex items-center gap-2 outline-offset-4"
        >
          <div className="flex flex-col items-end">
            <span className="font-semibold">Current User</span>
            <span className="text-sm text-slate-600">
              current.user@gmail.com
            </span>
          </div>
          <Svg
            src="/icons/chevron-down.svg"
            className="w-6 h-6 text-slate-400"
          />
        </button>
      </header>
      <main className="flex flex-col gap-8 min-h-screen max-w-screen-2xl p-6 mx-auto">
        {children}
      </main>
    </>
  );
};

export default Page;
