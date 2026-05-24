import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Award, Leaf, Users, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { updateMetaTags, pages } from '@/lib/seo';

export default function About() {
  useEffect(() => {
    updateMetaTags(pages.about.title, pages.about.description, pages.about.keywords);
  }, []);

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Exceptional quality in every project',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Eco-friendly practices and native plants',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Dedicated to Portsmouth beautification',
    },
    {
      icon: Target,
      title: 'Integrity',
      description: 'Honest communication and fair pricing',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container animate-fade-in-up">
            <h1 className="text-foreground mb-4">About Seacoast EcoMow</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Transforming outdoor spaces with professional expertise and environmental responsibility
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Seacoast EcoMow was founded on a simple belief: every property deserves professional landscaping that enhances its natural beauty while respecting the environment.
                  </p>
                  <p>
                    Our commitment to excellence drives everything we do. From precision lawn care to artistic landscape designs, we approach every project with dedication to quality.
                  </p>
                  <p>
                    As a Portsmouth-based company, we understand the unique landscape challenges of our region and are committed to supporting our community.
                  </p>
                </div>
              </div>
              <div className="h-[400px] rounded-lg overflow-hidden animate-fade-in">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663687078477/VFbi5px2obvcB8AMQ4ssEy/hero-lawn-care-7YuXPoGoR6zxi2eqHXEZnf.webp"
                  alt="Seacoast EcoMow team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Core principles that guide our work
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <Card key={idx} className="p-6 text-center animate-scale-in">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="h-[400px] rounded-lg overflow-hidden order-2 lg:order-1 animate-fade-in">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663687078477/VFbi5px2obvcB8AMQ4ssEy/hardscape-patio-KnxtUsTAynKMCM2DovKKMo.webp"
                  alt="Professional hardscaping"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 lg:order-2 animate-fade-in-up">
                <h2 className="text-foreground mb-6">Why Choose Us?</h2>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3 items-start">
                    <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-foreground">Local Expertise</p>
                      <p className="text-sm">Deep knowledge of Portsmouth climate</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-foreground">Licensed & Insured</p>
                      <p className="text-sm">Full protection and peace of mind</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-foreground">Eco-Friendly</p>
                      <p className="text-sm">Sustainable practices and native plants</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-foreground">Free Estimates</p>
                      <p className="text-sm">No obligation consultations</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container text-center animate-fade-in-up">
            <h2 className="text-primary-foreground mb-6">Ready to Work With Us?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your landscaping needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <a>
                  <Button size="lg" className="w-full sm:w-auto bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
                    Get Your Free Quote
                  </Button>
                </a>
              </Link>
              <a href="tel:603-417-4296">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Call: 603-417-4296
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
