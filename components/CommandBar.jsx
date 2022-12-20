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
import Router from "next/router";
import React from "react";
import { MdOutlineHome } from 'react-icons/md'
import { parseCookies } from "../utils/parseCookies";
import { useCookies } from "react-cookie";

export default function CommandBar({children}) {
  const router = useRouter();
  const [cookie] = useCookies(["user"]);

  const managerActions = [
    {
      id: "home",
      name: "Home",
      shortcut: ["H"],
      keywords: "go-home",
      perform: () => router.push("/"),
      icon: <MdOutlineHome size={25} />
    },
    {
      id: "customers",
      name: "Customers",
      shortcut: ["C"],
      keywords: "go-customers",
      perform: () => router.push("/customers"),
    },
    {
      id: "tickets",
      name: "Tickets",
      shortcut: ["T"],
      keywords: "go-tickets",
      perform: () => router.push("/tickets"),
    },
    {
      id: "profile",
      name: "Profile",
      shortcut: ["P"],
      keywords: "go-profile",
      perform: () => router.push("/profile"),
      icon: <MdOutlineHome size={25} />
    }
  ];

  const actions = [
    {
      id: "home",
      name: "Home",
      shortcut: ["H"],
      keywords: "go-home",
      perform: () => router.push("/"),
      icon: <MdOutlineHome size={25} />
    },
    {
      id: "profile",
      name: "Profile",
      shortcut: ["P"],
      keywords: "go-profile",
      perform: () => router.push("/profile"),
      icon: <MdOutlineHome size={25} />
    }
  ];
  return (
    <KBarProvider actions={["manager", "admin"].includes(cookie?.user?.user.user_metadata.role) ? managerActions : actions}>
      <KBarPortal>
        <KBarPositioner className="bg-black bg-opacity-50 z-10 p-10 fixed w-full h-full">
          <KBarAnimator className="outline outline-1 outline-gray-300 rounded bg-white px-2 w-11/12 md:w-8/12">
            {/* <KBarSearch /> */}
            <input
              placeholder="Type a command or search…"
              className="px-3 py-2 outline-none bg-transparent w-full"
            />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
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
            } flex justify-between px-3 py-2 cursor-pointer`}
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