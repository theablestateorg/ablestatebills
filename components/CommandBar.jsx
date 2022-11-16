// app.tsx
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  NO_GROUP,
  KBarResults,
} from "kbar";
import { useRouter } from "next/router";
import React from "react";

export default function CommandBar(props) {
  const router = useRouter();
  const actions = [
    {
      id: "customers",
      name: "customers",
      shortcut: ["C"],
      keywords: "writing words",
      perform: () => (window.location.pathname = "customers"),
    },
    {
      id: "tickets",
      name: "tickets",
      shortcut: ["T"],
      keywords: "writing words",
      perform: () => (window.location.pathname = "tickets"),
    },
  ];
  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="outline bg-black bg-opacity-50 z-10 p-10 flex justify-center items-center fixed w-full h-full">
          <KBarAnimator className="outline outline-1 outline-gray-300 rounded w-full bg-white">
            {/* <KBarSearch /> */}
            <input
              placeholder="Type a command or search…"
              className="px-3 py-2 outline-none bg-transparent w-full"
            />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {props.children}
    </KBarProvider>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="">{item}</div>
        ) : (
          <div
            className={`bg-transparent ${
              active && "bg-neutral-100"
            } flex justify-between px-3 py-2`}
          >
            <div className={``}>{item.name}</div>
            {item.shortcut?.length ? (
              <div aria-hidden>
                {item.shortcut.map((shortcut) => (
                  <div className="bg-neutral-200 px-2 py-1 rounded text-sm font-bold" key={shortcut}>{shortcut}</div>
                ))}
              </div>
            ) : null}
          </div>
        )
      }
    />
  );
}
