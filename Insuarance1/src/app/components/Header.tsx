"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark"); // Enable dark mode
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark"); // Disable dark mode
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-black shadow-md dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Left Side: Logo and AutoSecure */}
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
          <span className="text-xl font-bold text-gray-100 dark:text-white">AutoSecure</span>

          {/* Dark Mode Toggle (Sun and Moon) */}
          <button
            className="text-lg font-medium text-gray-100 dark:text-white md:ml-4"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? "🌙" : "🌞"}
          </button>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button className="text-xl font-bold" onClick={toggleMenu}>
            ☰
          </button>
        </div>

        {/* Right Side: Navigation Links */}
        <nav className="md:flex space-x-8 hidden ">
          <Link href="/claims">
            <span className="text-lg font-medium text-gray-100 dark:text-white hover:border-b-2 hover:border-blue-500 transition duration-200">
              Claims
            </span>
          </Link>
          <Link href="/logins">
            <span className="text-lg font-medium text-gray-100 dark:text-white hover:border-b-2 hover:border-blue-500 transition duration-200">
              Logins
            </span>
          </Link>
          <Link href="/quotes">
            <span className="text-lg font-medium text-gray-100 dark:text-white hover:border-b-2 hover:border-blue-500 transition duration-200">
              Quotes
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-lg font-medium text-gray-100 dark:text-white hover:border-b-2 hover:border-blue-500 transition duration-200">
              Contact Us
            </span>
          </Link>
        </nav>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-4 py-2">
          <Link href="/claims">
            <span className="text-lg font-medium text-gray-100 dark:text-white hover:border-b-2 hover:border-blue-500 transition duration-200">
              Claims
            </span>
          </Link>
          <Link href="/logins">
            <span className="text-lg font-medium text-gray-100 dark:text-white hover:border-b-2 hover:border-blue-500 transition duration-200">
              Logins
            </span>
          </Link>
          <Link href="/quotes">
            <span className="text-lg font-medium text-gray-100 dark:text-white hover:border-b-2 hover:border-blue-500 transition duration-200">
              Quotes
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-lg font-medium text-gray-100 dark:text-white hover:border-b-2 hover:border-blue-500 transition duration-200">
              Contact Us
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
