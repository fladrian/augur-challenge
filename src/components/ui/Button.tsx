import { 
  forwardRef, 
  ButtonHTMLAttributes, 
  ForwardRefRenderFunction, 
  ForwardedRef 
} from 'react';
import { cn } from '../../utils/cn';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'icon';
  className?: string;
}

const ButtonRender: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { className, variant = 'primary', size = 'md', ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const variants: Record<string, string> = {
    primary: 'bg-augur-blue text-white border-augur-blue hover:bg-augur-blue/90 hover:brightness-110 shadow-[0_4px_20px_rgba(99,131,255,0.25)] hover:shadow-[0_6px_25px_rgba(99,131,255,0.35)]',
    secondary: 'bg-transparent text-text-primary border-border-default hover:bg-bg-card hover:border-border-active hover:shadow-lg',
    ghost: 'bg-transparent text-text-secondary border-transparent hover:bg-bg-card hover:text-text-primary',
    danger: 'bg-severity-critical/10 text-severity-critical border-severity-critical/20 hover:bg-severity-critical/20 hover:border-severity-critical/40',
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
        'inline-flex items-center gap-2 rounded-md font-semibold border transition-all duration-200 whitespace-nowrap active:scale-[0.97] hover:scale-[1.02]',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    />
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonRender);

Button.displayName = 'Button';
