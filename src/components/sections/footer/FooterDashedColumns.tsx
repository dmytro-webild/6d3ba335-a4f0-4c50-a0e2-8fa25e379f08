import { motion, useReducedMotion, type Variants } from "motion/react";
import Icon, { type IconName } from "@/components/kit/Icon";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FooterLink = { text: string; href: string; note?: string };
type FooterColumn = { title: string; links: FooterLink[] };
type Social = { icon: IconName; href: string; label: string };

type FooterDashedColumnsProps = {
  brand?: string;
  logoSrc?: string;
  columns?: FooterColumn[];
  copyright?: string;
  rights?: string;
  socials?: Social[];
  ariaLabel?: string;
  className?: string;
};

const DEFAULT_COLUMNS: FooterColumn[] = [
  { title: "Platform", links: [{ text: "Edge hosting", href: "#" }, { text: "Network status", href: "#" }, { text: "Pricing", href: "#" }] },
  { title: "Company", links: [{ text: "About us", href: "#" }, { text: "Careers", href: "#", note: "Hiring" }, { text: "Contact", href: "#" }] },
  { title: "Legal", links: [{ text: "Terms of service", href: "#" }, { text: "Privacy policy", href: "#" }] },
];

const DEFAULT_SOCIALS: Social[] = [
  { icon: "linkedin", href: "#", label: "LinkedIn" },
  { icon: "github", href: "#", label: "GitHub" },
  { icon: "youtube", href: "#", label: "YouTube" },
  { icon: "twitter", href: "#", label: "X" },
];

const FooterDashedColumns = ({
  brand = "Northlane Edge",
  logoSrc,
  columns = DEFAULT_COLUMNS,
  copyright = "Copyright © 2025 Northlane Edge.",
  rights = "All rights reserved.",
  socials = DEFAULT_SOCIALS,
  ariaLabel,
  className,
}: FooterDashedColumnsProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();

  const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const wipe: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1.6, ease: kit.ease } },
  };

  return (
    <footer aria-label={ariaLabel ?? "Footer"} className={cn("relative bg-background pb-[clamp(3rem,5vw,4.25rem)] pt-[var(--section-space)] text-foreground", className)}>
      <motion.div initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={list} className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-[2.5rem] lg:flex-row lg:items-start lg:justify-between">
          <motion.div variants={wipe} className="flex items-center gap-[0.625rem]">
            {logoSrc ? (
              <Media src={logoSrc} alt={brand} loading="lazy" decoding="async" className="h-[1.5rem] w-auto" />
            ) : (
              <p className="whitespace-nowrap text-[length:var(--text-h3)] font-medium leading-none tracking-[var(--heading-tracking)]">{brand}</p>
            )}
          </motion.div>
          <div className="flex flex-col gap-[2.25rem] lg:flex-row lg:gap-[clamp(2rem,3.5vw,2.75rem)]">
            {columns.map((column, index) => (
              <motion.div key={index} variants={wipe} className="flex min-w-[8.5rem] flex-col gap-[0.75rem]">
                <p className="text-[length:var(--text-small)] font-medium leading-[1.6] text-foreground">{column.title}</p>
                <ul className="flex flex-col gap-[0.25rem]">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="flex items-center gap-[0.5rem]">
                      <a href={link.href} className="whitespace-nowrap text-[length:var(--text-small)] leading-[1.6] text-muted-foreground transition-colors duration-300 hover:text-foreground">
                        {link.text}
                      </a>
                      {link.note && <p className="whitespace-nowrap text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)] text-accent [font-family:var(--font-label)]">{link.note}</p>}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-[clamp(3rem,4.5vw,3.125rem)] border-t border-dashed border-border" />
        <motion.div variants={wipe} className="mt-[clamp(3rem,4.5vw,3.5rem)] flex flex-col gap-[2rem] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col">
            {copyright && <p className="text-[length:var(--text-small)] leading-[1.5] text-muted-foreground">{copyright}</p>}
            {rights && <p className="text-[length:var(--text-small)] leading-[1.5] text-muted-foreground">{rights}</p>}
          </div>
          {socials.length > 0 && (
            <ul className="flex items-center gap-[0.5rem]">
              {socials.map((social, index) => (
                <li key={index}>
                  <a href={social.href} aria-label={social.label} className="flex size-[2.125rem] items-center justify-center text-muted-foreground transition-colors duration-300 hover:text-foreground">
                    <Icon name={social.icon} className="size-[1.1rem]" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default FooterDashedColumns;
