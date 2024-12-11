import HomepageButton from "./HomepageButton";
import Nav from "./Nav";
import CurrentUser from "./CurrentUser";

const Header = () => {
  return (
    <header className="flex justify-between items-center gap-4 h-14 px-6 py-2 border-b">
      <HomepageButton />
      <Nav />
      <CurrentUser />
    </header>
  );
};

export default Header;
