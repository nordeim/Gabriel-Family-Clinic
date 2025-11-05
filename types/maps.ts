/**
 * TypeScript types for Google Maps integration
 */

export interface ClinicLocation {
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  lat?: number;
  lng?: number;
}

export interface ClinicMapProps {
  address: string;
  clinicName: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: string;
  className?: string;
  showOverlay?: boolean;
}

export interface MapEmbedConfig {
  apiKey?: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
}

export interface MapActionButtons {
  onGetDirections: () => void;
  onOpenInMaps: () => void;
  onShareLocation: () => void;
}