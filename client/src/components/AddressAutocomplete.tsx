import { useEffect, useRef, useCallback } from 'react';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    fullAddress: string;
  }) => void;
  apiKey: string | undefined;
}

export default function AddressAutocomplete({ onAddressSelect, apiKey }: AddressAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<GeocoderAutocomplete | null>(null);

  const handleSelect = useCallback((location: any) => {
    console.log('Geoapify select event triggered:', location);
    
    if (!location || !location.properties) {
      console.warn('No location properties found');
      return;
    }

    const props = location.properties;
    console.log('Selected Geoapify props:', props);
    
    // Extract address components - prioritize address_line1
    const streetAddress = 
      props.address_line1 ||
      [props.housenumber, props.street].filter(Boolean).join(' ').trim() ||
      props.name ||
      props.formatted ||
      '';

    const city = props.city || props.town || props.village || props.municipality || props.county || '';
    const state = props.state_code || props.state || '';
    const zipCode = props.postcode || '';
    const fullAddress = props.formatted || [streetAddress, city, state, zipCode].filter(Boolean).join(', ');

    console.log('Parsed streetAddress:', streetAddress);
    console.log('Updating parent streetAddress state:', streetAddress);

    onAddressSelect({
      streetAddress,
      city,
      state,
      zipCode,
      fullAddress,
    });
  }, [onAddressSelect]);

  const handleSuggestions = useCallback((suggestions: any) => {
    console.log('Geoapify suggestions count:', suggestions?.length || 0);
  }, []);

  const handleRequestStart = useCallback((query: any) => {
    console.log('Geoapify request start:', query);
  }, []);

  const handleRequestEnd = useCallback((param: any) => {
    console.log('Geoapify request end:', param);
  }, []);

  useEffect(() => {
    console.log('AddressAutocomplete useEffect running');
    console.log('API key present:', Boolean(apiKey));
    console.log('Container ref exists:', !!containerRef.current);

    if (!containerRef.current || !apiKey) {
      console.warn('Missing container or API key, skipping Geoapify initialization');
      return;
    }

    // Clear container before initializing
    containerRef.current.innerHTML = '';

    console.log('Initializing Geoapify GeocoderAutocomplete...');

    // Initialize Geoapify Geocoder Autocomplete with correct options
    const autocomplete = new GeocoderAutocomplete(
      containerRef.current,
      apiKey,
      {
        placeholder: 'Search property address',
        lang: 'en',
        limit: 5,
        filter: {
          countrycode: ['us']
        },
        skipIcons: true,
        debounceDelay: 300,
        allowNonVerifiedHouseNumber: true,
        allowNonVerifiedStreet: true,
      }
    );

    autocompleteRef.current = autocomplete;
    console.log('Geoapify autocomplete initialized');

    // Listen to all relevant events for debugging
    autocomplete.on('suggestions', handleSuggestions);
    autocomplete.on('request_start', handleRequestStart);
    autocomplete.on('request_end', handleRequestEnd);
    autocomplete.on('select', handleSelect);

    // Cleanup
    return () => {
      console.log('Cleaning up Geoapify autocomplete');
      if (autocompleteRef.current) {
        autocompleteRef.current.off('suggestions', handleSuggestions);
        autocompleteRef.current.off('request_start', handleRequestStart);
        autocompleteRef.current.off('request_end', handleRequestEnd);
        autocompleteRef.current.off('select', handleSelect);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [apiKey, handleSelect, handleSuggestions, handleRequestStart, handleRequestEnd]);

  if (!apiKey) {
    console.warn('No Geoapify API key provided');
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full"
      style={{ position: 'relative', zIndex: 10 }}
    />
  );
}
