import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

interface SizeOption {
  id: string;
  label: string;
  sqft: number;
  multiplier: number;
}

export default function CostEstimator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [lawnSize, setLawnSize] = useState(5000);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');

  const services: ServiceOption[] = [
    { id: 'lawn-care', name: 'Lawn Care & Maintenance', basePrice: 75, description: 'Mowing, edging, fertilization' },
    { id: 'landscape-design', name: 'Landscape Design & Installation', basePrice: 500, description: 'Custom design consultation' },
    { id: 'hardscaping', name: 'Hardscaping', basePrice: 1200, description: 'Patio, walkway, or retaining wall' },
    { id: 'tree-care', name: 'Tree & Shrub Care', basePrice: 150, description: 'Pruning and maintenance' },
    { id: 'irrigation', name: 'Irrigation Systems', basePrice: 800, description: 'System design and installation' },
    { id: 'seasonal', name: 'Seasonal Clean-ups', basePrice: 200, description: 'Spring/fall debris removal' },
  ];

  const sizeOptions: SizeOption[] = [
    { id: 'small', label: 'Small (< 5,000 sq ft)', sqft: 2500, multiplier: 0.8 },
    { id: 'medium', label: 'Medium (5,000 - 10,000 sq ft)', sqft: 7500, multiplier: 1 },
    { id: 'large', label: 'Large (10,000 - 20,000 sq ft)', sqft: 15000, multiplier: 1.3 },
    { id: 'extra-large', label: 'Extra Large (> 20,000 sq ft)', sqft: 25000, multiplier: 1.6 },
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  const calculateEstimate = () => {
    let total = 0;

    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        let servicePrice = service.basePrice;

        if (serviceId === 'lawn-care') {
          const sizeMultiplier = (lawnSize / 5000);
          servicePrice = service.basePrice * sizeMultiplier;

          if (frequency === 'monthly') {
            servicePrice = servicePrice * 4;
          }
        }

        total += servicePrice;
      }
    });

    return total;
  };

  const estimate = calculateEstimate();
  const hasServices = selectedServices.length > 0;

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-foreground mb-4 flex items-center justify-center gap-2">
            <DollarSign className="text-primary" />
            Instant Cost Estimator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a quick estimate for your landscaping project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Left: Service Selection */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h3 className="font-bold text-foreground mb-6 text-lg">Select Services</h3>

              <div className="space-y-4 mb-8">
                {services.map(service => (
                  <div key={service.id} className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => toggleService(service.id)}>
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => toggleService(service.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={service.id} className="font-semibold text-foreground cursor-pointer">
                        {service.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <span className="font-bold text-primary flex-shrink-0">
                      ${service.basePrice}
                    </span>
                  </div>
                ))}
              </div>

              {selectedServices.includes('lawn-care') && (
                <>
                  <h4 className="font-semibold text-foreground mb-4">Lawn Size</h4>
                  <div className="mb-6 p-4 bg-background rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">Square Footage</span>
                      <span className="font-bold text-primary text-lg">{lawnSize.toLocaleString()} sq ft</span>
                    </div>
                    <Slider
                      value={[lawnSize]}
                      onValueChange={(value) => setLawnSize(value[0])}
                      min={1000}
                      max={50000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>1,000</span>
                      <span>50,000</span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-foreground mb-4">Service Frequency</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'one-time' as const, label: 'One-Time Service' },
                      { value: 'monthly' as const, label: 'Monthly Service' },
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <input
                          type="radio"
                          name="frequency"
                          value={option.value}
                          checked={frequency === option.value}
                          onChange={(e) => setFrequency(e.target.value as 'one-time' | 'monthly')}
                          className="w-4 h-4"
                        />
                        <span className="text-foreground font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Right: Estimate Summary */}
          <div>
            <Card className="p-8 sticky top-24 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <h3 className="font-bold text-foreground mb-6">Estimate Summary</h3>

              {hasServices ? (
                <>
                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    {selectedServices.map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      if (!service) return null;

                      let price = service.basePrice;
                      if (serviceId === 'lawn-care') {
                        price = service.basePrice * (lawnSize / 5000);
                        if (frequency === 'monthly') price *= 4;
                      }

                      return (
                        <div key={serviceId} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{service.name}</span>
                          <span className="font-semibold text-foreground">${price.toFixed(0)}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-lg font-bold text-foreground">Total Estimate</span>
                      <span className="text-3xl font-bold text-primary">${estimate.toFixed(0)}</span>
                    </div>
                    {frequency === 'monthly' && (
                      <p className="text-xs text-muted-foreground">Per month (lawn care)</p>
                    )}
                  </div>

                  <Link href="/contact">
                    <a>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3">
                        Get Quote <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </a>
                  </Link>

                  <p className="text-xs text-muted-foreground text-center">
                    This is an estimate. Final pricing may vary based on site assessment.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Select services to see estimate</p>
                  <div className="text-4xl text-muted/50">—</div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
