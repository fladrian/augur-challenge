import * as React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: 'bg-augur-blue text-white border-augur-blue hover:brightness-110 shadow-[0_0_15px_rgba(99,131,255,0.2)]',
      secondary: 'bg-transparent text-text-primary border-border-default hover:bg-bg-card hover:border-border-hover',
      ghost: 'bg-transparent text-text-secondary border-transparent hover:bg-bg-card hover:text-text-primary',
      danger: 'bg-severity-critical/10 text-severity-critical border-status-error/30 hover:bg-severity-critical/20',
    };

    const sizes: Record<string, string> = {
      sm: 'px-2.5 py-1 text-[11.5px] h-7',
      md: 'px-3.5 py-1.5 text-[12.5px] h-9',
      icon: 'p-2 h-8 w-8 justify-center',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 rounded-md font-semibold border transition-all duration-150 whitespace-nowrap active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
