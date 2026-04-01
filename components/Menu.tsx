import classNames from "@lib/classnames";
import { useContext, useEffect, useRef } from "react";
import MenuContext from "../contexts/MenuContext";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Navigation from "./navigation/Navigation";

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const { open, setClose } = useContext(MenuContext);

  const classes = classNames(
    [
      // Mobile/tablet overlay; hidden on xl and up
      "text-theme-light-text fixed -left-full pr-16 sm:pr-0 top-0 w-full h-dvh flex z-40 transition-transform duration-300 transform-gpu xl:hidden",
    ],
    {
      "translate-x-full": open,
      "translate-x-0": !open,
    },
  );

  useEffect(() => {
    const handler = () => {
      if (open) {
        setClose();
      }
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [open, setClose]);

  useOnClickOutside(ref as React.RefObject<HTMLDivElement>, setClose);

  return (
    <>
      {/* Mobile overlay */}
      <div className={classes}>
        <div className="dark:bg-sidebar-tertiary-dark flex w-full max-w-80 flex-col bg-white" ref={ref}>
          <div className="flex grow flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-1 flex-col items-start">
              <svg
                onClick={setClose}
                className="ml-6 h-7 cursor-pointer text-black xl:hidden dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19.3 20.7a1 1 0 0 0 1.4-1.4L13.42 12l7.3-7.3a1 1 0 0 0-1.42-1.4L12 10.58l-7.3-7.3a1 1 0 0 0-1.4 1.42L10.58 12l-7.3 7.3a1 1 0 1 0 1.42 1.4L12 13.42l7.3 7.3Z"
                />
              </svg>
              <Navigation />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop fixed sidebar */}
      <aside
        className="desktop-left-nav text-theme-light-sidebar-text dark:text-theme-dark-sidebar-text fixed top-0 z-20 h-dvh w-80 text-sm"
        aria-hidden={false}
      >
        <div className="dark:bg-sidebar-tertiary-dark flex h-full w-80 flex-col bg-white">
          <div className="flex grow flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-1 flex-col items-start">
              <Navigation />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
