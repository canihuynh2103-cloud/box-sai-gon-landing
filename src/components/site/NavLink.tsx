import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type NavTarget = { label: string; href: string };

/** Chuyển href dạng "#dich-vu" hoặc "/blog" thành props cho TanStack Link */
export function parseHref(href: string) {
  if (href.startsWith("#")) {
    return { to: "/" as const, hash: href.slice(1) };
  }
  return { to: href };
}

export function useIsActive(href: string) {
  const { pathname, hash } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, hash: s.location.hash }),
  });
  if (href.startsWith("#")) {
    return pathname === "/" && hash === href.slice(1);
  }
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}) {
  const active = useIsActive(href);
  const target = parseHref(href);

  return (
    <Link
      {...(target as { to: string; hash?: string })}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        className,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
        active && activeClassName,
      )}
    >
      {children}
    </Link>
  );
}
