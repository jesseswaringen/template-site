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
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container animate-fade-in-up">
            <h1 className="text-foreground mb-4">Professional Landscaping Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Comprehensive landscaping solutions for Portsmouth, NH
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Card key={idx} className="p-6 hover:shadow-lg transition-shadow duration-300 animate-scale-in">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2 text-lg">{service.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex gap-2 items-start text-sm">
                          <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <a>
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
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



        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container text-center animate-fade-in-up">
            <h2 className="text-primary-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Contact us for a free consultation and estimate
            </p>
            <Link href="/contact">
              <a>
                <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
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
