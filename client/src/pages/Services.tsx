import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Leaf, Hammer, Trees, Droplets, Sparkles, Wind } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

import { updateMetaTags, pages } from '@/lib/seo';

export default function Services() {
  useEffect(() => {
    updateMetaTags(pages.services.title, pages.services.description, pages.services.keywords);
  }, []);

  const services = [
    {
      icon: Leaf,
      title: 'Lawn Care & Maintenance',
      description: 'Precision mowing, edging, fertilization, and weed control for healthy, vibrant lawns.',
      benefits: ['Precision mowing', 'Professional edging', 'Fertilization programs', 'Weed control', 'Seasonal assessments'],
    },
    {
      icon: Sparkles,
      title: 'Landscape Design & Installation',
      description: 'Custom designs featuring native plants and sustainable landscaping practices.',
      benefits: ['Design consultation', 'Native plant selection', 'Flower bed design', 'Seasonal color planning', 'Sustainable practices'],
    },
    {
      icon: Hammer,
      title: 'Hardscaping',
      description: 'Professional patios, walkways, and retaining walls with expert craftsmanship.',
      benefits: ['Patio design', 'Walkway construction', 'Retaining walls', 'Outdoor living areas', 'Stone & masonry'],
    },
    {
      icon: Trees,
      title: 'Tree & Shrub Care',
      description: 'Expert pruning, health assessments, and safe removal services.',
      benefits: ['Professional pruning', 'Health assessments', 'Disease treatment', 'Safe removal', 'Stump grinding'],
    },
    {
      icon: Droplets,
      title: 'Irrigation Systems',
      description: 'Smart sprinkler installation and maintenance for efficient watering.',
      benefits: ['System design', 'Smart installation', 'Water efficiency', 'Seasonal maintenance', 'Winterization'],
    },
    {
      icon: Wind,
      title: 'Seasonal Clean-ups',
      description: 'Spring and fall debris removal and property maintenance.',
      benefits: ['Spring cleanup', 'Fall leaf removal', 'Mulch installation', 'Flower bed prep', 'Winter preparation'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f3ef' }}>
      <Navigation />

      <main className="flex-1">
        {/* Page Header — deep earthy green-charcoal, inspired by hero image shadow/overlay */}
        <section
          className="py-12 md:py-16"
          style={{ backgroundColor: '#1e2d1e' }}
        >
          <div className="container animate-fade-in-up">
            {/* Warm off-white / stone — inspired by house facade and walkway in hero */}
            <h1 className="mb-4" style={{ color: '#f0ece4' }}>
              Professional Landscaping Services
            </h1>
            {/* Soft botanical green — lawn/shrub accent */}
            <p className="text-lg max-w-2xl" style={{ color: '#8fba8f' }}>
              Comprehensive landscaping solutions for Portsmouth, NH
            </p>
          </div>
        </section>

        {/* Service Cards — warm stone/linen background, white cards with premium shadow */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#f5f3ef' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={idx}
                    className="p-8 text-center hover:shadow-xl transition-shadow duration-300 animate-scale-in"
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: '#c8d8c0',  /* botanical green border */
                      boxShadow: '0 2px 12px rgba(30, 45, 30, 0.10)',
                    }}
                  >
                    {/* Deep landscape green icon — pulled from lawn/shrub tones in hero */}
                    <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: '#3a7a3a' }} />
                    {/* Dark earthy green-charcoal heading */}
                    <h3 className="font-bold mb-3 text-lg" style={{ color: '#1e2d1e' }}>
                      {service.title}
                    </h3>
                    {/* Warm muted sage body text */}
                    <p className="mb-5 text-sm" style={{ color: '#6b7d6b' }}>
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6 text-left">
                      {service.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex gap-2 items-start text-sm">
                          {/* Botanical green checkmark */}
                          <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#3a7a3a' }} />
                          <span style={{ color: '#6b7d6b' }}>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <a>
                        {/* Deep landscape green button — tied to hero lawn palette */}
                        <Button
                          size="sm"
                          className="w-full hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: '#3a7a3a', color: '#f0ece4' }}
                        >
                          Get Quote
                        </Button>
                      </a>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Band — dark earthy green-charcoal, mirrors hero image overlay depth */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#1e2d1e' }}>
          <div className="container text-center animate-fade-in-up">
            {/* Warm stone/off-white heading */}
            <h2 className="mb-6" style={{ color: '#f0ece4' }}>
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#8fba8f' }}>
              Contact us for a free consultation and estimate
            </p>
            <Link href="/contact">
              <a>
                {/* Botanical green button on dark band */}
                <Button
                  size="lg"
                  className="hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6ba876', color: '#f8faf7' }}
                >
                  Schedule Consultation
                </Button>
              </a>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
