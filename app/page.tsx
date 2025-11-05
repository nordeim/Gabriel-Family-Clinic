"use client";

import { useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Heart,
  Phone,
  MapPin,
  Star,
  CheckCircle2,
  Users,
  Award,
  Shield,
  Stethoscope,
  Activity,
} from "lucide-react";

// Components
import { ElderButton } from "@/components/ui/elder-button";
import { ElderCard } from "@/components/ui/elder-card";
import { SkipLinks } from "@/components/accessibility/skip-link";
import { TextSizeControl } from "@/components/accessibility/text-size-control";
import { ScrollDepthTracker } from "@/components/analytics";

// Data
import { sampleTestimonials } from "@/data/testimonials";

// Analytics
import {
  trackAppointmentClick,
  trackPhoneClick,
  trackEmergencyClick,
  trackServiceClick,
  trackLocationClick,
} from "@/lib/analytics";

// Dynamic imports for performance
const TestimonialCarousel = lazy(() =>
  import("@/components/ui/testimonial-carousel").then((mod) => ({
    default: mod.TestimonialCarousel,
  }))
);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const locationsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Scroll Depth Tracking */}
      <ScrollDepthTracker />

      {/* Skip Links for Accessibility */}
      <SkipLinks
        links={[
          { href: "#main-content", label: "Skip to main content" },
          { href: "#services", label: "Skip to services" },
          { href: "#testimonials", label: "Skip to testimonials" },
          { href: "#contact", label: "Skip to contact" },
        ]}
      />

      {/* Header with Text Size Control */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Heart className="w-10 h-10 text-primary-600" aria-hidden="true" />
              <div>
                <h1 className="text-xl font-bold text-neutral-900">Gabriel Family Clinic</h1>
                <p className="text-sm text-neutral-600">Compassionate Care for Seniors</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <TextSizeControl />
              <ElderButton
                variant="outline"
                size="md"
                iconLeft={<Phone className="w-5 h-5" />}
                aria-label="Call clinic"
                onClick={() => trackPhoneClick("(415) 555-0123")}
              >
                <span className="hidden sm:inline">(415) 555-0123</span>
                <span className="sm:hidden">Call</span>
              </ElderButton>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 sm:py-24 lg:py-32"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <h2
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight"
                >
                  Excellence in Senior Healthcare
                </h2>
                <p className="text-xl sm:text-2xl text-neutral-700 mb-8 leading-relaxed">
                  Compassionate, personalized medical care designed specifically for older adults.
                  Your health, your comfort, our priority.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <ElderButton
                  variant="primary"
                  size="lg"
                  iconLeft={<Calendar className="w-6 h-6" />}
                  className="w-full sm:w-auto"
                  onClick={() => trackAppointmentClick("hero")}
                >
                  Book Appointment
                </ElderButton>
                <ElderButton
                  variant="outline"
                  size="lg"
                  iconLeft={<Phone className="w-6 h-6" />}
                  className="w-full sm:w-auto"
                  onClick={() => trackPhoneClick("(415) 555-0123")}
                >
                  Call Us Now
                </ElderButton>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-wrap justify-center gap-8 text-neutral-700"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-success-600" aria-hidden="true" />
                  <span className="text-lg">Medicare Accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-success-600" aria-hidden="true" />
                  <span className="text-lg">Walk-ins Welcome</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-success-600" aria-hidden="true" />
                  <span className="text-lg">Same-Day Appointments</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative gradient orb */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-30"
            aria-hidden="true"
          />
        </section>

        {/* Quick Actions Grid */}
        <section
          id="services"
          ref={servicesRef}
          className="py-16 sm:py-20 bg-white"
          aria-labelledby="services-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Comprehensive healthcare services tailored to senior needs
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: Calendar,
                  title: "Schedule Appointment",
                  description: "Book your visit online or by phone. Same-day appointments available.",
                  variant: "elevated" as const,
                },
                {
                  icon: Phone,
                  title: "24/7 Urgent Care",
                  description: "Round-the-clock medical support for urgent health concerns.",
                  variant: "elevated" as const,
                },
                {
                  icon: Stethoscope,
                  title: "Primary Care",
                  description: "Comprehensive health management and preventive care services.",
                  variant: "elevated" as const,
                },
                {
                  icon: Heart,
                  title: "Cardiology",
                  description: "Expert heart health monitoring and cardiovascular disease management.",
                  variant: "elevated" as const,
                },
                {
                  icon: Activity,
                  title: "Physical Therapy",
                  description: "Rehabilitation and mobility improvement programs for seniors.",
                  variant: "elevated" as const,
                },
                {
                  icon: Users,
                  title: "Geriatric Care",
                  description: "Specialized care addressing the unique needs of older adults.",
                  variant: "elevated" as const,
                },
              ].map((service, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <ElderCard
                    variant={service.variant}
                    padding="lg"
                    className="h-full hover:shadow-xl transition-shadow duration-400"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                        <service.icon className="w-8 h-8 text-primary-600" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{service.description}</p>
                      <ElderButton
                        variant="ghost"
                        size="sm"
                        className="mt-auto"
                        onClick={() => trackServiceClick(service.title)}
                      >
                        Learn More
                      </ElderButton>
                    </div>
                  </ElderCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          ref={testimonialsRef}
          className="py-16 sm:py-20 bg-neutral-50"
          aria-labelledby="testimonials-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                What Our Patients Say
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Real stories from real people who trust us with their health
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
                      <p className="mt-4 text-neutral-600">Loading testimonials...</p>
                    </div>
                  </div>
                }
              >
                <TestimonialCarousel testimonials={sampleTestimonials} />
              </Suspense>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section
          id="why-us"
          ref={whyUsRef}
          className="py-16 sm:py-20 bg-white"
          aria-labelledby="why-us-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 id="why-us-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                Why Choose Gabriel Family Clinic
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Decades of experience, cutting-edge care, compassionate service
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  icon: Award,
                  title: "35+ Years",
                  description: "Of excellence in senior healthcare services",
                  stat: "Since 1989",
                },
                {
                  icon: Users,
                  title: "10,000+",
                  description: "Seniors served with compassionate care",
                  stat: "Active Patients",
                },
                {
                  icon: Star,
                  title: "4.9/5.0",
                  description: "Average patient satisfaction rating",
                  stat: "Based on 2,500+ reviews",
                },
                {
                  icon: Shield,
                  title: "Board Certified",
                  description: "All physicians are highly qualified experts",
                  stat: "100% Certified",
                },
              ].map((benefit, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <ElderCard variant="glass" padding="lg" className="h-full text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                        <benefit.icon className="w-8 h-8 text-primary-600" aria-hidden="true" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary-600">{benefit.title}</h3>
                      <p className="text-neutral-700 font-medium">{benefit.description}</p>
                      <p className="text-sm text-neutral-500">{benefit.stat}</p>
                    </div>
                  </ElderCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Clinic Locations Section */}
        <section
          id="locations"
          ref={locationsRef}
          className="py-16 sm:py-20 bg-neutral-50"
          aria-labelledby="locations-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 id="locations-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                Our Locations
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Conveniently located to serve the Bay Area community
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  name: "San Francisco Main",
                  address: "123 Market Street, Suite 400",
                  city: "San Francisco, CA 94102",
                  phone: "(415) 555-0123",
                  hours: "Mon-Fri: 8am-6pm, Sat: 9am-3pm",
                },
                {
                  name: "Oakland Center",
                  address: "456 Broadway Avenue, Floor 2",
                  city: "Oakland, CA 94612",
                  phone: "(510) 555-0124",
                  hours: "Mon-Fri: 8am-6pm, Sat: 9am-3pm",
                },
                {
                  name: "Berkeley Clinic",
                  address: "789 University Avenue",
                  city: "Berkeley, CA 94704",
                  phone: "(510) 555-0125",
                  hours: "Mon-Fri: 8am-5pm",
                },
              ].map((location, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <ElderCard variant="elevated" padding="lg" className="h-full">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" aria-hidden="true" />
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900 mb-2">{location.name}</h3>
                          <p className="text-neutral-600">{location.address}</p>
                          <p className="text-neutral-600">{location.city}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-6 h-6 text-primary-600 flex-shrink-0" aria-hidden="true" />
                        <a
                          href={`tel:${location.phone.replace(/[^\d]/g, "")}`}
                          className="text-neutral-900 font-medium hover:text-primary-600 transition-colors"
                          onClick={() => trackPhoneClick(location.phone)}
                        >
                          {location.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-primary-600 flex-shrink-0" aria-hidden="true" />
                        <p className="text-neutral-600">{location.hours}</p>
                      </div>

                      <ElderButton
                        variant="outline"
                        size="md"
                        iconLeft={<MapPin className="w-5 h-5" />}
                        fullWidth
                        onClick={() => trackLocationClick(location.name)}
                      >
                        Get Directions
                      </ElderButton>
                    </div>
                  </ElderCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          id="contact"
          ref={contactRef}
          className="py-20 sm:py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white"
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Experience Better Healthcare?
              </h2>
              <p className="text-xl sm:text-2xl mb-8 text-primary-50">
                Schedule your appointment today and join thousands of satisfied patients who trust Gabriel
                Family Clinic for their healthcare needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <ElderButton
                  variant="secondary"
                  size="xl"
                  iconLeft={<Calendar className="w-6 h-6" />}
                  className="w-full sm:w-auto bg-white text-primary-600 hover:bg-primary-50"
                  onClick={() => trackAppointmentClick("cta")}
                >
                  Book Your Appointment
                </ElderButton>
                <ElderButton
                  variant="outline"
                  size="xl"
                  iconLeft={<Phone className="w-6 h-6" />}
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                  onClick={() => trackPhoneClick("(415) 555-0123")}
                >
                  Call (415) 555-0123
                </ElderButton>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Emergency? We're Here 24/7</h3>
                <p className="text-primary-50 mb-4">
                  For urgent medical concerns, call our 24-hour emergency line or visit your nearest emergency
                  room.
                </p>
                <ElderButton
                  variant="destructive"
                  size="lg"
                  iconLeft={<Phone className="w-6 h-6" />}
                  className="bg-error-600 hover:bg-error-700"
                  onClick={() => trackEmergencyClick()}
                >
                  Emergency: (415) 555-9911
                </ElderButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-12" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-primary-500" aria-hidden="true" />
                <h3 className="text-xl font-bold text-white">Gabriel Family Clinic</h3>
              </div>
              <p className="text-neutral-400 mb-4">
                Providing compassionate, quality healthcare to seniors across the Bay Area since 1989.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="hover:text-primary-400 transition-colors">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-primary-400 transition-colors">
                    Patient Reviews
                  </a>
                </li>
                <li>
                  <a href="#locations" className="hover:text-primary-400 transition-colors">
                    Locations
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary-400 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary-500" aria-hidden="true" />
                  <a href="tel:+14155550123" className="hover:text-primary-400 transition-colors">
                    (415) 555-0123
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-500" aria-hidden="true" />
                  <span>123 Market Street, SF, CA 94102</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400">
            <p>&copy; 2025 Gabriel Family Clinic. All rights reserved.</p>
            <p className="mt-2 text-sm">
              <a href="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              {" | "}
              <a href="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
              {" | "}
              <a href="/accessibility" className="hover:text-primary-400 transition-colors">
                Accessibility
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
