import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Activity, Bell, Check, Gauge, Globe, Lock, Server, Zap, type LucideIcon } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";
import ParticleBlock from "@/components/kit/ParticleBlock";
import { glideAboutShape } from "@/components/kit/particleShapes/glide";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const ICONS = { zap: Zap, activity: Activity, bell: Bell, gauge: Gauge, globe: Globe, lock: Lock, server: Server, check: Check } satisfies Record<string, LucideIcon>;
const ORDER: (keyof typeof ICONS)[] = ["zap", "gauge", "activity", "bell", "globe", "lock", "server", "check"];

type Fact = { title: string; description?: string; icon?: keyof typeof ICONS };

type AboutParticleRowProps = {
  label?: string;
  title?: string;
  description?: string;
  points?: string[];
  items?: Fact[];
  ariaLabel?: string;
  className?: string;
};

const defaultPoints = ["Servers in Amsterdam, Frankfurt and London", "Images resized and cached at the edge", "Code minified on every deploy", "Engineers on call day and night"];

const defaultItems: Fact[] = [
  { title: "One-click deploys", description: "Push your code, we ship it everywhere.", icon: "zap" },
  { title: "Speed budgets", description: "Alerts before a page gets slow.", icon: "gauge" },
  { title: "24/7 monitoring", description: "Every page checked every minute.", icon: "activity" },
  { title: "Real-time alerts", description: "Know about an issue right away.", icon: "bell" },
];

const AboutParticleRow = ({
  label = "Edge network",
  title = "Pages that load before you blink.",
  description = "We host your site close to every visitor and keep it fast as you grow.",
  points = defaultPoints,
  items = defaultItems,
  ariaLabel,
  className,
}: AboutParticleRowProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, (p) => (reduce ? 0 : (0.5 - p) * 48));
  const objectY = useTransform(scrollYProgress, (p) => (reduce ? "0%" : `${(0.5 - p) * 8}%`));
  const wide = items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <section ref={ref} aria-label={ariaLabel ?? title ?? "About"} className={cn("relative z-[1] min-h-svh bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid grid-cols-1 border-l border-t border-dashed border-border lg:grid-cols-2">
          <div className="kit-card relative flex min-w-0 flex-col justify-center border-b border-r border-dashed border-border px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(2.5rem,5vw,4.5rem)]">
            <motion.div style={{ y: textY }} className="flex flex-col items-start gap-[0.75rem]">
              {label && (
                <TerminalTitleSweep text={label} tag="p" from="color-mix(in srgb, var(--accent) 20%, var(--background))" final="var(--accent)" className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-accent" />
              )}
              <TerminalTitleSweep text={title} className="max-w-[14em] text-[length:var(--text-h1)] [overflow-wrap:anywhere]" />
              {description && <p className="max-w-[26em] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">{description}</p>}
              {points.length > 0 && (
                <ul className="mt-[clamp(1rem,2vw,1.75rem)] flex flex-col gap-[0.875rem]">
                  {points.map((point, index) => (
                    <BlurReveal key={index} as="li" blur={false} y={40} duration={1.6} delay={(index % 4) * 0.08} className="flex items-start gap-[0.75rem]">
                      <Check aria-hidden="true" strokeWidth={2.25} className="mt-[0.2em] size-[1rem] shrink-0 text-accent" />
                      <p className="text-[length:var(--text-small)] leading-[1.45] [overflow-wrap:anywhere]">{point}</p>
                    </BlurReveal>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>

          <div className="relative order-first aspect-square min-w-0 overflow-hidden kit-card border-b border-r border-dashed border-border lg:order-none">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--border)_1px,transparent_1.5px)] [background-size:24px_24px]" />
            <motion.div style={{ y: objectY }} className="absolute inset-x-0 -top-[6%] h-[112%] will-change-transform">
              <ParticleBlock role="overview" fill={0.66} shape={glideAboutShape} className="absolute inset-0" />
            </motion.div>
          </div>
        </div>

        {items.length > 0 && (
          <ul className={cn("grid grid-cols-2 border-l border-dashed border-border", wide)}>
            {items.map((item, index) => {
              const Icon = ICONS[item.icon ?? ORDER[index % ORDER.length]] ?? Zap;
              return (
                <li key={index} className="min-w-0 border-b border-r border-dashed border-border">
                  <BlurReveal
                    blur={false} y={40}
                    duration={1.6}
                    delay={(index % 4) * 0.08}
                    className="kit-card flex h-full flex-col items-center gap-[0.5rem] px-[clamp(0.75rem,1.6vw,1.5rem)] py-[clamp(1.5rem,3vw,2.5rem)] text-center"
                  >
                    <Icon aria-hidden="true" strokeWidth={1.75} className="mb-[0.5rem] size-[1.125rem] text-foreground" />
                    <h3 className="text-balance text-[length:var(--text-body)] font-medium leading-[1.35] [overflow-wrap:anywhere]">{item.title}</h3>
                    {item.description && <p className="max-w-[18em] text-balance text-[length:var(--text-small)] leading-[1.45] text-muted-foreground">{item.description}</p>}
                  </BlurReveal>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AboutParticleRow;
