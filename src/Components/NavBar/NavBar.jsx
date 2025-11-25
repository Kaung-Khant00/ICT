import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import useStore from "../../zustand";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const navRef = useRef(null);
  const changeThemeState = useStore((state) => state.changeTheme);
  const mouseIn = useRef(false);

  const [theme, setTheme] = useState(localStorage.getItem("THEME") || "light");

  const changeTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    changeThemeState(next);
    localStorage.setItem("THEME", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 50) {
        if (mouseIn.current) return;
        console.log(mouseIn.current);
        gsap.to(nav, {
          y: -nav.offsetHeight,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // scrolling up → show navbar
        gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
      }

      lastScroll = currentScroll;
    };

    const handleMouseEnter = () => {
      console.log(mouseIn.current);
      mouseIn.current = true;
    };
    const handleMouseLeave = () => {
      console.log(mouseIn.current);
      mouseIn.current = false;
    };
    window.addEventListener("scroll", handleScroll);
    nav.addEventListener("mouseenter", handleMouseEnter);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      nav.removeEventListener("mouseenter", handleMouseEnter);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className="navbar bg-base-300 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-md"
    >
      <button className="btn btn-ghost text-xl">Grade (11) Chemistry</button>
      <div className="flex items-center gap-10">
        <div className="flex gap-6">
          <a href="#home" className="hover:underline">
            Home
          </a>
          <a href="#our-school" className="hover:underline">
            Our School
          </a>
          <a href="#our-team" className="hover:underline">
            Our Team
          </a>
        </div>
        <ThemeToggle changeTheme={changeTheme} theme={theme} />
      </div>
    </div>
  );
};

export default NavBar;
