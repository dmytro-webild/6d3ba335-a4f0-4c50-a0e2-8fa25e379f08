import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";
import NickhoOdometer from "@/components/kit/NickhoOdometer";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Metric = { value: number | string; prefix?: string; suffix?: string; label: string };

type MetricsGrowFrameProps = {
  label?: string;
  title?: string;
  description?: string;
  items?: Metric[];
  ariaLabel?: string;
  className?: string;
};

const defaults: Metric[] = [
  { value: 99.99, suffix: "%", label: "Uptime last year" },
  { value: 38, suffix: "ms", label: "Median response" },
  { value: 120, suffix: "+", label: "Edge locations" },
  { value: 24, suffix: "/7", label: "Engineers on call" },
];

const MetricsGrowFrame = ({ label, title = "Speed you can measure.", description, items = defaults, ariaLabel, className }: MetricsGrowFrameProps) => {
  const gridRef = useRef<HTMLUListElement>(null);
  const reduce = !!useReducedMotion();
  const live = !reduce;
  const kit = useKitMotion();
  const seen = useInView(gridRef, { once: true, margin: "0px 0px -15% 0px" });
  const play = seen || reduce;
  const cols = items.length === 1 ? "grid-cols-1" : items.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2";
  const wide = items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : "";

  return (
    <section aria-label={ariaLabel ?? title ?? "Key figures"} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col gap-[clamp(0.75rem,1.6vw,1.25rem)]">
        {(label || title || description) && (
          <div className="flex flex-col items-center gap-[0.75rem] border border-dashed border-border px-[clamp(1rem,2vw,1.5rem)] py-[clamp(2rem,4vw,3.5rem)] text-center">
            {label && <TerminalTitleSweep text={label} tag="p" className="font-mono text-[length:var(--text-label)] uppercase leading-[1.2] tracking-[var(--label-tracking)] text-accent" />}
            {title && <TerminalTitleSweep text={title} tag="h2" className="max-w-[18em] text-balance text-[length:var(--text-h1)] [overflow-wrap:anywhere]" />}
            {description && <p className="max-w-[36rem] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">{description}</p>}
          </div>
        )}

        <ul ref={gridRef} className={cn("grid gap-[clamp(0.75rem,1.6vw,1.25rem)]", cols, wide)}>
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={live ? { clipPath: "inset(50% 50% 50% 50%)" } : false}
              animate={play ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
              transition={{ duration: kit.slow, ease: kit.ease, delay: index * 0.08 }}
              className="kit-card relative flex min-h-[clamp(9.5rem,15vw,13rem)] min-w-0 flex-col justify-between gap-[1.5rem] border border-dashed border-border p-[clamp(1rem,2vw,1.75rem)] [container-type:inline-size]"
            >
              <div aria-hidden="true" className="flex items-center justify-between">
                <p aria-hidden="true" className="font-mono text-[length:var(--text-label)] leading-none text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                <div className="size-[0.375rem] rounded-full bg-accent" />
              </div>
              <div className="flex flex-col gap-[0.625rem]">
                <NickhoOdometer
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  play={play}
                  duration={kit.slow}
                  delay={0.2 + index * 0.08}
                  className="whitespace-nowrap text-[length:min(calc(var(--text-display)*0.6),20cqi)] leading-none tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]"
                />
                <p className="font-mono text-[length:var(--text-label)] uppercase leading-[1.3] tracking-[var(--label-tracking)] text-muted-foreground [overflow-wrap:anywhere]">{item.label}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MetricsGrowFrame;
