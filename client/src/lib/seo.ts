export const businessInfo = {
  name: 'Lawncrest Outdoor Co.',
  description: 'Premier landscaping services in Portsmouth, NH',
  phone: '603-417-4000',
  email: 'info@lawncrestone.com',
  address: 'Portsmouth, NH',
  url: 'https://lawncrestone.com',
  logo: 'https://lawncrestone.com/images/logo.png',
};

export const pages = {
  home: {
    title: 'Lawncrest Outdoor Co. | Premier Landscaping in Portsmouth, NH',
    description: 'Transform your outdoor space with professional landscaping services in Portsmouth, NH.',
    keywords: 'landscaping Portsmouth NH, lawn care, landscape design',
  },
  services: {
    title: 'Professional Landscaping Services | Lawncrest Outdoor Co.',
    description: 'Comprehensive landscaping services including lawn care, landscape design, hardscaping in Portsmouth, NH.',
    keywords: 'landscaping services Portsmouth, lawn care, landscape design',
  },
  gallery: {
    title: 'Landscaping Project Gallery | Lawncrest Outdoor Co.',
    description: 'View our portfolio of professional landscaping projects throughout Portsmouth, NH.',
    keywords: 'landscaping projects Portsmouth, landscape gallery',
  },
  about: {
    title: 'About Lawncrest Outdoor Co. | Local Landscaping Company',
    description: 'Learn about Lawncrest Outdoor Co., a trusted landscaping company serving Portsmouth, NH.',
    keywords: 'about Lawncrest Outdoor Co., local landscaping company',
  },
  contact: {
    title: 'Contact Lawncrest Outdoor Co. | Free Landscaping Estimate',
    description: 'Contact Lawncrest Outdoor Co. for a free landscaping estimate in Portsmouth, NH.',
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
