export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img
      src="/images/logo.png"
      alt="Seacoast EcoMow logo"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

export function LogoWithText({ className }: { className?: string }) {
  return (
    <img
      src="/images/logo.png"
      alt="Seacoast EcoMow logo"
      className={className ?? "h-10 w-auto md:h-14"}
      style={{ objectFit: 'contain' }}
    />
  );
}
