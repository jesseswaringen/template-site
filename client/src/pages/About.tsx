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
      description: 'We take pride in clean lines, careful detail, and dependable results. Every project is completed with the goal of making your property look healthier, sharper, and better maintained.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We use thoughtful landscaping practices that support long-term lawn health, reduce waste, and respect the local coastal environment. Our goal is to make outdoor spaces beautiful without being careless with nature.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We are proud to serve local homeowners and businesses with honest, reliable landscaping services. Every yard we improve helps make the surrounding community cleaner, greener, and more inviting.',
    },
    {
      icon: Target,
      title: 'Integrity',
      description: 'We believe in clear communication, fair pricing, and doing what we say we will do. From the first estimate to the final cleanup, customers should feel respected, informed, and confident.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f3ef' }}>
      <Navigation />

      <main className="flex-1">
        {/* Page header — deep earthy green-charcoal */}
        <section className="py-12 md:py-16" style={{ backgroundColor: '#1e2d1e' }}>
          <div className="container animate-fade-in-up">
            <h1 className="mb-4" style={{ color: '#f0ece4' }}>About Lawncrest Outdoor Co.</h1>
            <p className="text-lg max-w-2xl" style={{ color: '#8fba8f' }}>
              Transforming outdoor spaces with professional expertise and environmental responsibility
            </p>
          </div>
        </section>

        {/* Our Story — warm stone background */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#f5f3ef' }}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="animate-fade-in-up">
                <h2 className="mb-6" style={{ color: '#1e2d1e' }}>Our Story</h2>
                <div className="space-y-4" style={{ color: '#6b7d6b' }}>
                  <p>
                    Lawncrest Outdoor Co. was founded on a simple belief: every property deserves professional landscaping that enhances its natural beauty while respecting the environment.
                  </p>
                  <p>
                    Our commitment to excellence drives everything we do. From precision lawn care to artistic landscape designs, we approach every project with dedication to quality.
                  </p>
                  <p>
                    As a Portsmouth-based company, we understand the unique landscape challenges of our region and are committed to supporting our community.
                  </p>
                </div>
              </div>
              <div className="h-[400px] rounded-lg overflow-hidden animate-fade-in" style={{ border: '1px solid #c8d8c0', boxShadow: '0 2px 16px rgba(30,45,30,0.12)' }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663687078477/VFbi5px2obvcB8AMQ4ssEy/hero-lawn-care-7YuXPoGoR6zxi2eqHXEZnf.webp"
                  alt="Lawncrest Outdoor Co. team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values — slightly darker warm stone band */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#eae7e0' }}>
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="mb-4" style={{ color: '#1e2d1e' }}>Our Values</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7d6b' }}>
                Core principles that guide our work
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={idx}
                    className="p-6 text-center animate-scale-in"
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: '#c8d8c0',
                      boxShadow: '0 2px 12px rgba(30,45,30,0.10)',
                    }}
                  >
                    <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: '#3a7a3a' }} />
                    <h3 className="font-bold mb-3" style={{ color: '#1e2d1e' }}>{value.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7d6b' }}>{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us — warm stone background */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#f5f3ef' }}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="h-[400px] rounded-lg overflow-hidden order-2 lg:order-1 animate-fade-in" style={{ border: '1px solid #c8d8c0', boxShadow: '0 2px 16px rgba(30,45,30,0.12)' }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663687078477/VFbi5px2obvcB8AMQ4ssEy/hardscape-patio-KnxtUsTAynKMCM2DovKKMo.webp"
                  alt="Professional hardscaping"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 lg:order-2 animate-fade-in-up">
                <h2 className="mb-6" style={{ color: '#1e2d1e' }}>Why Choose Us?</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <span className="font-bold text-xl flex-shrink-0" style={{ color: '#3a7a3a' }}>✓</span>
                    <div>
                      <p className="font-semibold" style={{ color: '#1e2d1e' }}>Local Expertise</p>
                      <p className="text-sm" style={{ color: '#6b7d6b' }}>Deep knowledge of Portsmouth climate</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="font-bold text-xl flex-shrink-0" style={{ color: '#3a7a3a' }}>✓</span>
                    <div>
                      <p className="font-semibold" style={{ color: '#1e2d1e' }}>Licensed & Insured</p>
                      <p className="text-sm" style={{ color: '#6b7d6b' }}>Full protection and peace of mind</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="font-bold text-xl flex-shrink-0" style={{ color: '#3a7a3a' }}>✓</span>
                    <div>
                      <p className="font-semibold" style={{ color: '#1e2d1e' }}>Eco-Friendly</p>
                      <p className="text-sm" style={{ color: '#6b7d6b' }}>Sustainable practices and native plants</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="font-bold text-xl flex-shrink-0" style={{ color: '#3a7a3a' }}>✓</span>
                    <div>
                      <p className="font-semibold" style={{ color: '#1e2d1e' }}>Free Estimates</p>
                      <p className="text-sm" style={{ color: '#6b7d6b' }}>No obligation consultations</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA band — deep earthy green-charcoal */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#1e2d1e' }}>
          <div className="container text-center animate-fade-in-up">
            <h2 className="mb-6" style={{ color: '#f0ece4' }}>Ready to Work With Us?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#8fba8f' }}>
              Contact us today to discuss your landscaping needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <a>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#6ba876', color: '#f8faf7' }}
                  >
                    Get Your Free Quote
                  </Button>
                </a>
              </Link>
              <a href="tel:6034174000">
                <Button
                  size="lg"
                  className="w-full sm:w-auto hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#3a7a3a', color: '#f0ece4' }}
                >
                  603-417-4000
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
