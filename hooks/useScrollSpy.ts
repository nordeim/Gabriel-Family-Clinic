import { useEffect, useState } from 'react';

interface ScrollSpyOptions {
  threshold?: number;
  rootMargin?: string;
  sectionIds: string[];
}

interface ScrollSpyState {
  activeSection: string | null;
  scrollY: number;
  direction: 'up' | 'down';
  scrollProgress: number;
}

export const useScrollSpy = (options: ScrollSpyOptions): ScrollSpyState => {
  const { threshold = 0.6, rootMargin = '0px', sectionIds } = options;
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);

      // Calculate scroll progress (0 to 1)
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? Math.min(currentScrollY / documentHeight, 1) : 0;
      setScrollProgress(progress);

      lastScrollY = currentScrollY;
    };

    const observeSections = () => {
      const observers: IntersectionObserver[] = [];

      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          },
          {
            threshold,
            rootMargin,
          }
        );

        observer.observe(element);
        observers.push(observer);
      });

      return observers;
    };

    // Set up scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set up intersection observers
    const observers = observeSections();

    // Call handleScroll immediately to set initial values
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [threshold, rootMargin, sectionIds]);

  return { activeSection, scrollY, direction, scrollProgress };
};

export default useScrollSpy;