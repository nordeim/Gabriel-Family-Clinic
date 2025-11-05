# *Gabriel Family Clinic*

**Project Requirements Document (PRD)** — *Hybrid, merged, production-ready*
*Stack:* Next.js, shadcn-UI (Radix + Tailwind), tRPC, Prisma, Supabase (Postgres + Storage + Auth), NextAuth optional, TailwindCSS.
*Purpose:* Combine emotional, patient-first product vision with a rigorous implementation, governance, and operations plan so designers, engineers, and stakeholders can act immediately.

---

# 1 — Executive summary (one line)

*Build Gabriel Family Clinic’s patient-centric platform that is warm, accessible, and conversion-optimized — shipped in phased milestones with clear compliance, operational, and engineering guardrails.*

*简短中文：将 Gabriel Family Clinic 打造为以患者为中心、温暖可及且高转化的数字化平台，并按阶段实施，附带合规与运维保障。*

---

# 2 — Guiding principles (non-negotiable)

* *Patient-first clarity:* every page answers “what’s my next step?” in one glance.
* *Trusted humanity:* real clinician photos, credentials, testimonials, privacy-first microcopy.
* *Calm premium aesthetic:* restrained palette, generous white space, elegant typography.
* *Accessibility by design:* WCAG 2.1 AA baseline for all core flows.
* *De-risked delivery:* prioritize integration risks (PMS/SMS) early.
* *Data-safe:* PDPA compliance, secure storage, audit logs.

---

# 3 — Scope & phased roadmap (high level)

**Phase 0 — Discovery & Integration Inventory (1 week)**
*Deliverables:* PMS & SMS provider inventory + signed contact, analytics export, brand tokens, content inventory CSV, prioritized backlog, decision on Auth (Supabase Auth recommended).

**Phase 1 — MVP Redesign & Conversion (3 weeks)**
*Deliverables:* Figma token set, component library (shadcn tokens + Tailwind), pages: Home, Services hub, Clinician list, Clinic hub, Booking Quick Modal (3-step), minimal New Patient registration, analytics instrumentation, basic accessibility checks.

**Phase 2 — Patient Continuity & Integrations (4–6 weeks)**
*Deliverables:* Supabase-auth backed accounts (OTP), patient portal (appointments, visit summary, download results), PMS connector (API or CSV fallback), staff export UI, notification integration (SMS/Email).

**Phase 3 — Personalization & Advanced (6–10 weeks)**
*Deliverables:* Scripted chat triage, voice search pilot (non-diagnostic), personalized content feed, longevity micro-site, clinician compare, telemedicine integration (video).

**Phase 4 — Optimization & Scale (ongoing)**
*Deliverables:* Full WCAG remediation, SEO/schema, perf tuning (Lighthouse 90+), PWA, A/B program.

---

# 4 — Success metrics & KPIs (SMART)

* *Bookings from web* +25% within 8 weeks of Phase 1 launch.
* *Average time-to-book (returning users)* < 90s.
* *New patient registration completion* +25%.
* *Mobile Lighthouse score* ≥ 80 Phase 1, ≥ 90 Phase 4.
* *WCAG AA* on all core flows.
* *Administrative overhead* reduced by 30% (by automating CSV/API flows & staff tools — target measured after Phase 2).

---

# 5 — Personas & journeys (reference, condensed)

*New Expat Parent (Maya), Busy Working Adult (Jasper), Longevity Seeker (Mrs Lim), Receptionist/Staff (Aaron).*
Patient journey: *Discovery → Service discovery → Clinician selection → 3-step booking → Pre-visit intake → Visit (check-in) → Post-visit summary & follow-up.*

---

# 6 — Architecture & system diagram (textual)

**Client:** Next.js (Server-Side Rendering + ISR), shadcn UI, tRPC client, Next/Image for responsive images.

**Server:** Next.js API + tRPC routers -> Prisma client -> Supabase Postgres. Background jobs (retries, CSV ingestion) via serverless functions / job queue.

**Auth:** Supabase Auth (recommended) or NextAuth + Prisma (if special providers needed). Map Supabase user id to `User.externalId`.

**Storage:** Supabase Storage for uploads (signed URLs). File metadata in `FileUpload` table.

**Integrations:** PMS (API preferred), SMS provider (Twilio), Email (SendGrid), Calendar (ICS / Google Calendar integration), Analytics (GA4 + GTM), Monitoring (Sentry).

---

# 7 — Prisma data model (production-ready starter)

