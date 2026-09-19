import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger index — each step adds 80ms. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll-triggered fade-up.
 *
 * Deliberately NOT a JS-driven animation library. The markup this renders is
 * fully visible on its own; the animation is armed by an inline script that
 * adds a `js` class to <html> before first paint (see app/layout.tsx), and
 * driven by an IntersectionObserver in that same script.
 *
 * The consequence that matters: with JavaScript disabled, blocked, or simply
 * still loading, every section is readable. An animation library that sets
 * `opacity: 0` inline during SSR would ship a page that is blank below the
 * hero until hydration finishes.
 *
 * Visitors who ask for reduced motion get no transition at all — see the
 * `prefers-reduced-motion` block in globals.css.
 */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: Props) {
  const style = delay ? ({ "--reveal-delay": `${delay * 80}ms` } as CSSProperties) : undefined;

  return (
    <Tag className={`reveal ${className}`.trim()} data-reveal="" style={style}>
      {children}
    </Tag>
  );
}
