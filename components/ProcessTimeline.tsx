import { Reveal } from "./Reveal";
import type { Step } from "@/lib/services";

type Props = { steps: Step[]; tone?: "light" | "dark" };

export function ProcessTimeline({ steps, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i} className="relative flex h-full flex-col">
          <span
            aria-hidden="true"
            className={`flex h-11 w-11 items-center justify-center rounded-full font-serif text-lg font-bold ${
              dark ? "bg-gold text-navy" : "bg-navy text-gold"
            }`}
          >
            {i + 1}
          </span>
          <h3
            className={`mt-5 font-serif text-lg font-semibold ${dark ? "text-white" : "text-navy"}`}
          >
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-chalk/80" : "text-ink"}`}>
            {step.body}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
