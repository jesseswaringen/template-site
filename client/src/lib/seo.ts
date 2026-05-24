export const businessInfo = {
  name: 'Seacoast EcoMow',
  description: 'Premier landscaping services in Portsmouth, NH',
  phone: '603-417-4296',
  email: 'info@seacoastecomow.com',
  address: 'Portsmouth, NH',
  url: 'https://seacoastecomow.com',
  logo: 'https://seacoastecomow.com/images/logo.png',
};

export const pages = {
  home: {
    title: 'Seacoast EcoMow | Premier Landscaping in Portsmouth, NH',
    description: 'Transform your outdoor space with professional landscaping services in Portsmouth, NH.',
    keywords: 'landscaping Portsmouth NH, lawn care, landscape design',
  },
  services: {
    title: 'Professional Landscaping Services | Seacoast EcoMow',
    description: 'Comprehensive landscaping services including lawn care, landscape design, hardscaping in Portsmouth, NH.',
    keywords: 'landscaping services Portsmouth, lawn care, landscape design',
  },
  gallery: {
    title: 'Landscaping Project Gallery | Seacoast EcoMow',
    description: 'View our portfolio of professional landscaping projects throughout Portsmouth, NH.',
    keywords: 'landscaping projects Portsmouth, landscape gallery',
  },
  about: {
    title: 'About Seacoast EcoMow | Local Landscaping Company',
    description: 'Learn about Seacoast EcoMow, a trusted landscaping company serving Portsmouth, NH.',
    keywords: 'about Seacoast EcoMow, local landscaping company',
  },
  contact: {
    title: 'Contact Seacoast EcoMow | Free Landscaping Estimate',
    description: 'Contact Seacoast EcoMow for a free landscaping estimate in Portsmouth, NH.',
    keywords: 'contact landscaping Portsmouth, free estimate',
  },
};

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    description: businessInfo.description,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Portsmouth',
      addressRegion: 'NH',
      addressCountry: 'US',
    },
    url: businessInfo.url,
    logo: businessInfo.logo,
    image: businessInfo.logo,
  };
}

export function updateMetaTags(title: string, description: string, keywords?: string) {
  document.title = title;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);

  if (keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);
  }
}

export function injectSchema(schema: Record<string, any>) {
  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.textContent = JSON.stringify(schema);
  document.head.appendChild(scriptTag);
}
