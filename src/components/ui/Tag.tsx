import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TagVariant = 'red' | 'blue' | 'purple' | 'teal' | 'gray';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  className?: string;
}

const variantStyles: Record<TagVariant, string> = {
  red: 'bg-[var(--tag-red)] text-[var(--tag-red-text)] border-[var(--tag-red-border)]',
  blue: 'bg-[var(--tag-blue)] text-[var(--tag-blue-text)] border-[var(--tag-blue-border)]',
  purple: 'bg-[var(--tag-purple)] text-[var(--tag-purple-text)] border-[var(--tag-purple-border)]',
  teal: 'bg-[var(--tag-teal)] text-[var(--tag-teal-text)] border-[var(--tag-teal-border)]',
  gray: 'bg-[var(--tag-gray)] text-[var(--tag-gray-text)] border-[var(--tag-gray-border)]',
};

const getVariantFromContent = (content: string): TagVariant => {
  const c = content.toLowerCase();
  if (c.includes('malware') || c.includes('apt') || c.includes('critical') || c.includes('ransomware') || c.includes('tor')) return 'red';
  if (c.includes('network') || c.includes('brute-force') || c.includes('scanner')) return 'blue';
  if (c.includes('phishing') || c.includes('email')) return 'teal';
  if (c.includes('botnet') || c.includes('dropper') || c.includes('c2')) return 'purple';
  return 'gray';
};

export const Tag = ({ children, variant, className }: TagProps) => {
  const resolvedVariant = variant || (typeof children === 'string' ? getVariantFromContent(children) : 'gray');

  return (
    <span
      className={cn(
        'px-1.5 py-0.5 rounded-[var(--radius-sm)] text-[10.5px] font-medium border transition-colors',
        variantStyles[resolvedVariant],
        className
      )}
    >
      {children}
    </span>
  );
};
