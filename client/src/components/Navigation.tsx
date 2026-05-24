import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { LogoWithText } from './Logo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container py-3 md:py-5 flex items-center justify-between">
        <Link href="/">
          <a className="hover:opacity-80 transition-opacity">
            <LogoWithText />
          </a>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="text-foreground hover:text-primary transition-colors font-medium">
                {link.label}
              </a>
            </Link>
          ))}
          <a href="tel:603-417-4296">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              603-417-4296
            </Button>
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-muted/50">
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
                  {link.label}
                </a>
              </Link>
            ))}
            <a href="tel:603-417-4296" className="block">
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                603-417-4296
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
