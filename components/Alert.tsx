import classNames from "@lib/classnames";
import { CircleErrorIcon } from "./mdx/icons/CircleErrorIcon";
import { WarningIcon } from "./mdx/icons/WarningIcon";
import { CircleInformationIcon } from "./mdx/icons/CircleInformationIcon";

type AlertType = "danger" | "warn" | "info";

function getIcon(type: AlertType) {
  const iconClasses = "mr-3 h-6 w-6 shrink-0";

  switch (type) {
    case "danger":
      return <CircleErrorIcon className={`${iconClasses} fill-[#f03f42]`} />;
    case "warn":
      return <WarningIcon className={`${iconClasses} fill-[#eeb132]`} />;
    case "info":
      return <CircleInformationIcon className={`${iconClasses} fill-[#00a9fa]`} />;
  }
}

function getClasses(type: AlertType) {
  return classNames("flex items-start my-4 px-4 py-3 border-2 rounded-lg overflow-auto [&_p]:mt-0! [&_p]:mb-0!", {
    "bg-red-100 border-[#f03f42] dark:bg-[#41373d] amoled:bg-black amoled:border-[#f03f42]/50": type === "danger",
    "bg-yellow-100 border-[#eeb132] dark:bg-[#3f3b39] amoled:bg-black amoled:border-[#eeb132]/50": type === "warn",
    "bg-blue-100 border-[#00a9fa] dark:bg-[#323c4a] amoled:bg-black amoled:border-[#00a9fa]/50": type === "info",
  });
}

interface AlertProps {
  type: AlertType;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Alert({ type, children, style }: AlertProps) {
  const icon = getIcon(type);
  const classes = getClasses(type);

  return (
    <aside
      className={classNames(classes, {
        "amoled:bg-black!": true,
      })}
      style={style}
    >
      <div className="flex pt-0.5 text-black dark:text-white">{icon}</div>
      <div className="flex-1 pt-1 text-sm leading-tight text-black sm:pt-0 sm:text-base sm:leading-normal dark:text-white">
        {children}
      </div>
    </aside>
  );
}
