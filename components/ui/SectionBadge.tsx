interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: 'solar' | 'green' | 'dark';
}

export default function SectionBadge({ children, variant = 'solar' }: SectionBadgeProps) {
  const styles = {
    solar: 'bg-[#FFF3CC] text-[#D48F00]',
    green: 'bg-[#E8F5E9] text-[#17A73D]',
    dark: 'bg-[#F8A700]/15 border border-[#F8A700]/40 text-[#F8A700]',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${styles[variant]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </span>
  );
}
