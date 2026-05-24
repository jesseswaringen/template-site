import { Link } from 'wouter';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img
                src="/images/logo.png"
                alt="Seacoast EcoMow logo"
                className="h-12 w-auto"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Professional landscaping services for Portsmouth, NH and surrounding areas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/"><a className="text-muted-foreground hover:text-primary transition-colors">Home</a></Link></li>
              <li><Link href="/services"><a className="text-muted-foreground hover:text-primary transition-colors">Services</a></Link></li>
              <li><Link href="/gallery"><a className="text-muted-foreground hover:text-primary transition-colors">Gallery</a></Link></li>
              <li><Link href="/about"><a className="text-muted-foreground hover:text-primary transition-colors">About</a></Link></li>
              <li><Link href="/contact"><a className="text-muted-foreground hover:text-primary transition-colors">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 items-start">
                <Phone size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:603-417-4296" className="text-muted-foreground hover:text-primary transition-colors">
                  603-417-4296
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <Mail size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:info@seacoastecomow.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@seacoastecomow.com
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Portsmouth, NH</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Seacoast EcoMow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
