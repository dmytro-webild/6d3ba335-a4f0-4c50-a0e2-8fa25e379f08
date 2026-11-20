import { useState, type FormEvent } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import HalftonePhoto from "@/components/kit/HalftonePhoto";
import BlurReveal from "@/components/kit/BlurReveal";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type ContactSplitCellProps = {
  title?: string;
  labels?: { name?: string; email?: string; company?: string; message?: string };
  submitText?: string;
  successText?: string;
  imageSrc?: string;
  imageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const ContactSplitCell = ({
  title = "Talk to an edge engineer.",
  labels,
  submitText = "Send message",
  successText = "Thanks. An engineer in Amsterdam will reply within one working day.",
  imageSrc = "https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&w=1200",
  imageAlt = "Server aisle in a data centre",
  ariaLabel,
  className,
}: ContactSplitCellProps) => {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const fields = [
    { id: "name", label: labels?.name ?? "Name", type: "text", auto: "name" },
    { id: "email", label: labels?.email ?? "Email", type: "email", auto: "email" },
    { id: "company", label: labels?.company ?? "Company", type: "text", auto: "organization" },
  ];

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid grid-cols-1 border-l border-t border-dashed border-border lg:grid-cols-2">
          <div className="kit-card border-b border-r border-dashed border-border p-[clamp(1.5rem,3vw,2.5rem)]">
            {title && <TerminalTitleSweep text={title} tag="h2" className="max-w-[14em] text-balance text-[length:var(--text-h1)] [overflow-wrap:anywhere]" />}
            {sent ? (
              <p role="status" className="mt-[clamp(1.5rem,3vw,3rem)] max-w-[28em] text-pretty text-[length:var(--text-body-lg)] leading-[1.45] text-muted-foreground">
                {successText}
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-[1rem]">
                <div className="grid grid-cols-1 gap-[1rem] xl:grid-cols-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className={cn("flex flex-col gap-[0.5rem]", index === 2 && "xl:col-span-2")}>
                      <label htmlFor={`contact-${field.id}`} className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-muted-foreground">
                        {field.label}
                      </label>
                      <input id={`contact-${field.id}`} name={field.id} type={field.type} autoComplete={field.auto} required={field.id !== "company"} className="w-full rounded-[var(--radius)] border border-transparent bg-secondary px-[0.875rem] py-[0.75rem] text-[length:var(--text-body)] text-secondary-foreground outline-none transition-colors duration-300 focus:border-dashed focus:border-foreground/50" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                  <label htmlFor="contact-message" className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-muted-foreground">
                    {labels?.message ?? "Message"}
                  </label>
                  <textarea id="contact-message" name="message" rows={5} required className="w-full resize-none rounded-[var(--radius)] border border-transparent bg-secondary px-[0.875rem] py-[0.75rem] text-[length:var(--text-body)] text-secondary-foreground outline-none transition-colors duration-300 focus:border-dashed focus:border-foreground/50" />
                </div>
                <button type="submit" className="btn-primary mt-[0.5rem] self-start">
                  <p className="btn-label">{submitText}</p>
                </button>
              </form>
            )}
          </div>
          <div className="relative min-h-[20rem] overflow-hidden border-b border-r border-dashed border-border">
            <BlurReveal y={40} duration={1.6} delay={0.08} className="absolute inset-0">
              <HalftonePhoto src={imageSrc} alt={imageAlt} className="size-full" />
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSplitCell;
