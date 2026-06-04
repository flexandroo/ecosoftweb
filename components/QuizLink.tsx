"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders a link to /#quiz, but when the user is already on the home page
 * it intercepts the click and scrolls the #quiz section to the centre of
 * the viewport (instead of the browser's default top-aligned hash jump).
 */
export default function QuizLink({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/#quiz"
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        if (pathname !== "/") return; // let Next.js navigate, then browser jumps to hash
        const el = document.getElementById("quiz");
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // keep the URL hash in sync without triggering another scroll
        if (window.location.hash !== "#quiz") {
          history.replaceState(null, "", "#quiz");
        }
      }}
    >
      {children}
    </Link>
  );
}
