import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Leaf, Zap, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { updateMetaTags, pages, generateLocalBusinessSchema, injectSchema } from '@/lib/seo';

export default function Home() {
  useEffect(() => {
    updateMetaTags(pages.home.title, pages.home.description, pages.home.keywords);
    injectSchema(generateLocalBusinessSchema());
  }, []);

  const services = [
    {
      icon: Leaf,
      title: 'Lawn Care & Maintenance',
      description: 'Precision mowing, edging, fertilization, and weed control tailored to Portsmouth climate.',
    },
    {
      icon: Zap,
      title: 'Landscape Design',
      description: 'Custom landscape designs featuring native plants and sustainable practices.',
    },
    {
      icon: Users,
      title: 'Hardscaping',
      description: 'Professional patios, walkways, and retaining walls with expert craftsmanship.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Seacoast EcoMow transformed our backyard into a beautiful outdoor living space. Highly professional!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      text: 'Best landscaping service in Portsmouth. Reliable, affordable, and they really care about their work.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      text: 'Our lawn has never looked better. The team is responsive and takes pride in every detail.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative py-20 md:py-32 overflow-hidden"
          style={{
            backgroundImage: 'url(/images/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/55 z-0" aria-hidden="true" />
          <div className="container relative z-10 animate-fade-in-up">
            <div className="max-w-2xl">
              <h1 className="text-white mb-6 leading-tight">
                Transform Your Outdoor Space with Professional Landscaping
              </h1>
              <p className="text-xl text-white/85 mb-8">
                Seacoast EcoMow delivers exceptional landscaping services for residential properties throughout Portsmouth, NH. From lawn care to complete landscape design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <a>
                    <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                      Get Your Free Quote
                    </Button>
                  </a>
                </Link>
                <a href="tel:603-417-4296">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    Call: 603-417-4296
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-foreground mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive landscaping solutions tailored to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-stagger">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Card key={idx} className="p-8 text-center hover:shadow-lg transition-shadow duration-300 animate-scale-in">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-foreground mb-3 text-lg">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <Link href="/services">
                      <a className="text-primary font-semibold hover:text-primary/80 transition-colors">
                        Learn More →
                      </a>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-foreground mb-6">Why Choose Seacoast EcoMow?</h2>
                <ul className="space-y-4">
                  {[
                    'Licensed and fully insured',
                    'Local expertise in Portsmouth landscaping',
                    'Eco-friendly practices',
                    'Free consultations and estimates',
                    'Professional, experienced team',
                    'Responsive customer service',
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-[400px] rounded-lg overflow-hidden animate-fade-in">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663687078477/VFbi5px2obvcB8AMQ4ssEy/hero-lawn-care-7YuXPoGoR6zxi2eqHXEZnf.webp"
                  alt="Professional landscaping in Portsmouth"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-foreground mb-4">What Our Clients Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by homeowners throughout Portsmouth for exceptional service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-stagger">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="p-6 animate-scale-in">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-foreground">— {testimonial.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container text-center animate-fade-in-up">
            <h2 className="text-primary-foreground mb-6">Ready to Enhance Your Landscape?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Contact Seacoast EcoMow today for a free consultation and estimate. Let's create something beautiful together.
            </p>
            <Link href="/contact">
              <a>
                <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
                  Schedule Your Free Consultation
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
