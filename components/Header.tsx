import { Link, useLocation } from "react-router-dom";
import { useCallback, useContext } from "react";
import MenuContext from "../contexts/MenuContext";
import Bars from "./icons/Bars";
import SocialLinks from "./SocialLinks";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const { setOpen } = useContext(MenuContext);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const onMenuClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setOpen();
    },
    [setOpen],
  );

  return (
    <header className="dark:bg-theme-dark-sidebar fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between bg-white p-2 md:p-4 xl:hidden">
      <Link to="/" onClick={onMenuClick}>
        <Bars
          onClick={setOpen}
          className="ml-1 h-7 cursor-pointer justify-self-start text-black xl:hidden dark:text-white"
        />
      </Link>

      {!isHome && (
        <img
          src="/img/rippedtransparent-cropped.svg"
          className="amoled:invert-0 pointer-events-none absolute left-1/2 h-8 -translate-x-1/2 invert dark:invert-0"
          alt="Ripped"
        />
      )}

      <div className="flex items-center gap-2">
        <SocialLinks />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
