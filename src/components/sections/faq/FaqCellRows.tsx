import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import BlurReveal from "@/components/kit/BlurReveal";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FaqItem = { title: string; description: string };

type FaqCellRowsProps = {
  label?: string;
  title?: string;
  description?: string;
  items?: FaqItem[];
  ariaLabel?: string;
  className?: string;
};

const defaults: FaqItem[] = [
  { title: "Where do my sites actually run?", description: "On our own racks in two Amsterdam data centres, with edge nodes in Frankfurt, London and Paris that serve cached pages close to your visitors." },
  { title: "Can I move from my current host without downtime?", description: "Yes. We copy your site, test it on a private link, then switch DNS once you approve. Most moves finish inside one working day." },
  { title: "What happens if a node goes down?", description: "Traffic shifts to the next nearest node within seconds. Our night shift is paged at the same moment and you get a short report the next morning." },
  { title: "Is my data stored inside the EU?", description: "Always. Every server, backup and log sits in the Netherlands or Germany, and we sign a data processing agreement with every customer." },
  { title: "Do you support my framework?", description: "Anything that builds to static files or runs on Node, PHP or Python. Our engineers help set up the first deploy at no extra cost." },
  { title: "How fast will I see a difference?", description: "Most customers see pages load twice as fast in the first week, mainly from edge caching and image resizing on our nodes." },
];

const FaqCellRows = ({ label, title = "Frequently asked questions.", description, items = defaults, ariaLabel, className }: FaqCellRowsProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section aria-label={ariaLabel ?? title ?? "Questions"} className={cn("relative overflow-x-clip bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 border-l border-t border-dashed border-border lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)]">
        <div className="border-b border-r border-dashed border-border">
          <div className="kit-card border-dashed border-border px-[clamp(1.25rem,2vw,1.5rem)] py-[clamp(2rem,4vw,3rem)] lg:sticky lg:top-[clamp(4.5rem,10svh,7rem)] lg:border-b">
            {label && <TerminalTitleSweep text={label} tag="p" className="mb-[0.75rem] text-[length:var(--text-label)] uppercase leading-[1.2] tracking-[var(--label-tracking)] text-accent [font-family:var(--font-label)]" />}
            <TerminalTitleSweep text={title} tag="h2" className="max-w-[12em] text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)]" />
            {description && <p className="mt-[0.75rem] max-w-[30em] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">{description}</p>}
          </div>
        </div>
        <ul className="flex flex-col">
          {items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-answer-${index}`;
            return (
              <li key={index} className="kit-card border-b border-r border-dashed border-border">
                <BlurReveal blur={false} y={40} duration={1.6} delay={(index % 4) * 0.08}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-[1.5rem] px-[clamp(1.25rem,2.4vw,2.125rem)] py-[clamp(1.25rem,2vw,1.75rem)] text-left focus-visible:outline-2 focus-visible:-outline-offset-2"
                  >
                    <p className="min-w-0 text-balance text-[length:var(--text-body-lg)] font-medium leading-[1.35] text-card-foreground [overflow-wrap:anywhere]">{item.title}</p>
                    <motion.div
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: kit.fast, ease: kit.ease }}
                      className={cn("relative size-[0.9rem] shrink-0 transition-colors", isOpen ? "text-accent" : "text-muted-foreground")}
                    >
                      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="answer"
                        initial={reduce ? false : { height: 0 }}
                        animate={{ height: "auto" }}
                        exit={reduce ? undefined : { height: 0 }}
                        transition={{ duration: kit.base, ease: kit.ease }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0%)" }}
                          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                          transition={{ duration: kit.base, ease: kit.ease, delay: 0.08 }}
                          className="max-w-[38em] px-[clamp(1.25rem,2.4vw,2.125rem)] pb-[clamp(1.25rem,2vw,1.75rem)] text-[length:var(--text-body)] leading-[1.6] text-muted-foreground"
                        >
                          {item.description}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </BlurReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqCellRows;