*Place as `prisma/schema.prisma` and use `DATABASE_URL` from Supabase.*

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole { PATIENT STAFF ADMIN }
enum AppointmentStatus { PENDING CONFIRMED CANCELLED COMPLETED NO_SHOW }
enum BookingSource { WEBSITE TELEPHONE STAFF EXTERNAL }

model User {
  id             String    @id @default(uuid())
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  firstName      String
  lastName       String
  email          String?   @unique
  phone          String?   @unique
  dob            DateTime?
  role           UserRole  @default(PATIENT)
  externalId     String?   // Supabase auth id / PMS id
  appointments   Appointment[]
  medicalRecords MedicalRecord[]
  testResults    TestResult[]
}

model Clinic {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  address     String
  phone       String
  email       String?
  lat         Float?
  lng         Float?
  timezone    String    @default("Asia/Singapore")
  openingHours Json?
  clinicians  Clinician[] @relation("ClinicianClinics")
  appointments Appointment[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Clinician {
  id           String    @id @default(uuid())
  firstName    String
  lastName     String
  title        String?
  bio          String?
  credentials  String?
  languages    String[]  @default([])
  specialties  String[]  @default([])
  photoUrl     String?
  clinics      Clinic[]  @relation("ClinicianClinics")
  appointments Appointment[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Service {
  id          String    @id @default(uuid())
  slug        String    @unique
  name        String
  description String?
  durationMin Int
  priceRange  String?
  clinicians  Clinician[] @relation("ServiceClinicians")
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Appointment {
  id            String   @id @default(uuid())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  startAt       DateTime
  endAt         DateTime
  clinic        Clinic   @relation(fields: [clinicId], references: [id])
  clinicId      String
  clinician     Clinician? @relation(fields: [clinicianId], references: [id])
  clinicianId   String?
  service       Service? @relation(fields: [serviceId], references: [id])
  serviceId     String?
  patient       User     @relation(fields: [patientId], references: [id])
  patientId     String
  status        AppointmentStatus @default(PENDING)
  source        BookingSource
  externalRef   String? // PMS appointment id
  notes         String?
  idempotencyKey String? // for retry protection
}

model MedicalRecord {
  id            String      @id @default(uuid())
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  patientId     String
  patient       User        @relation(fields: [patientId], references: [id])
  doctorId      String?
  appointmentId String?
  diagnosis     String?
  prescription  Json?
  notes         String?
}

model TestResult {
  id            String      @id @default(uuid())
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  patientId     String
  patient       User        @relation(fields: [patientId], references: [id])
  doctorId      String?
  appointmentId String?
  testName      String
  result        String
  resultFileUrl String?
}

model FileUpload {
  id         String   @id @default(uuid())
  key        String
  url        String
  uploadedBy String?
  uploadedAt DateTime @default(now())
  meta       Json?
}
```

**Notes:** this schema is production-ready as a starting point; add join tables if you prefer explicit many-to-many control.

---

# 8 — Design system & token specification (Tailwind + shadcn-ready)

## 8.1 Color tokens (exact hexs — from combined vision)

Use these as `--color-<name>` and wire into `tailwind.config.js`:

```
--brand-deep-teal: #0A4D68
--brand-soft-sage: #87A96B
--brand-warm-sand: #F5EFE6
--brand-charcoal: #2F3645
--accent-coral: #FF6B6B
--accent-light-blue: #A8DADC
--bg: #FFFFFF
--muted: #F8F9FA
```

## 8.2 Typography tokens

* Display: *Playfair Display* (hero)
* UI/Body: *Inter* (system fallback)
* Quote/long-form: *Lora* optional

Sizes:

* H1: 40–48px / 700
* H2: 28–32px
* Body: 16px / 24px lh

## 8.3 Tailwind config snippet

```js
// tailwind.config.js (snippet)
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-deep-teal': '#0A4D68',
        'brand-soft-sage': '#87A96B',
        'brand-warm-sand': '#F5EFE6',
        'brand-charcoal': '#2F3645',
        'accent-coral': '#FF6B6B',
        'accent-blue': '#A8DADC',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '16px',
        'space-4': '24px',
        'space-5': '32px',
      },
    },
  },
  plugins: [],
}
```

## 8.4 Component system (shadcn)

* Implement tokens as CSS variables consumed by shadcn wrappers. Publish Figma tokens and a `tokens.json` for designers.
* Components prioritized: `Button`, `Input`, `Modal`, `Toast`, `BookingModal`, `ClinicianCard`, `ServiceCard`, `ClinicCard`, `BookFAB`, `Header`, `Footer`, `PatientRegistrationForm`.

---

# 9 — API & tRPC contract highlights

**Router map**

```
/trpc
  - auth (otpLogin, me, logout)
  - users (me, register, update)
  - services (list, get)
  - clinicians (search, get)
  - clinics (list, get)
  - appointments (create, listByUser, cancel, reschedule, adminList)
  - files (uploadInit, getSignedUrl)
  - admin (syncPMS, importCsv)
```

**Idempotency:** `appointments.create` accepts `idempotencyKey` and will return existing appointment if same key used.

**PMS connector behavior:** synchronous preferred (create appointment then confirm). If PMS API returns rate-limit or 5xx → queue job and mark appointment `PENDING`; notify staff.

---

# 10 — Integration contract template (Phase 0 artifact)

*Use this template to send to PMS vendor — get answers in writing.*

**Fields to capture:**

1. Provider name, contact (tech & account), SLA hours.
2. API endpoints: list of endpoints (GET /clinicians, GET /availabilities, POST /appointments). Provide request/response schema & sample payloads.
3. Auth type (OAuth2 / API Key) and token expiry.
4. Idempotency & dedup rules.
5. Webhook support (appointment_confirmed, appointment_cancelled) — payload & retry logic.
6. Rate limits per minute and recommended client behavior.
7. Error codes & semantic mapping (e.g., 409 slot taken).
8. Sandbox/test env credentials.
9. CSV export format if API not available (field names, separators, timestamp formats).
10. Security & compliance (do they store PHI? Where?).
11. Expected latency & throughput.
12. Pricing & costs, if any.

*(I can generate a one-page PDF-ready request to vendor on demand.)*

---

# 11 — CI/CD, migrations, and deployment

## 11.1 CI pipeline (GitHub Actions)

```yaml
name: CI

on: [push, pull_request]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install
        run: npm ci
      - name: Lint + Typecheck
        run: npm run check
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
```

## 11.2 Prisma migrations & DB strategy

* Use `prisma migrate dev` during local development.
* Use `prisma migrate deploy` in CI for staging/prod.
* Use `prisma db seed` for initial data (clinics/clinicians/services).
* Maintain migration rollback plan: *do not run destructive migrations during business hours; validate in staging first.*

**Backup & restore:** rely on Supabase managed backups; verify restore monthly.

---

# 12 — Accessibility, localization & governance

## 12.1 Accessibility

* WCAG 2.1 AA baseline.
* Automated checks in CI with `axe-core` plugin.
* Manual spot checks for booking flow with VoiceOver (macOS) and NVDA.
* Focus styles 3px visible ring; all interactive elements have keyboard focus.

## 12.2 Internationalization (i18n)

* Minimum languages: English + Simplified Chinese (zh-Hans). Implement using Next.js i18n routing or `next-intl`.
* Content strategy: translate high-impact pages first (Home, Services hub, Clinician list, Booking flow).
* Translation workflow: CMS-managed bilingual fields + human review. Avoid raw MT-only on medical copy.

## 12.3 Design System Governance

* *Owner:* Product Designer (change control).
* *Versioning:* Semantic versioning for components (vMajor.Minor.Patch). Publish component changelog.
* *Figma-to-code rule:* designer updates tokens → developer updates `tokens.json` → PR with tests.
* *Release cadence:* weekly component library iteration; monthly token review.
* *Approval gate:* design token changes require sign-off from Design Lead + Accessibility Lead.

---

# 13 — QA & acceptance criteria (detailed gates)

## Booking Quick Modal (Phase 1)

* *Open/Close:* 1 tap; focus trapped; ESC closes.
* *Validation:* required fields validated inline; screen reader announces errors.
* *Idempotency:* duplicate submission prevented by `idempotencyKey`.
* *Analytics:* `book_opened`, `book_step`, `book_submitted` fire.
* *Integration:* when PMS stub returns success, `externalRef` saved; SMS/email is sent.

## Clinician/Service pages

* Unique meta title & description.
* Structured data (`Physician` / `MedicalBusiness`) included.
* Contrast ratio ≥ 4.5:1.

## Security & Privacy

* TLS + HSTS.
* PHI not stored in client logs.
* Signed URLs for file access expire within 1 hour (configurable).
* PDPA consent captured for registration.

## Performance

* Mobile LCP ≤ 3s (Phase 1 target).
* JS critical bundle ≤ 350KB.
* CLS ≤ 0.1.

---

# 14 — Testing plan (automated + manual)

**Automated**

* Unit tests (Vitest) for utilities & schema validation.
* tRPC contract tests (integration).
* E2E Playwright tests for: login, booking flow, new patient registration, clinician search.
* Accessibility CI: `axe` run + fail on severe violations.

**Manual**

* Cross-browser (Chrome, Safari, Edge) & mobile (iOS Safari, Android Chrome).
* Keyboard-only navigation test for booking and registration.
* VoiceOver / NVDA pass for booking.
* Staff acceptance: CSV ingestion test cases (20 sample rows) and mapping.

---

# 15 — SLAs & operational readiness

**Uptime & monitoring**

* Hosting: Vercel (99.95% SLA). Use Cloudflare in front for DDoS & caching.
* Monitoring: Sentry for errors, uptime checks, alerting to on-call via Slack.

**Integration SLA**

* PMS API availability target: 99.5% (vendor expected doc).
* If vendor SLA breached, fallback CSV flow must be operable within 30 minutes.

**Incident response**

* P0 incidents: page down or booking system outage. Response: 15 min ack, 1 hour mitigation plan, stakeholder update.
* P1 incidents: booking failures for >5% requests. Response: 30 min ack, escalate.

---

# 16 — Risk register (top items + mitigation)

1. **PMS integration unknowns** — mitigate: Phase 0 contract; CSV fallback & queueing system.
2. **Clinician data inconsistencies** — mitigate: canonical data model, content owner, pre-migration validation.
3. **Regulatory non-compliance** — mitigate: PDPA legal review before Phase 2; DPA with vendors.
4. **Slow performance (media-heavy)** — mitigate: Next Image responsive + CDN + lazy loading + image compression pipeline.
5. **Adoption resistance** — mitigate: staff training, help docs, phased rollouts.

---

# 17 — Resource & high-level timeline (recommended)

**Core team (recommended for Phase 1):**

* Product Manager (0.5 FTE)
* Product Designer (1 FTE)
* Frontend Engineers (2 FE)
* Backend / Integrations (1 BE)
* QA Engineer (0.5 FTE)
* DevOps / SRE (0.2 FTE)

**Timeline (agile sprints)**

* Phase 0: 1 week
* Phase 1: 3 weeks (3 sprints)
* Phase 2: 4–6 weeks (4–6 sprints)
* Phase 3: 6–10 weeks (6–10 sprints)

*(Estimate variance ±20% depending on PMS availability and content readiness.)*

---

# 18 — Deliverables & handoff artifacts (what you will get)

**Phase 0 deliverables**

* Integration Inventory & vendor request (PDF/email body)
* Content inventory CSV
* Brand token checklist + Figma access request

**Phase 1 deliverables**

* Figma token JSON + Tailwind config
* shadcn component library v0.1 (Button/Input/Modal/Toast/Cards)
* Responsive mockups: Home + Booking modal (desktop + mobile)
* tRPC router skeleton + Prisma schema with seed data
* CI pipeline config
* Acceptance & QA checklist

**Phase 2+ deliverables**

* Patient Portal (staging), PMS connector, staff mapping UI, security audit report.

---

# 19 — Immediate next actions (pick one or more; I will produce in this session)

Reply with the number(s) you want me to produce **right now** — I will generate them immediately in this session:

1. *Integration Inventory & Vendor Request* — one-page document + exact JSON schema to send to PMS vendor.
2. *Figma Token JSON + Tailwind config* — ready-to-import tokens + `tailwind.config.js` full file.
3. *Prisma schema + seed file* — `schema.prisma` (ready) + `prisma/seed.ts` sample seeded with 2 clinics, 4 clinicians, 6 services.
4. *tRPC appointment.create example* — full server procedure implementation (idempotency, PMS stub, queueing approach) and client usage snippet.
5. *Phase 1 Implementation Pack* — file structure skeleton, key component stubs (Button, Modal, BookingModal), and Playwright E2E test skeleton for booking flow.
6. *Accessibility QA script* — step-by-step manual tests for booking, registration, clinician pages (with expected outcomes).

*提示：回复 1–6 的数字选择你现在想要我生成的交付物。我会立刻生成并把完整内容放在下一条消息中。* ✅

---

# 20 — Closing rationale (meticulous)

This Version 3.0 PRD merges *your brand-forward, patient-first strategy* with *concrete technical choices, governance, and operational readiness*. It de-risks integration early, sets measurable outcomes, and hands the engineering team a launchable plan. If you say **“Go: 1”** (for example), I’ll create the Integration Inventory + vendor request immediately — fully formatted and copy/paste-ready to send to your PMS vendor.
