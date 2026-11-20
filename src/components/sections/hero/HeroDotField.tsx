import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import ParticleBlock from "@/components/kit/ParticleBlock";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";
import { glideField } from "@/components/kit/particleShapes/glide";
import { useKitMotion } from "@/components/kit/kitMotion";

type Button = { text: string; href: string };

type HeroDotFieldProps = {
  tag?: Button;
  title?: string;
  description?: string;
  primaryButton?: Button;
  secondaryButton?: Button;
  introDelay?: number;
  ariaLabel?: string;
  className?: string;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const HeroDotField = ({
  tag = { text: "New: Amsterdam region live", href: "#services" },
  title = "Fast sites. Everywhere.",
  description = "Northlane Edge keeps your sites and apps fast for every visitor, day and night.",
  primaryButton = { text: "Start free trial", href: "#pricing" },
  secondaryButton = { text: "See how it works", href: "#process" },
  introDelay = 0,
  ariaLabel,
  className,
}: HeroDotFieldProps) => {
  const reduce = Boolean(useReducedMotion());
  const { ease } = useKitMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [sweep, setSweep] = useState(reduce);
  useEffect(() => {
    const t = window.setTimeout(() => setSweep(true), introDelay * 1000);
    return () => window.clearTimeout(t);
  }, [introDelay]);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const shift = useTransform(scrollYProgress, (p) => -48 * clamp01(p / 0.45));
  const fade = useTransform(scrollYProgress, (p) => 1 - clamp01(p / 0.35));
  const frameScale = useTransform(scrollYProgress, (p) => 1 - 0.06 * clamp01(p));
  const frameIn = Math.max(0, introDelay - 0.6);

  const rise = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title} className={`relative h-svh min-h-[36rem] bg-background text-foreground ${className ?? ""}`}>
      <motion.div
        style={{ scale: reduce ? 1 : frameScale }}
        className="absolute inset-x-0 top-[4rem] bottom-[clamp(1rem,3svh,1.5rem)] mx-auto w-[var(--container)] overflow-hidden will-change-transform"
      >
        <ParticleBlock role="ambient" delay={introDelay} shape={glideField} className="absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--background)_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[clamp(1rem,8svh,5rem)] h-[clamp(24rem,62svh,36rem)] w-[min(100%,64rem)] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--background)_55%,transparent)]" />
        <motion.div
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease, delay: frameIn }}
          className="pointer-events-none absolute inset-0 z-[2] border border-dashed border-border"
        />

        <div className="relative z-[1] flex flex-col items-center px-[1.25rem] pt-[clamp(3rem,12svh,6rem)] text-center lg:pt-[clamp(5rem,22svh,12.5rem)]">
          {tag && (
            <motion.div style={{ opacity: fade, y: shift }}>
              <motion.a
                data-hero-chip
                href={tag.href}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease, delay: frameIn }}
                className="flex items-center gap-[0.75rem] whitespace-nowrap rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] py-[0.3125rem] pl-[0.625rem] pr-[0.3125rem] text-accent"
              >
                <p className="font-mono text-[length:var(--text-label)] uppercase leading-[1.6] tracking-[0.02em]">{tag.text}</p>
                <div aria-hidden="true" className="grid size-[1rem] place-items-center rounded-full bg-accent text-accent-foreground">
                  <svg viewBox="0 0 12 12" className="size-[0.5rem]" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
                  </svg>
                </div>
              </motion.a>
            </motion.div>
          )}

          <motion.div style={{ opacity: fade, y: shift }} className="mt-[clamp(1.5rem,3svh,2.125rem)] flex justify-center">
            {sweep ? (
              <TerminalTitleSweep text={title} tag="h1" className="max-w-[11em] text-[length:var(--text-display)] leading-[1.05] text-balance" />
            ) : (
              <h1 className="max-w-[11em] text-[length:var(--text-display)] leading-[1.05] text-balance text-transparent">{title}</h1>
            )}
          </motion.div>

          {description && (
            <motion.div style={{ opacity: fade, y: shift }} className="mt-[1.5rem]">
              <motion.p {...rise(introDelay + 0.35)} className="max-w-[24rem] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">
                {description}
              </motion.p>
            </motion.div>
          )}

          {(primaryButton || secondaryButton) && (
            <motion.div style={{ opacity: fade, y: shift }} className="mt-[clamp(1.5rem,3.5svh,2.125rem)]">
              <motion.div {...rise(introDelay + 0.45)} className="flex flex-wrap items-center justify-center gap-[0.625rem]">
                {primaryButton && (
                  <a href={primaryButton.href} className="btn-primary">
                    <p className="btn-label">{primaryButton.text}</p>
                  </a>
                )}
                {secondaryButton && (
                  <a href={secondaryButton.href} className="btn-secondary">
                    <p className="btn-label">{secondaryButton.text}</p>
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroDotField;
