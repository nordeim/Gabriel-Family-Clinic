/**
 * ClinicMap Component
 * Interactive Google Maps integration for clinic locations
 * Matches Gabriel Family Clinic design system
 */

'use client';

import { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClinicMapProps {
  address: string;
  clinicName: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: string;
  className?: string;
  showOverlay?: boolean;
}

export default function ClinicMap({
  address,
  clinicName,
  lat = 1.4382, // Marsiling coordinates
  lng = 103.7831,
  zoom = 15,
  height = "400px",
  className = "",
  showOverlay = true
}: ClinicMapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate Google Maps embed URL
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(address)}&zoom=${zoom}&center=${lat},${lng}&maptype=roadmap`;

  // Handle iframe load events
  const handleIframeLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Generate external links
  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank', 'noopener,noreferrer');
  };

  const getDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div 
      className={`clinic-map-container ${className}`}
      style={{ minHeight: height }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Map Overlay */}
      {showOverlay && (
        <div className="clinic-map-overlay">
          <h4 className="clinic-map-title">{clinicName}</h4>
          <p className="clinic-map-address">{address}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2" />
            <p className="text-neutral-600 text-sm font-medium">Loading map...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-xl flex items-center justify-center">
          <div className="text-center p-6">
            <MapPin className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
            <p className="text-neutral-600 text-sm font-medium mb-2">Map temporarily unavailable</p>
            <button 
              onClick={openInGoogleMaps}
              className="text-primary-600 text-sm hover:text-primary-700 underline font-medium transition-colors"
            >
              View on Google Maps
            </button>
          </div>
        </div>
      )}

      {/* Google Maps Embed */}
      {!hasError && (
        <iframe
          className="clinic-map-iframe w-full h-full border-0"
          src={mapEmbedUrl}
          title={`Map showing location of ${clinicName} at ${address}`}
          style={{ minHeight: height }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`Interactive map showing ${clinicName} location`}
        />
      )}

      {/* Action Buttons */}
      {isLoaded && !hasError && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          <motion.button
            onClick={openInGoogleMaps}
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-neutral-700 hover:text-neutral-900 p-2 rounded-lg shadow-lg border border-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open map in Google Maps"
            title="Open in Google Maps"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            onClick={getDirections}
            className="bg-primary-600/95 backdrop-blur-sm hover:bg-primary-600 text-white p-2 rounded-lg shadow-lg border border-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get directions to clinic"
            title="Get Directions"
          >
            <Navigation className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}