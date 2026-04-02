import classNames from "@lib/classnames";
import React, { createElement, Fragment, Suspense, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuContext from "../../contexts/MenuContext";
import { ICONS } from "./NavigationList";

const Searchbar = React.lazy(() => import("../Searchbar"));

interface MenuSelectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function NavigationSection({ title, className, children }: MenuSelectionProps) {
  const classes = classNames("mb-6", className);

  return (
    <section className={classes}>
      {title ? <h3 className="font-whitney-bold mb-2 ml-2 text-black select-none dark:text-white">{title}</h3> : null}
      {children}
    </section>
  );
}

interface NavigationLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  icon: keyof typeof ICONS | null;
}

export function NavigationLink({ href, className, children, icon }: NavigationLinkProps) {
  const location = useLocation();
  const { setClose } = useContext(MenuContext);

  const finalClasses = classNames(
    "group flex items-center font-whitney rounded-md pl-3 gap-1 font-medium focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-blurple/75",
    className,
    {
      "bg-brand-blurple text-white": location.pathname === href,
      "text-theme-light-sidebar-text dark:text-theme-dark-sidebar-text hover:bg-theme-light-sidebar-hover hover:text-theme-light-sidebar-hover-text dark:hover:bg-theme-dark-sidebar-hover dark:hover:text-white":
        location.pathname !== href,
    },
  );

  return (
    <Fragment>
      <Link to={href} className={finalClasses} onClick={setClose} draggable={false}>
        {icon != null && createElement(ICONS[icon], { className: "size-5 shrink-0" })}
        <span className="flex-1 py-1 pr-2">{children}</span>
      </Link>
    </Fragment>
  );
}

export const SearchItem = (
  <div id="searchContainer" className="w-full flex-1 pr-2 sm:flex">
    <Suspense fallback={null}>
      <Searchbar />
    </Suspense>
  </div>
);
