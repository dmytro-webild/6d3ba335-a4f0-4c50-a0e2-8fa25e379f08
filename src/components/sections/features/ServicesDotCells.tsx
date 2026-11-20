import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BlurReveal from "@/components/kit/BlurReveal";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";
import ParticleBlock from "@/components/kit/ParticleBlock";
import { glideCellShapes } from "@/components/kit/particleShapes/glide";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Service = {
  title: string;
  description?: string;
  button?: { text: string; href: string };
};

type ServicesDotCellsProps = {
  label?: string;
  title?: string;
  description?: string;
  items?: Service[];
  ariaLabel?: string;
  className?: string;
};

const defaults: Service[] = [
  { title: "Edge hosting", description: "Your site served from the node closest to each visitor.", button: { text: "Learn more", href: "#contact" } },
  { title: "Performance audits", description: "We find what slows your pages and fix it in code.", button: { text: "Learn more", href: "#contact" } },
  { title: "Live monitoring", description: "Every page checked around the clock from twelve regions.", button: { text: "Learn more", href: "#contact" } },
  { title: "Cost control", description: "Lean caching that cuts your bandwidth bill every month.", button: { text: "Learn more", href: "#contact" } },
];

const Cell = ({ item, index, wide }: { item: Service; index: number; wide: boolean }) => {
  return (
    <li className={cn("relative min-w-0 border-b border-r border-dashed border-border", wide && "lg:col-span-2")}>
      <BlurReveal
        blur={false} y={40}
        duration={1.6}
        delay={(index % 4) * 0.08}
        className="kit-card relative flex h-full flex-col gap-[clamp(1.25rem,2vw,1.75rem)] p-[clamp(0.75rem,1.4vw,1.25rem)]"
      >
        <div className={cn("kit-card relative aspect-[4/3] overflow-hidden border border-dashed border-border lg:aspect-[16/10]", wide && "lg:aspect-[32/10]")}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--border)_1px,transparent_1.5px)] [background-size:24px_24px]" />
          <ParticleBlock role="visit" settle together fill={0.66} turn={0.9} shape={glideCellShapes[index % glideCellShapes.length]} className="absolute inset-0" />
        </div>
        <div className="flex flex-1 flex-col items-start gap-[0.375rem] px-[clamp(0.5rem,1vw,0.875rem)] pb-[clamp(0.5rem,1vw,0.875rem)]">
          <h3 className="text-balance text-[length:var(--text-h3)] leading-[1.3] [overflow-wrap:anywhere]">{item.title}</h3>
          {item.description && <p className="max-w-[32em] text-balance text-[length:var(--text-small)] leading-[1.5] text-muted-foreground">{item.description}</p>}
          {item.button && (
            <a href={item.button.href} className="btn-link mt-auto pt-[0.75rem]">
              {item.button.text}
            </a>
          )}
        </div>
      </BlurReveal>
    </li>
  );
};

const ServicesDotCells = ({ label, title = "Everything your site needs to stay fast.", description, items = defaults, ariaLabel, className }: ServicesDotCellsProps) => {
  const odd = items.length % 2 === 1;

  return (
    <section aria-label={ariaLabel ?? title ?? "Services"} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col items-center gap-[0.75rem] border-x border-t border-dashed border-border px-[clamp(1rem,2vw,1.5rem)] py-[clamp(2rem,4vw,3.5rem)] text-center">
          {label && (
            <TerminalTitleSweep text={label} tag="p" from="color-mix(in srgb, var(--accent) 20%, var(--background))" final="var(--accent)" className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-accent" />
          )}
          <TerminalTitleSweep text={title} className="max-w-[18em] text-[length:var(--text-h1)] [overflow-wrap:anywhere]" />
          {description && <p className="max-w-[34em] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">{description}</p>}
        </div>
        <ul className="grid grid-cols-1 border-l border-t border-dashed border-border lg:grid-cols-2">
          {items.map((item, index) => (
            <Cell key={index} item={item} index={index} wide={odd && index === items.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServicesDotCells;
