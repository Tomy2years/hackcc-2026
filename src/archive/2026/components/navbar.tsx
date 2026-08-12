"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@2026/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const smoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="z-[100]">
      <div
        className="text-base 2xl:text-xl lg:flex z-50 font-mont text-white fixed hidden items-center justify-between px-6 py-3.5 w-full top-0 left-0 bg-glass backdrop-blur-md"
      >
        <Link
          href="/"
          className="bg-white/20 hover:bg-white/30 border border-white/25 px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all transform hover:scale-105 cursor-pointer z-10"
        >
          ← Main Site
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center space-x-8 xl:space-x-10 [&>*]:cursor-pointer">
          <a onClick={() => smoothScroll("involvedTab")}>Get Involved</a>
          <a onClick={() => smoothScroll("aboutTab")}>About</a>
          <a onClick={() => smoothScroll("workshopTab")}>FAQ</a>
          <a onClick={() => smoothScroll("scheduleTab")}>Schedule</a>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/yRShGV7Py4">
            <FontAwesomeIcon className="mr-2" icon={faDiscord} /> Discord Server
          </a>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "lg:hidden flex" : "hidden"
        } font-mont top-0 left-0 fixed w-screen h-screen bg-white z-50 flex-col justify-center align-center items-center text-center [&>*]:my-2 [&>*]:whitespace-nowrap overflow-hidden`}
      >
        <Link href="/" className="font-bold text-purple-700 text-lg">
          ← Back to Main Site
        </Link>
        <div className="bg-activeyellow w-16 h-[1px]"></div>
        <a
          onClick={() => {
            smoothScroll("involvedTab");
            toggleMenu();
          }}
        >
          Get Involved
        </a>
        <div className="bg-activeyellow w-16 h-[1px]"></div>
        <a
          onClick={() => {
            smoothScroll("aboutTab");
            toggleMenu();
          }}
        >
          About
        </a>
        <div className="bg-activeyellow w-16 h-[1px]"></div>
        <a
          onClick={() => {
            smoothScroll("workshopTab");
            toggleMenu();
          }}
        >
          FAQ
        </a>
        <div className="bg-activeyellow w-16 h-[1px]"></div>
        <a
          onClick={() => {
            smoothScroll("scheduleTab");
            toggleMenu();
          }}
        >
          Schedule
        </a>
        <div className="bg-activeyellow w-16 h-[1px]"></div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/yRShGV7Py4"
        >
          <FontAwesomeIcon className="mr-2" icon={faDiscord} /> Discord Server
        </a>
      </div>
      <h1
        className={`${
          isMenuOpen ? "text-black" : "text-white"
        } fixed z-50 top-4 right-4 text-3xl lg:hidden flex cursor-pointer`}
        onClick={() => toggleMenu()}
      >
        {isMenuOpen ? "X" : "☰"}
      </h1>
    </div>
  );
};

export const NavigationButton = (props: any) => {
  const { text, size, directory, to } = props;
  const router = useRouter();

  let sizing = "";
  let newWindow = "";

  switch (size) {
    case "sm":
      sizing = "py-1.5 px-8";
      break;
    case "md":
      sizing =
        "py-3 px-6 md:px-10 lg:py-2 lg:px-10 text-[0.6rem] md:text-[0.8rem] lg:text-[1rem] xl:text-[1rem] mt-8";
      newWindow = "_blank";
      break;
    case "lg":
      sizing =
        "py-3 px-6 md:px-10 lg:py-4 lg:px-14 text-[0.6rem] md:text-[0.8rem] lg:text-[1.2rem] xl:text-[1.3rem] mt-8";
      break;
    case "xl":
      sizing = "py-3 px-10 lg:py-4 lg:px-14 text-lg sm:text-xl md:text-2xl z-10";
  }

  const handleClick = (e: React.MouseEvent) => {
    if (to) {
      e.preventDefault();
      router.push(to);
    }
  };

  return (
    <a
      href={to || directory}
      target={newWindow}
      onClick={handleClick}
      className={cn([
        sizing,
        "cursor-pointer font-mont rounded-[30px] font-extrabold text-hoverpurple active:bg-activeyellow bg-vibrantyellow",
      ])}
    >
      {text}
    </a>
  );
};

export function ApplyButton({
  text = "Apply",
  size = "sm",
  bypassDisable = false,
  to = "#",
  className,
}: {
  text?: string;
  size?: string;
  bypassDisable?: boolean;
  to?: string | undefined;
  className?: string;
}) {
  return (
    <NavigationButton
      className={className}
      text={text}
      size={size}
      directory={to}
      bypassDisable={bypassDisable}
    ></NavigationButton>
  );
}