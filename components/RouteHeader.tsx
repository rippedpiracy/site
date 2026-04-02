import classNames from "@lib/classnames";
import React, { useRef } from "react";
import { resolveUrlVariables } from "@lib/endpoints";
import IconBadge from "./IconBadge";
import { H3 } from "./mdx/Heading";
import { WarningIcon } from "./mdx/icons/WarningIcon";
import { RobotIcon } from "./mdx/icons/RobotIcon";
import { WrenchIcon } from "./mdx/icons/WrenchIcon";
import { LockUnlockedIcon } from "./mdx/icons/LockUnlockedIcon";
import { TopicsIcon } from "./mdx/icons/TopicsIcon";
import { KeyIcon } from "./mdx/icons/KeyIcon";

// const RouteTestDialog = React.lazy(() => import("./RouteTestDialog"));

export function getRawText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return node.toString();
  if (Array.isArray(node)) return node.map(getRawText).join("");
  if (React.isValidElement(node)) return getRawText((node.props as { children?: React.ReactNode }).children);
  return "";
}

export type RESTMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface MethodBadgeProps {
  method: RESTMethod;
}

export function MethodBadge({ method }: MethodBadgeProps) {
  const name = method.toUpperCase();

  const classes = classNames("px-2 py-1 text-sm border-2 rounded-xl uppercase", {
    "bg-blue-100 text-blue-700 border-blue-500 dark:bg-blue-600/50 dark:text-white dark:border-blue-500/50":
      name === "GET",
    "bg-green-100 text-green-700 border-green-500 dark:bg-green-600/50 dark:text-white dark:border-green-500/50":
      name === "POST",
    "bg-yellow-100 text-yellow-700 border-yellow-500 dark:bg-yellow-700/50 dark:text-white dark:border-yellow-500/50":
      name === "PATCH",
    "bg-orange-100 text-orange-700 border-orange-500 dark:bg-orange-700/50 dark:text-white dark:border-orange-500/50":
      name === "PUT",
    "bg-red-100 text-red-500 border-red-500 dark:bg-red-700/50 dark:text-white dark:border-red-500/50":
      name === "DELETE",
  });

  return <code className={classes}>{method}</code>;
}

export interface RouteHeaderProps {
  method: RESTMethod;
  url: string;
  children: React.ReactNode;
  supportsAuditReason?: boolean;
  unauthenticated?: boolean;
  mfa?: boolean;
  supportsOAuth2?: string | boolean;
  deprecated?: boolean;
  supportsBot?: boolean;
}

RouteHeader.displayName = "RouteHeader";

export default function RouteHeader({
  method,
  url,
  children,
  supportsAuditReason,
  unauthenticated,
  mfa,
  supportsOAuth2,
  deprecated,
  supportsBot,
}: RouteHeaderProps) {
  const routeTitle = getRawText(children).toLowerCase();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="group"
      data-route-header="true"
      data-route-title={routeTitle}
      data-supports-bot={supportsBot ? "true" : undefined}
      data-supports-oauth2={supportsOAuth2 ? "true" : undefined}
      data-unauthenticated={unauthenticated ? "true" : undefined}
    >
      <H3 className="mb-0" useAnchor={false} useCopy={false}>
        {/* NOTE: this margin is a hack cause the font sucks */}
        <span className="mb-px">{children}</span>
        <span className="ml-2 flex items-center gap-2">
          {supportsBot ? (
            <IconBadge tooltip="Supports bot users" icon={RobotIcon} />
          ) : null}
          {supportsOAuth2 ? (
            <IconBadge
              tooltip={`Supports OAuth2 for authentication${
                supportsOAuth2 !== true ? ` with the "${supportsOAuth2}" scope` : ""
              }`}
              icon={WrenchIcon}
            />
          ) : null}
          {unauthenticated ? (
            <IconBadge tooltip="Unauthenticated" icon={LockUnlockedIcon} />
          ) : null}
          {mfa ? (
            <IconBadge tooltip="MFA may be required" icon={KeyIcon} />
          ) : null}
          {supportsAuditReason ? (
            <IconBadge
              tooltip="Supports audit log reason"
              icon={TopicsIcon}
            />
          ) : null}
          {deprecated ? (
            <IconBadge
              tooltip="Endpoint is still active but should be avoided"
              icon={WarningIcon}
            />
          ) : null}
        </span>
      </H3>
      <div ref={containerRef} className="mt-1 flex items-center">
        <MethodBadge method={method} />
        <code className="text-text-light dark:text-text-dark p-2 text-base break-all">
          {resolveUrlVariables(url).map(({ text }, i) => (
            <React.Fragment key={i}>{text}</React.Fragment>
          ))}
        </code>
      </div>
    </div>
  );
}
