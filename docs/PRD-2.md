# Updated Project Requirements Document — Gabriel Family Clinic (Merged, Final)

## Executive summary
Build a modern, patient‑centric Gabriel Family Clinic site that combines the emotional, trust‑forward design vision with a production‑grade engineering implementation. Deploy a phased delivery using Next.js + shadcn/ui, Prisma, tRPC, and Supabase (Postgres + Storage). The platform will prioritise fast booking, low‑friction new‑patient registration, accessible core flows (WCAG AA), staff reconciliation for bookings, and measurable KPIs for conversion and reliability.

---

## Table of contents
1. Goals, Success Metrics, Scope  
2. Key decisions and rationale (including Auth selection)  
3. Architecture and tech stack (final)  
4. Data model (finalized additions)  
5. Functional requirements (MVP + Phase plan)  
6. Non‑functional requirements (accessibility, security, performance)  
7. Integrations and contracts (PMS, SMS, Email)  
8. QA, testing & acceptance criteria  
9. Delivery roadmap, roles, and governance  
10. Immediate next steps and artifacts to produce

---

## 1. Goals, Success Metrics, Scope

Goals
- Convert web visitors to confirmed bookings and registered patients with clear, outcome‑oriented user journeys.
- Preserve Gabriel Family Clinic’s neighbourhood trust and human tone while upgrading usability, accessibility, and performance.
- Provide staff tools to reconcile bookings and manage clinician data securely.

Primary KPIs (SMART)
- Bookings (web → confirmed) +30% vs baseline within 8 weeks post-MVP.
- Booking abandonment −40% vs baseline.
- New patient registration completion +25%.
- Returning user time‑to‑book < 90s.
- WCAG 2.1 AA for core flows.
- Lighthouse mobile score ≥ 85 in MVP; ≥ 90 in optimised release.

In‑scope (MVP)
- Public pages: Home, Services hub & detail, Clinics hub & detail, Clinician profiles, About, FAQ, Contact.
- Core flows: Booking modal + full booking flow, New Patient Registration (multi‑step, autosave), Clinic locator.
- Auth scaffold (OTP) and minimal patient portal: upcoming appointments + rebook.
- Admin console MVP: clinicians, clinics and booking reconciliation.
- Analytics instrumentation and error monitoring.

Out‑of‑scope (Phase >1)
- Full medical record management, claims/insurance adjudication, advanced AI symptom diagnosis, telemedicine video integration (Phase 3+).

---

## 2. Key decisions and rationale

Final technology choices
- Primary DB & Auth: Supabase Postgres + Supabase Auth (recommended) — aligns with managed Postgres, built‑in auth, storage, and real‑time capabilities, reducing integration surface and simplifying operations when Supabase is used as canonical datastore.
- Framework & UI: Next.js (App Router) + shadcn/ui (Radix + Tailwind) for accessible components and SSR/ISR.
- ORM: Prisma for schema & migrations (works with Supabase Postgres).
- API & contracts: tRPC for typed server/client procedures.
- Storage: Supabase Storage for signed URLs and private buckets.
- Monitoring: Sentry; Analytics: GA4 + custom events.

Auth choice: Supabase Auth vs NextAuth — recommendation
- Recommendation: Supabase Auth when Supabase is your canonical backend (preferred for this project). It provides an integrated auth + user console, easy mapping to Supabase user IDs, built‑in support for email/OTP and social providers, and simplifies staff/admin management in the Supabase console.
- When to use NextAuth: If you require complex provider workflows, advanced session customizations, or plan to decouple from Supabase later, NextAuth offers more provider flexibility and mature Next.js integrations.
- Pragmatic match: For Gabriel Family Clinic (Supabase as DB/storage, desire for fast integration and minimal infrastructure overhead), choose Supabase Auth for reliability and developer velocity. Community discussion and practical experience generally recommend Supabase Auth when staying on Supabase to reduce friction.

References: community comparisons and guides indicate Supabase Auth is the common choice when Supabase is the primary platform; NextAuth remains popular for broader provider flexibility and ecosystems.

---

## 3. Architecture and tech stack (final)

Overview
- Next.js (App Router) for pages and server actions; SSR for SEO pages; ISR for hubs.
- shadcn/ui (Radix + Tailwind) for component library, Storybook for isolated components.
- tRPC for typed backend procedures; Prisma client to access Supabase Postgres.
- Supabase: Postgres (primary data), Auth (users, OTP), Storage (private buckets), Realtime for optional clinician slot updates.
- Background jobs: serverless functions or a small queue (e.g., Cloud Run / Supabase Edge Functions) for reconciliation and retry.
- CI/CD: GitHub Actions → Vercel (production) + Supabase staging databases.

Security & Privacy
- PDPA compliance focus (Singapore). Encrypt PHI at rest where required; TLS everywhere; signed URLs for files with short expiry; audit logs for data exports and booking changes.

---

## 4. Data model (finalized additions)

Merge of your Prisma schema with additional models required for concurrency and autosave. Add these models to `prisma/schema.prisma`:

- ScheduleSlot (new)
  - id String @id @default(uuid())
  - clinicianId String
  - clinicId String
  - startsAt DateTime
  - endsAt DateTime
  - isBooked Boolean @default(false)
  - source String // pms|manual|external
  - externalId String? // PMS slot id
  - createdAt DateTime @default(now())
  - updatedAt DateTime @updatedAt

- RegistrationDraft (new)
  - id String @id @default(uuid())
  - patientTempId String? // non‑auth identifier
  - data Json
  - resumeToken String @unique
  - expiresAt DateTime
  - createdAt DateTime @default(now())
  - updatedAt DateTime @updatedAt

