import { createElement, PropsWithChildren, ReactNode, useMemo, useState } from "react";
import classNames from "@lib/classnames";
import Chevron from "../icons/Chevron";
import MDX_ICONS from "./icons";
import Paragraph from "./Paragraph";

interface CollapsibleProps {
  icon?: Exclude<React.ReactNode, string> | keyof typeof MDX_ICONS;
  title: string;
  description: string;
}

export default function Collapsible({
  children: originalChildren,
  icon: originalIcon,
  title,
  description,
}: PropsWithChildren<CollapsibleProps>) {
  // sometimes the first element in children is a string but the rest are <p> elements
  //
  // only if the element is called like this:
  // <Collapsible ...>
  //   some text <-- LITERAL STRING
  //
  //   some other text <-- <P> ELEMENT
  // </Collapsible>
  //
  // it's probably incorrect usage in MDX standard but we handle it here anyway
  const children = Array.isArray(originalChildren) ? Array.from(originalChildren) : [originalChildren];
  if (typeof children[0] === "string") {
    children[0] = <Paragraph>{children[0]}</Paragraph>;
  }

  // convert `warning-icon` and `warning` to `WarningIcon`
  const possibleKey = useMemo(() => {
    if (typeof originalIcon !== "string") return;

    // uses regex to uppercase the first character and any characters with - before it
    const replaced = originalIcon
      .toLowerCase()
      .replace(
        /^(\w)|-(\w)/g,
        (_, a: string | undefined, b: string | undefined) => a?.toUpperCase() ?? b!.toUpperCase(),
      );

    // allow users to specify `-icon` if they want
    if (replaced.endsWith("Icon")) return replaced;
    return `${replaced}Icon`;
  }, [originalIcon]) as keyof typeof MDX_ICONS | undefined;

  // prepare the React node
  let icon: ReactNode = null;
  if (typeof originalIcon === "string") {
    if (originalIcon in MDX_ICONS) icon = createElement(MDX_ICONS[originalIcon as keyof typeof MDX_ICONS]);
    else if (possibleKey && possibleKey in MDX_ICONS) icon = createElement(MDX_ICONS[possibleKey]);
  }

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="bg-theme-light-collapsible dark:bg-theme-dark-collapsible mb-6 rounded-md">
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        aria-expanded={isOpen}
        className={classNames(
          "group border-text-light/10 dark:border-text-light focus-visible:ring-brand-blurple/75 flex w-full cursor-pointer items-center justify-between rounded-md px-6 py-5 text-left transition-all duration-300 focus:outline-hidden focus-visible:ring-2",
          {
            "border-b": isOpen,
          },
        )}
      >
        <div className="flex flex-col gap-1 text-left">
          <h3 className="text-text-light dark:text-text-dark flex items-center gap-1.5 text-xl">
            {icon && <div className="collapsible-icon">{icon}</div>}
            {title}
          </h3>
          <p className="text-text-light dark:text-text-dark text-base leading-6">{description}</p>
        </div>
        <Chevron
          className="*:text-text-light dark:*:text-text-dark mr-2 size-5 opacity-70 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100"
          style={{
            transform: isOpen ? "rotate(-180deg)" : "none",
          }}
        />
      </button>

      <div
        className={classNames(
          "grid overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="px-6 py-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
