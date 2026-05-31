 import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AddressAutocomplete from '@/components/AddressAutocomplete';
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
    propertyStreetAddress: '',
    propertyCity: '',
    propertyState: '',
    propertyZipCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');

  const geoapifyApiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  // Debug: Log API key presence (not the actual key)
  useEffect(() => {
    console.log('=== Geoapify Debug ===');
    console.log('API key present:', Boolean(geoapifyApiKey));
    console.log('API key type:', typeof geoapifyApiKey);
    if (geoapifyApiKey) {
      console.log('API key length:', geoapifyApiKey.length);
      console.log('API key first 10 chars:', geoapifyApiKey.substring(0, 10) + '...');
    }
  }, [geoapifyApiKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSelect = (address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    fullAddress: string;
  }) => {
    console.log('Contact received address:', address);
    setFormData(prev => ({
      ...prev,
      propertyStreetAddress: address.streetAddress,
      propertyCity: address.city,
      propertyState: address.state,
      propertyZipCode: address.zipCode,
    }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const newFiles = Array.from(e.target.files ?? []);
    // Reset the native input so the same file can be re-added after removal
    e.target.value = '';

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalid = newFiles.filter(f => !allowed.includes(f.type));
    if (invalid.length > 0) {
      setFileError('Only JPG, JPEG, PNG, and WEBP image files are accepted.');
      return;
    }

    setSelectedFiles(prev => {
      // Merge: skip duplicates by name+size, then cap at 5
      const existing = prev;
      const merged = [...existing];
      for (const f of newFiles) {
        if (merged.length >= 5) break;
        const isDupe = merged.some(x => x.name === f.name && x.size === f.size);
        if (!isDupe) merged.push(f);
      }
      if (existing.length + newFiles.length > 5 && merged.length === 5) {
        setFileError(`Maximum 5 photos allowed. ${merged.length - existing.length} photo(s) added; the rest were ignored.`);
      }
      return merged;
    });
  };

  const removeFile = (index: number) => {
    setFileError('');
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build FormData manually from controlled state so nothing is missed.
    // We do NOT use new FormData(form) because the native file input is always
    // cleared after each selection (to allow re-adding files), so it holds no files.
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('service', formData.service);
    data.append('message', formData.message);

    // Append optional property address fields
    if (formData.propertyStreetAddress) {
      data.append('property_street_address', formData.propertyStreetAddress);
    }
    if (formData.propertyCity) {
      data.append('property_city', formData.propertyCity);
    }
    if (formData.propertyState) {
      data.append('property_state', formData.propertyState);
    }
    if (formData.propertyZipCode) {
      data.append('property_zip_code', formData.propertyZipCode);
    }
    // Append full address if any component exists
    if (formData.propertyStreetAddress || formData.propertyCity || formData.propertyState || formData.propertyZipCode) {
      const fullAddress = [
        formData.propertyStreetAddress,
        formData.propertyCity,
        formData.propertyState,
        formData.propertyZipCode
      ].filter(Boolean).join(', ');
      data.append('property_full_address', fullAddress);
    }

    // Append each accumulated file from React state
    selectedFiles.forEach(f => data.append('photos', f, f.name));

    try {
      const res = await fetch('https://formspree.io/f/xgoqygrj', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        toast.success('Thank you for your inquiry! We will be in touch shortly.');
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          service: '', 
          message: '',
          propertyStreetAddress: '',
          propertyCity: '',
          propertyState: '',
          propertyZipCode: '',
        });
        setSelectedFiles([]);
        setFileError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        toast.error('Something went wrong. Please try again or call us directly.');
      }
    } catch {
      toast.error('Network error. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f3ef' }}>
      <Navigation />

      <main className="flex-1">
        {/* Page header — deep earthy green-charcoal */}
        <section className="py-12 md:py-16" style={{ backgroundColor: '#1e2d1e' }}>
          <div className="container animate-fade-in-up">
            <h1 className="mb-4" style={{ color: '#f0ece4' }}>Contact Us</h1>
            <p className="text-lg max-w-2xl" style={{ color: '#8fba8f' }}>
              Get in touch with Lawncrest Outdoor Co. for a free estimate
            </p>
          </div>
        </section>

        {/* Contact info cards + form — warm stone background */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#f5f3ef' }}>
          <div className="container">
            {/* Info cards row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-stagger">
              {[
                { icon: Phone, title: 'Phone', value: '603-417-4000', link: 'tel:6034174000' },
                { icon: Mail, title: 'Email', value: 'info@lawncrestone.com', link: 'mailto:info@lawncrestone.com' },
                { icon: MapPin, title: 'Service Area', value: 'Portsmouth, NH & Surrounding Areas', link: '#' },
                { icon: Clock, title: 'Hours', value: 'Mon-Fri: 8AM-5PM', link: '#' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={idx}
                    className="p-6 text-center hover:shadow-lg transition-shadow duration-300 animate-scale-in"
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: '#c8d8c0',
                      boxShadow: '0 2px 12px rgba(30,45,30,0.10)',
                    }}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-4" style={{ color: '#3a7a3a' }} />
                    <h3 className="font-bold mb-2" style={{ color: '#1e2d1e' }}>{item.title}</h3>
                    {item.link.startsWith('tel:') || item.link.startsWith('mailto:') ? (
                      <a href={item.link} className="font-medium transition-colors" style={{ color: '#3a7a3a' }}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ color: '#6b7d6b' }}>{item.value}</p>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Form + sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact form */}
              <div className="animate-fade-in-up">
                <h2 className="mb-8" style={{ color: '#1e2d1e' }}>Send Us a Message to Receive a Quote</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#1e2d1e' }}>
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
                      style={{ borderColor: '#c8d8c0', backgroundColor: '#ffffff' }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#1e2d1e' }}>
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
                        style={{ borderColor: '#c8d8c0', backgroundColor: '#ffffff' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#1e2d1e' }}>
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
                        style={{ borderColor: '#c8d8c0', backgroundColor: '#ffffff' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2" style={{ color: '#1e2d1e' }}>
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a7a3a]"
                      style={{
                        border: '1px solid #c8d8c0',
                        backgroundColor: '#ffffff',
                        color: '#1e2d1e',
                      }}
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
                    <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#1e2d1e' }}>
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
                      style={{ borderColor: '#c8d8c0', backgroundColor: '#ffffff' }}
                    />
                  </div>

                  {/* Property Address Section (Optional) */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e2d1e' }}>
                      Property Address <span style={{ color: '#6b7d6b' }}>(Optional)</span>
                    </label>
                    <p className="text-xs mb-3" style={{ color: '#6b7d6b' }}>
                      Start typing your property address or enter it manually. This helps us understand where service is needed, but it is not required.
                    </p>
                    
                    {geoapifyApiKey && (
                      <div className="mb-3">
                        <AddressAutocomplete 
                          onAddressSelect={handleAddressSelect}
                          apiKey={geoapifyApiKey}
                        />
                      </div>
                    )}
                    
                    <div className="mb-3">
                      <Input
                        id="propertyStreetAddress"
                        name="propertyStreetAddress"
                        type="text"
                        value={formData.propertyStreetAddress}
                        onChange={handleChange}
                        placeholder="Street Address"
                        autoComplete="off"
                        className="w-full"
                        style={{ borderColor: '#c8d8c0', backgroundColor: '#ffffff' }}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Input
                            id="propertyCity"
                            name="propertyCity"
                            type="text"
                            value={formData.propertyCity}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full"
                            style={{ borderColor: '#c8d8c0', backgroundColor: '#ffffff' }}
                          />
                        </div>
                        <div>
                          <Input
                            id="propertyState"
                            name="propertyState"
                            type="text"
                            value={formData.propertyState}
                            onChange={handleChange}
                            placeholder="State"
                            className="w-full"
                            style={{ borderColor: '#c8d8c0', backgroundColor: '#ffffff' }}
                          />
                        </div>
                        <div>
                          <Input
                            id="propertyZipCode"
                            name="propertyZipCode"
                            type="text"
                            value={formData.propertyZipCode}
                            onChange={handleChange}
                            placeholder="ZIP Code"
                            className="w-full"
                            style={{ borderColor: '#c8d8c0', backgroundColor: '#ffffff' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photo upload field */}
                  <div>
                    <label htmlFor="photos" className="block text-sm font-medium mb-1" style={{ color: '#1e2d1e' }}>
                      Upload up to 5 photos of your yard or project <span style={{ color: '#6b7d6b' }}>(optional)</span>
                    </label>
                    <p className="text-xs mb-3" style={{ color: '#6b7d6b' }}>
                      Upload pictures of the area you'd like quoted — lawn, beds, hardscape, or any space you want us to work on. This helps us give you a more accurate estimate.
                    </p>
                    <div
                      className="w-full rounded-lg px-4 py-3"
                      style={{
                        border: fileError ? '1px dashed #d97373' : '1px dashed #c8d8c0',
                        backgroundColor: '#f9f8f5',
                      }}
                    >
                      <input
                        id="photos"
                        name="photos"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        onChange={handleFileChange}
                        className="w-full text-sm cursor-pointer"
                        style={{ color: '#6b7d6b' }}
                      />
                    </div>
                    {/* Error message */}
                    {fileError && (
                      <p className="text-xs mt-1 font-medium" style={{ color: '#d97373' }}>
                        {fileError}
                      </p>
                    )}
                    {/* Selected file list with remove buttons */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium mb-1" style={{ color: '#3a7a3a' }}>
                          {selectedFiles.length} photo{selectedFiles.length > 1 ? 's' : ''} selected:
                        </p>
                        <ul className="space-y-1">
                          {selectedFiles.map((file, i) => (
                            <li key={i} className="flex items-center justify-between gap-2 text-xs rounded px-2 py-1" style={{ backgroundColor: '#eae7e0' }}>
                              <span style={{ color: '#6b7d6b' }} className="truncate">• {file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="flex-shrink-0 font-bold hover:opacity-70 transition-opacity"
                                style={{ color: '#d97373' }}
                                aria-label={`Remove ${file.name}`}
                              >
                                ✕
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#3a7a3a', color: '#f0ece4' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>

              {/* Sidebar info cards */}
              <div className="animate-fade-in-up">
                <h2 className="mb-8" style={{ color: '#1e2d1e' }}>Get in Touch</h2>

                <Card
                  className="p-8 mb-8"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: '#c8d8c0',
                    boxShadow: '0 2px 12px rgba(30,45,30,0.10)',
                  }}
                >
                  <h3 className="font-bold mb-4" style={{ color: '#1e2d1e' }}>Business Hours</h3>
                  <div className="space-y-2" style={{ color: '#6b7d6b' }}>
                    <p><span className="font-semibold" style={{ color: '#1e2d1e' }}>Monday - Friday:</span> 8:00 AM - 5:00 PM</p>
                    <p><span className="font-semibold" style={{ color: '#1e2d1e' }}>Saturday:</span> By Appointment</p>
                    <p><span className="font-semibold" style={{ color: '#1e2d1e' }}>Sunday:</span> Closed</p>
                  </div>
                </Card>

                <Card
                  className="p-8 mb-8"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: '#c8d8c0',
                    boxShadow: '0 2px 12px rgba(30,45,30,0.10)',
                  }}
                >
                  <h3 className="font-bold mb-4" style={{ color: '#1e2d1e' }}>Service Area</h3>
                  <p style={{ color: '#6b7d6b' }}>
                    We proudly serve Portsmouth, NH and surrounding communities including Rye, New Castle, and Greenland.
                  </p>
                </Card>

                <Card
                  className="p-8"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: '#c8d8c0',
                    boxShadow: '0 2px 12px rgba(30,45,30,0.10)',
                  }}
                >
                  <h3 className="font-bold mb-4" style={{ color: '#1e2d1e' }}>Why Choose Us?</h3>
                  <ul className="space-y-2 text-sm" style={{ color: '#6b7d6b' }}>
                    <li style={{ color: '#3a7a3a' }}>✓ <span style={{ color: '#6b7d6b' }}>Licensed & Insured</span></li>
                    <li style={{ color: '#3a7a3a' }}>✓ <span style={{ color: '#6b7d6b' }}>Free Estimates</span></li>
                    <li style={{ color: '#3a7a3a' }}>✓ <span style={{ color: '#6b7d6b' }}>Local Expertise</span></li>
                    <li style={{ color: '#3a7a3a' }}>✓ <span style={{ color: '#6b7d6b' }}>Eco-Friendly Practices</span></li>
                    <li style={{ color: '#3a7a3a' }}>✓ <span style={{ color: '#6b7d6b' }}>Professional Team</span></li>
                    <li style={{ color: '#3a7a3a' }}>✓ <span style={{ color: '#6b7d6b' }}>Responsive Communication</span></li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA band — deep earthy green-charcoal */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#1e2d1e' }}>
          <div className="container text-center animate-fade-in-up">
            <h2 className="mb-6" style={{ color: '#f0ece4' }}>Ready to Get Started?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#8fba8f' }}>
              Contact us today for a free consultation
            </p>
            <a href="tel:6034174000">
              <Button
                size="lg"
                className="hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#6ba876', color: '#f8faf7' }}
              >
                Call Now: 603-417-4000
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
