"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type LinkItem = { href: string; label: string };

export default function CollapsibleLinkSection({
  title,
  items,
  defaultOpen = false,
  accent,
}: {
  title: string;
  items: LinkItem[];
  defaultOpen?: boolean;
  accent?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (!items.length) return null;

  return (
    <details
      className="dm-fold"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="dm-fold-summary" style={accent ? { borderColor: `${accent}44` } : undefined}>
        <span>{title}</span>
        <em>{items.length}개</em>
        <ChevronDown size={18} className="dm-fold-chevron" aria-hidden />
      </summary>
      <div className="dm-fold-body">
        <div className="dm-links">
          {items.map((item) => (
            <Link key={item.href + item.label} className="dm-chip" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </details>
  );
}
