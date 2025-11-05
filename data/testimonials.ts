import { Testimonial } from "@/types/testimonial";

/**
 * Sample testimonial data for Gabriel Family Clinic
 * Realistic healthcare testimonials with diverse conditions and doctors
 */

export const sampleTestimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    patientName: "Margaret S.",
    condition: "Arthritis Management",
    rating: 5,
    text: "After years of struggling with joint pain, Dr. Chen's compassionate care and treatment plan have given me my life back. I can now garden and play with my grandchildren without constant discomfort. The staff is always patient and understanding.",
    treatmentDate: "2024-10-15",
    doctorName: "Dr. Emily Chen",
    doctorTitle: "MD, Rheumatology",
    verified: true,
    location: "San Francisco, CA",
  },
  {
    id: "testimonial-2",
    patientName: "Robert M.",
    condition: "Diabetes Care",
    rating: 5,
    text: "Dr. Kumar and his team have been incredible in helping me manage my Type 2 diabetes. They take time to explain everything clearly and the online portal makes it easy to track my progress. I feel confident in my health journey now.",
    treatmentDate: "2024-09-28",
    doctorName: "Dr. Raj Kumar",
    doctorTitle: "MD, Endocrinology",
    verified: true,
    location: "Oakland, CA",
  },
  {
    id: "testimonial-3",
    patientName: "Dorothy W.",
    condition: "Heart Health",
    rating: 5,
    text: "The care I received for my heart condition was exceptional. Dr. Rodriguez explained everything in terms I could understand and never rushed our appointments. The follow-up care has been outstanding. I'm grateful for this clinic.",
    treatmentDate: "2024-11-01",
    doctorName: "Dr. Maria Rodriguez",
    doctorTitle: "MD, Cardiology",
    verified: true,
    location: "Berkeley, CA",
  },
  {
    id: "testimonial-4",
    patientName: "Thomas H.",
    condition: "Physical Therapy",
    rating: 4,
    text: "After my hip replacement, the physical therapy team here helped me regain mobility faster than I expected. The exercises were challenging but achievable, and the therapists were encouraging every step of the way.",
    treatmentDate: "2024-08-20",
    doctorName: "Dr. James Patterson",
    doctorTitle: "DPT, Physical Therapy",
    verified: true,
    location: "San Francisco, CA",
  },
  {
    id: "testimonial-5",
    patientName: "Helen T.",
    condition: "Geriatric Care",
    rating: 5,
    text: "As someone in my 80s, I appreciate Dr. Williams' thorough approach to my overall health. She coordinates all my care beautifully and always has time to answer my questions. The large print materials and clear instructions make everything easy to follow.",
    treatmentDate: "2024-10-05",
    doctorName: "Dr. Sarah Williams",
    doctorTitle: "MD, Geriatric Medicine",
    verified: true,
    location: "Oakland, CA",
  },
  {
    id: "testimonial-6",
    patientName: "James B.",
    condition: "Blood Pressure Management",
    rating: 5,
    text: "Dr. Chen helped me get my blood pressure under control through medication and lifestyle changes. The nutrition counseling was particularly helpful. I feel healthier and more energetic than I have in years.",
    treatmentDate: "2024-09-12",
    doctorName: "Dr. Emily Chen",
    doctorTitle: "MD, Internal Medicine",
    verified: true,
    location: "San Francisco, CA",
  },
  {
    id: "testimonial-7",
    patientName: "Elizabeth R.",
    condition: "Memory Care",
    rating: 5,
    text: "Dr. Kumar's expertise in cognitive health has been invaluable. The memory exercises and support groups have helped me maintain my independence. The staff treats everyone with such dignity and respect. Highly recommend!",
    treatmentDate: "2024-10-22",
    doctorName: "Dr. Raj Kumar",
    doctorTitle: "MD, Neurology",
    verified: true,
    location: "Berkeley, CA",
  },
];

/**
 * Get testimonials for display
 */
export function getTestimonials(): Testimonial[] {
  return sampleTestimonials;
}

/**
 * Get featured testimonials (5-star ratings)
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return sampleTestimonials.filter((t) => t.rating === 5);
}

/**
 * Get recent testimonials (last 3 months)
 */
export function getRecentTestimonials(): Testimonial[] {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  return sampleTestimonials.filter((t) => {
    const testimonialDate = new Date(t.treatmentDate);
    return testimonialDate >= threeMonthsAgo;
  });
}

/**
 * Get testimonials by doctor
 */
export function getTestimonialsByDoctor(doctorName: string): Testimonial[] {
  return sampleTestimonials.filter((t) => t.doctorName === doctorName);
}

/**
 * Get average rating
 */
export function getAverageRating(): number {
  const sum = sampleTestimonials.reduce((acc, t) => acc + t.rating, 0);
  return sum / sampleTestimonials.length;
}
