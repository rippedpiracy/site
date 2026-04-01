import React from "react";

export default function Blockquote(props: React.JSX.IntrinsicElements["blockquote"]) {
  return (
    <blockquote
      className="text-text-light dark:text-text-dark my-4 border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1 italic opacity-80"
      {...props}
    />
  );
}
