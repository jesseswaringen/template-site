import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { updateMetaTags, pages } from '@/lib/seo';

export default function Contact() {
  useEffect(() => {
    updateMetaTags(pages.contact.title, pages.contact.description, pages.contact.keywords);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Thank you for your inquiry! We will be in touch shortly.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container animate-fade-in-up">
            <h1 className="text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Get in touch with Seacoast EcoMow for a free estimate
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-stagger">
              {[
                { icon: Phone, title: 'Phone', value: '603-417-4296', link: 'tel:603-417-4296' },
                { icon: Mail, title: 'Email', value: 'info@seacoastecomow.com', link: 'mailto:info@seacoastecomow.com' },
                { icon: MapPin, title: 'Service Area', value: 'Portsmouth, NH & Surrounding Areas', link: '#' },
                { icon: Clock, title: 'Hours', value: 'Mon-Fri: 8AM-5PM', link: '#' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow duration-300 animate-scale-in">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    {item.link.startsWith('tel:') || item.link.startsWith('mailto:') ? (
                      <a href={item.link} className="text-primary hover:text-primary/80 transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.value}</p>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-fade-in-up">
                <h2 className="text-foreground mb-8">Send Us a Message</h2>
                <form action="https://formspree.io/f/xgoqygrj" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(603) 555-0000"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a service...</option>
                      <option value="lawn-care">Lawn Care & Maintenance</option>
                      <option value="landscape-design">Landscape Design & Installation</option>
                      <option value="hardscaping">Hardscaping</option>
                      <option value="tree-care">Tree & Shrub Care</option>
                      <option value="irrigation">Irrigation Systems</option>
                      <option value="seasonal">Seasonal Clean-ups</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      required
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>

              <div className="animate-fade-in-up">
                <h2 className="text-foreground mb-8">Get in Touch</h2>

                <Card className="p-8 mb-8">
                  <h3 className="font-bold text-foreground mb-4">Business Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><span className="font-semibold">Monday - Friday:</span> 8:00 AM - 5:00 PM</p>
                    <p><span className="font-semibold">Saturday:</span> By Appointment</p>
                    <p><span className="font-semibold">Sunday:</span> Closed</p>
                  </div>
                </Card>

                <Card className="p-8 mb-8">
                  <h3 className="font-bold text-foreground mb-4">Service Area</h3>
                  <p className="text-muted-foreground">
                    We proudly serve Portsmouth, NH and surrounding communities including Rye, New Castle, and Greenland.
                  </p>
                </Card>

                <Card className="p-8">
                  <h3 className="font-bold text-foreground mb-4">Why Choose Us?</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>✓ Licensed & Insured</li>
                    <li>✓ Free Estimates</li>
                    <li>✓ Local Expertise</li>
                    <li>✓ Eco-Friendly Practices</li>
                    <li>✓ Professional Team</li>
                    <li>✓ Responsive Communication</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container text-center animate-fade-in-up">
            <h2 className="text-primary-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation
            </p>
            <a href="tel:603-417-4296">
              <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
                Call Now: 603-417-4296
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
