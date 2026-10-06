"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { navigation } from "@/config/site";

export function Navbar() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() =>
      panel.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
    );
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(
          panel.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
        );
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          toggle.current?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.current?.focus();
        } else if (document.activeElement === toggle.current) {
          event.preventDefault();
          (event.shiftKey ? last : first)?.focus();
        }
      }
    }
    window.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = oldOverflow;
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", keydown);
    };
  }, [open]);

  function toggleTheme() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("makmur-lab-color-theme", next);
    } catch {
      /* Theme works even when storage is unavailable. */
    }
  }

  return (
    <header
      className={`site-header ${home && !scrolled && !open ? "over-cover" : "solid"} ${open ? "menu-open" : ""}`}
    >
      <div className="header-inner container">
        <Link
          prefetch={false}
          href="/"
          className="brand"
          aria-label="Makmur Lab home"
        >
          <BookOpen size={23} strokeWidth={1.6} aria-hidden="true" />
          <span>
            Makmur<span className="brand-light"> Lab</span>
          </span>
        </Link>
        <nav
          aria-label="Primary navigation"
          ref={panel}
          id="primary-nav"
          className={`primary-nav ${open ? "is-open" : ""}`}
        >
          <span className="mobile-nav-label eyebrow">
            The knowledge library
          </span>
          {navigation.map((item) => (
            <Link
              prefetch={false}
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"))
                  ? "page"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
          <Link
            prefetch={false}
            className="mobile-search-link"
            href="/search"
            onClick={() => setOpen(false)}
          >
            Search the library <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </nav>
        <div className="header-actions">
          <Link
            prefetch={false}
            href="/search"
            className="icon-button"
            aria-label="Search the knowledge library"
          >
            <Search size={18} aria-hidden="true" />
          </Link>
          <button
            onClick={toggleTheme}
            className="icon-button"
            aria-label="Toggle light and dark theme"
          >
            <Sun className="theme-sun" size={18} aria-hidden="true" />
            <Moon className="theme-moon" size={18} aria-hidden="true" />
          </button>
          <button
            ref={toggle}
            aria-expanded={open}
            aria-controls="primary-nav"
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
