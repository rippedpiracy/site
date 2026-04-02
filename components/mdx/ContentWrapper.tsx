import React from "react";
import Header from "../Header";

interface ContentWrapperProps {
  children: React.ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div
      className="relative flex flex-1 scroll-pt-16 flex-col items-center overflow-y-auto focus:outline-hidden xl:scroll-pt-0"
      style={{ scrollbarGutter: "stable" }}
    >
      <Header />
      <div className="h-16 xl:hidden" />
      <main className="desktop-content-left-pad desktop-content-max w-full p-4 pb-16 sm:px-6 sm:pt-0 sm:pb-12 lg:px-10 lg:pb-16">
        <article className="m-auto mt-0 xl:mt-4 xl:pt-6">{children}</article>
      </main>
    </div>
  );
}
