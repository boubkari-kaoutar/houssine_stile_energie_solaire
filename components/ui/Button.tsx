import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  asChild?: boolean;
  href?: string;
}

const variants = {
  primary:
    'bg-[#17A73D] text-white hover:bg-[#128a31] shadow-md hover:shadow-[#17A73D]/30 hover:scale-105',
  secondary:
    'border-2 border-[#1D1D1B]/20 text-[#1D1D1B] hover:border-[#17A73D] hover:text-[#17A73D] bg-transparent',
  ghost:
    'text-[#17A73D] hover:bg-[#17A73D]/8 bg-transparent',
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseClass = `inline-flex items-center justify-center gap-2.5 rounded-full font-bold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {icon && iconPosition === 'left' && <span>{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </a>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
}
