import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { updateMetaTags, pages } from '@/lib/seo';

export default function Gallery() {
  useEffect(() => {
    updateMetaTags(pages.gallery.title, pages.gallery.description, pages.gallery.keywords);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const galleryItems = [
    {
      id: '1',
      title: 'Residential Lawn Care',
      category: 'Lawn Care',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663687078477/VFbi5px2obvcB8AMQ4ssEy/hero-lawn-care-7YuXPoGoR6zxi2eqHXEZnf.webp',
      description: 'Precision mowing and maintenance',
    },
    {
      id: '2',
      title: 'Stone Patio',
      category: 'Hardscaping',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663687078477/VFbi5px2obvcB8AMQ4ssEy/hardscape-patio-KnxtUsTAynKMCM2DovKKMo.webp',
      description: 'Custom stone patio installation',
    },
    {
      id: '3',
      title: 'Garden Design',
      category: 'Landscape Design',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663687078477/VFbi5px2obvcB8AMQ4ssEy/garden-design-JdpxFBjM3SSGoUVQGzZ6kV.webp',
      description: 'Native plant landscaping',
    },
    {
      id: '4',
      title: 'Tree Care',
      category: 'Tree Care',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663687078477/VFbi5px2obvcB8AMQ4ssEy/tree-care-D9QKQZqQ4YZNZyrFH2gm2E.webp',
      description: 'Professional tree pruning',
    },
  ];

  const categories = ['All', 'Lawn Care', 'Hardscaping', 'Landscape Design', 'Tree Care'];
  const filteredItems = selectedCategory === 'All' ? galleryItems : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container animate-fade-in-up">
            <h1 className="text-foreground mb-4">Project Gallery</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our landscaping projects throughout Portsmouth, NH
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12 border-b border-border">
          <div className="container">
            <div className="flex flex-wrap gap-3 animate-fade-in">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
              {filteredItems.map((item) => (
                <div key={item.id} className="group overflow-hidden rounded-lg h-[280px] md:h-[320px] cursor-pointer animate-scale-in">
                  <div className="relative w-full h-full">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container text-center animate-fade-in-up">
            <h2 className="text-foreground mb-4">Inspired by Our Work?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create something beautiful for your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  Get Your Free Quote
                </Button>
              </Link>
              <a href="tel:603-417-4296">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
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
