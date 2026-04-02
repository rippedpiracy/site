import { Link } from "react-router-dom";
import type { FC } from "react";

interface IconBadgeProps {
  href?: string;
  tooltip: string;
  icon: FC<React.JSX.IntrinsicElements["svg"]>;
}

export default function IconBadge(props: IconBadgeProps) {
  const { href, tooltip } = props;

  const content = (
    <abbr title={tooltip} className="no-underline">
      <props.icon className="h-5 min-h-4 w-5 min-w-4" />
    </abbr>
  );

  if (href) {
    return (
      <Link
        to={href}
        className="focus-visible:ring-brand-blurple/75 rounded-md focus:outline-hidden focus-visible:ring-2"
      >
        {content}
      </Link>
    );
  }

  return content;
}
