import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BlurReveal from "@/components/kit/BlurReveal";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";
import HalftonePhoto from "@/components/kit/HalftonePhoto";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Testimonial = { quote: string; name: string; role?: string; imageSrc: string; imageAlt?: string };

type TestimonialHalftoneLeadProps = {
  label?: string;
  title?: string;
  items?: Testimonial[];
  ariaLabel?: string;
  className?: string;
};

const photo = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

const defaults: Testimonial[] = [
  { quote: "We moved to Northlane Edge in a weekend and our checkout got twice as fast.", name: "Rafael Ortiz", role: "Head of engineering, Kanaal Commerce", imageSrc: photo(6605421) },
  { quote: "Our client sites went from sluggish to instant. They tuned every page before launch and we never had to ask twice.", name: "Ines Walker", role: "Founder, Studio Veld", imageSrc: photo(5737830) },
  { quote: "Traffic spikes used to keep us up at night. Now the edge absorbs them and the team sleeps through every launch.", name: "Tomas Berg", role: "CTO, Harbour Labs", imageSrc: photo(8801041) },
  { quote: "Pages load in under a second across Europe. Search rankings and conversions both climbed within a month.", name: "Lina Osei", role: "Marketing director, Fietsfabriek", imageSrc: photo(7900679) },
];

const QuoteCell = ({ item, index }: { item: Testimonial; index: number }) => (
  <div className="kit-card h-full border-b border-r border-dashed border-border">
    <BlurReveal
      blur={false}
      y={40}
      duration={1.6}
      delay={(index % 4) * 0.08}
      className="flex h-full min-h-[clamp(15rem,22vw,18.75rem)] flex-col justify-between gap-[2rem] p-[clamp(1.25rem,2.4vw,2.125rem)]"
    >
      <p className="text-[length:var(--text-body-lg)] leading-[1.5] text-muted-foreground [overflow-wrap:anywhere]">{item.quote}</p>
      <div className="flex items-center gap-[1rem]">
        <HalftonePhoto src={item.imageSrc} alt={item.imageAlt ?? item.name} className="size-10 shrink-0" />
        <div className="flex min-w-0 flex-col gap-[0.125rem]">
          <p className="text-[length:var(--text-small)] font-medium leading-[1.3] text-foreground [overflow-wrap:anywhere]">{item.name}</p>
          {item.role && <p className="text-[length:var(--text-small)] leading-[1.3] text-muted-foreground [overflow-wrap:anywhere]">{item.role}</p>}
        </div>
      </div>
    </BlurReveal>
  </div>
);

const TestimonialHalftoneLead = ({ label, title = "Customers see the difference in a week.", items = defaults, ariaLabel, className }: TestimonialHalftoneLeadProps) => {
  const leadRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const live = !reduce;
  const { scrollYProgress } = useScroll({ target: leadRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, (p) => `${(0.5 - p) * 10}%`);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback((api: EmblaCarouselType) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    sync(emblaApi);
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi, sync]);

  const [lead, ...rest] = items;
  if (!lead) return null;
  const carousel = rest.length > 3;
  const restCols = rest.length >= 3 ? "lg:grid-cols-3" : rest.length === 2 ? "lg:grid-cols-2" : "";

  return (
    <section aria-label={ariaLabel ?? title ?? "Testimonials"} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)] border-l border-t border-dashed border-border">
        <div className="flex flex-col items-center gap-[0.75rem] border-b border-r border-dashed border-border px-[clamp(1rem,2vw,1.5rem)] py-[clamp(2rem,4vw,3.5rem)] text-center">
          {label && <TerminalTitleSweep text={label} tag="p" className="font-mono text-[length:var(--text-label)] uppercase leading-[1.2] tracking-[var(--label-tracking)] text-accent" />}
          <TerminalTitleSweep text={title} tag="h2" className="max-w-[18em] text-[length:var(--text-h1)] [overflow-wrap:anywhere]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div
            ref={leadRef}
            className="kit-card relative aspect-[4/5] overflow-hidden border-b border-r border-dashed border-border lg:aspect-auto lg:min-h-[clamp(26rem,35vw,31.25rem)]"
          >
            <BlurReveal y={40} duration={1.6} className="absolute inset-[0.25rem] overflow-hidden">
              <motion.div style={live ? { y: drift } : undefined} className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
                <HalftonePhoto src={lead.imageSrc} alt={lead.imageAlt ?? lead.name} className="size-full" />
              </motion.div>
            </BlurReveal>
          </div>

          <div className="kit-card border-b border-r border-dashed border-border lg:col-span-2">
            <BlurReveal
              blur={false}
              y={40}
              duration={1.6}
              delay={0.08}
              className="flex h-full flex-col justify-between gap-[2.5rem] p-[clamp(1.25rem,3.9vw,3.5rem)]"
            >
              <div className="flex flex-col gap-[1.5rem]">
                <Quote aria-hidden="true" className="size-[clamp(2.5rem,4vw,3.5rem)] fill-accent text-accent" strokeWidth={0} />
                <p className="max-w-[22em] text-[length:var(--text-h2)] leading-[1.25] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]">
                  {lead.quote}
                </p>
              </div>
              <div className="flex flex-col gap-[0.25rem]">
                <p className="text-[length:var(--text-h3)] font-medium leading-[1.25] [overflow-wrap:anywhere]">{lead.name}</p>
                {lead.role && <p className="text-[length:var(--text-h3)] leading-[1.25] text-muted-foreground [overflow-wrap:anywhere]">{lead.role}</p>}
              </div>
            </BlurReveal>
          </div>
        </div>

        {rest.length > 0 && !carousel && (
          <div className={cn("grid grid-cols-1", restCols)}>
            {rest.map((item, index) => (
              <QuoteCell key={index} item={item} index={index} />
            ))}
          </div>
        )}

        {carousel && (
          <>
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex touch-pan-y">
                {rest.map((item, index) => (
                  <div key={index} className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3">
                    <QuoteCell item={item} index={index} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-[0.5rem] border-b border-r border-dashed border-border px-[clamp(1.25rem,2.4vw,2.125rem)] py-[1rem]">
              <button
                type="button"
                aria-label="Previous testimonial"
                disabled={!canPrev}
                onClick={() => emblaApi?.scrollPrev()}
                className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                disabled={!canNext}
                onClick={() => emblaApi?.scrollNext()}
                className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialHalftoneLead;