- AuditLog (new)
  - id String @id @default(uuid())
  - actorType String // PATIENT|STAFF|SYSTEM
  - actorId String?
  - action String
  - details Json?
  - createdAt DateTime @default(now())

Adjust existing `Appointment` model to reference ScheduleSlot where relevant:
- Add slotId String? and relation to ScheduleSlot.
- Keep idempotencyKey for create idempotency.

Acceptances: migration files committed; seeded staging data includes sample slots for concurrency testing.

---

## 5. Functional requirements (MVP + phases)

MVP (Phase 1 — 3 weeks)
- Home: hero with single primary CTA (Book); triage strip (I want to…).
- Services hub & detail: filters, service cards with duration & price band.
- Clinic hub & detail: address, hours, phone, map embed, clinician list.
- Clinician profiles: portrait, credentials, languages, next available slots.
- Booking Quick Modal: 3‑step (clinic/service/slot → patient → confirm).
- New Patient Registration: multi‑step with autosave (RegistrationDraft).
- Patient portal (basic): upcoming appointments, rebook.
- Admin console MVP: CRUD clinicians/clinics/services; booking reconciliation UI.
- Analytics: GA4 events (booking_start, booking_step, booking_complete, registration_start, registration_complete).
- Accessibility: WCAG AA for core flows; keyboard/test scripts.

Phase 2 (Integrations, 4–6 weeks)
- Supabase Auth OTP flow fully integrated; session & profile mapping.
- PMS connector: API primary; CSV fallback ingestion + reconciliation jobs.
- Notifications: SMS (Twilio) + Email (SendGrid).
- Calendar invites: ICS link generation and optional Google Add.

Phase 3 (Personalization & advanced)
- Patient hub enhancements (visit summaries, secure messaging stub).
- Telemedicine pilot, voice search MVP, clinician compare.

Phase 4 (Optimization)
- Full WCAG remediation, Lighthouse target ≥ 90, PWA, A/B testing program.

---

## 6. Non‑functional requirements

Accessibility
- WCAG 2.1 AA baseline; component level ARIA: Booking Modal (role=dialog, focus trap), Datepicker (keyboard nav), Typeahead (aria-activedescendant), live regions for async slot updates.

Performance
- Lighthouse mobile ≥ 85 MVP; target ≥ 90 post‑opt. LCP ≤ 3s, CLS ≤ 0.1, JS critical bundle ≤ 350KB.

Security & Privacy
- PDPA-aligned consents, retention policy, data export & deletion workflows, audit logging.
- File uploads stored in private Supabase buckets; signed URLs expire within 1hr by default.

Reliability
- Supabase managed backups; staging/production separation; reconciliation for booking race conditions.

---

## 7. Integrations and contracts

PMS Integration
- Use the integration questionnaire (Phase 0) to capture endpoints, auth, webhooks, rate limits, and sandbox credentials.
- Mapping: external availability → ScheduleSlot; external appointment id → Appointment.externalRef.
- Reconciliation: create provisional appointment with slot hold; confirm on PMS success; on PMS failure, job retries and staff notification.

SMS/Email
- Twilio for SMS; SendGrid for email templates; template placeholders for appointment details & resume links.

Analytics & Experimentation
- GA4 event contract; A/B framework for hero CTA and booking modal (server side or Vercel/Optimizely).

---

## 8. QA, testing & acceptance criteria

Automated tests
- Unit: Vitest for utilities and schema validation.
- Component: Storybook with visual snapshots.
- E2E: Playwright for booking, registration, concurrency test (two parallel booking attempts same slot), and critical flows.
- Accessibility: axe run in CI; fail on serious violations.

Manual tests
- Keyboard-only booking & registration; VoiceOver/NVDA full booking flow; staff CSV import mapping.

Acceptance examples
- Booking end‑to‑end: booking created in DB with status CONFIRMED (or PENDING with reconciliation), confirmation SMS/email sent, calendar ICS link included.
- Concurrency test: concurrent attempts on identical ScheduleSlot: only one booking succeeds; the other receives conflict UI and alternate slots.
- Autosave: registration autosaved and resumed via resume link within TTL.

---

## 9. Delivery roadmap, roles & governance

Phased timeline (recommended)
- Phase 0 — Discovery & Integration Inventory: 1 week
- Phase 1 — MVP redesign & implementation: 3 weeks
- Phase 2 — Integrations & patient continuity: 4–6 weeks
- Phase 3 — Personalization & telemedicine pilot: 6–10 weeks
- Phase 4 — Optimization & scale: ongoing

Core roles
- Product Lead (owner)  
- Design Lead (design system + accessibility)  
- Frontend Engineers (2)  
- Backend/Integrations Engineer (1)  
- QA/Accessibility Lead (0.5)  
- DevOps/SRE (0.2)  
- Clinic Ops (data owner & PMS liaison)

Governance
- Token lifecycle: changes through PR + design sign‑off + accessibility check.
- Component library versioning and changelog.
- Acceptance gates: accessibility + QA + security checks before staging→prod.

---

## 10. Immediate next steps (choose 1–3 to execute now)

Recommended first actions
1. Finalize Auth approach and create mapping plan (Supabase Auth implementation plan + migration mapping for existing users).  
2. Produce updated Prisma schema (merge your provided schema with ScheduleSlot, RegistrationDraft, AuditLog) and seed script for staging.  
3. Send PMS Integration Request (vendor-ready one‑page + JSON schema) to identified PMS vendors and capture sandbox credentials.

References
- Community guidance and comparisons indicate that Supabase Auth is commonly recommended when Supabase is the canonical platform; it reduces integration overhead and centralises auth management for Supabase projects.

---

https://copilot.microsoft.com/shares/9tKjYV7kiSbz5WR9Rr8vn
