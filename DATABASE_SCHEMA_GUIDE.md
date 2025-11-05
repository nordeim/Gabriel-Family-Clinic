# Gabriel Family Clinic Database Schema Guide

## 📋 Overview

This comprehensive database schema provides a complete foundation for the Gabriel Family Clinic healthcare platform. The schema is designed to be **production-ready**, **HIPAA-compliant**, and **scalable** for a healthcare organization.

## 🎯 Key Features

### **Healthcare-Specific Design**
- **Complete patient management** with medical records and history
- **Doctor scheduling system** with location-based availability
- **Appointment management** with multiple status types
- **Medical specialties** and service categorization
- **Patient testimonials** and reviews system
- **Insurance provider integration**
- **Emergency care** and location management

### **Data Integrity & Performance**
- **UUID primary keys** for secure, unique identification
- **Comprehensive indexes** for optimal query performance
- **Foreign key constraints** to maintain data integrity
- **ENUM types** for consistent data values
- **Automated triggers** for timestamp management

### **Privacy & Compliance**
- **Row Level Security (RLS)** policies included
- **HIPAA-compliant** data handling considerations
- **Anonymous testimonial** options
- **Patient consent tracking**
- **Audit trail** with created/updated timestamps

## 📊 Database Structure

### **Core Entity Tables**

| Table | Purpose | Records in Sample |
|-------|---------|------------------|
| `clinic_locations` | Physical clinic locations | 3 locations |
| `medical_specialties` | Doctor specializations | 9 specialties |
| `doctors` | Medical staff information | 5 doctors |
| `patients` | Patient records | 5 patients |
| `healthcare_services` | Medical services offered | 6 services |
| `appointments` | Appointment scheduling | Sample appointment |
| `medical_records` | Patient medical history | Template structure |
| `patient_testimonials` | Patient reviews and feedback | 7 testimonials |

### **Supporting Tables**

| Table | Purpose |
|-------|---------|
| `doctor_locations` | Doctor availability at locations |
| `service_location_availability` | Service availability by location |
| `patient_primary_doctors` | Patient-PCP relationships |
| `patient_reviews` | Detailed patient reviews |
| `insurance_providers` | Insurance company data |
| `doctor_schedules` | Doctor time off and availability |
| `appointment_templates` | Recurring appointment patterns |
| `patient_communications` | Patient interaction logs |
| `system_config` | Application configuration |

### **Reference Data**

| Table | Purpose |
|-------|---------|
| `medical_specialties` | Standardized medical specialties |
| `insurance_providers` | Insurance company reference |
| `system_config` | Application settings |

## 🚀 Quick Start

### **1. Database Setup**

```sql
-- Create the database
CREATE DATABASE gabriel_clinic;

-- Connect to the database
\c gabriel_clinic;

-- Run the complete schema
\i database-schema-complete.sql
```

### **2. Verify Installation**

```sql
-- Check database statistics
SELECT * FROM get_database_stats();

-- View sample doctors
SELECT * FROM active_doctors_with_specialties;

-- View clinic locations
SELECT * FROM clinic_locations_with_services;

-- View testimonials summary
SELECT * FROM testimonials_summary;
```

### **3. Common Queries**

```sql
-- Find available doctors by specialty
SELECT * FROM active_doctors_with_specialties 
WHERE specialty_code = 'family_medicine';

-- Get clinic location with services
SELECT * FROM clinic_locations_with_services 
WHERE name ILIKE '%san francisco%';

-- View testimonials for a specific doctor
SELECT * FROM patient_testimonials 
WHERE doctor_name ILIKE '%chen%' AND testimonial_status = 'approved';

-- Check appointment availability
SELECT a.*, d.first_name, d.last_name, cl.name as location_name
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
JOIN clinic_locations cl ON a.location_id = cl.id
WHERE a.appointment_date = '2024-11-15';
```

## 📱 API Integration Examples

### **Patient Management**

```sql
-- Register new patient
INSERT INTO patients (
    first_name, last_name, date_of_birth, email, phone
) VALUES (
    'John', 'Doe', '1980-05-15', 'john.doe@email.com', '+1-555-0123'
);

-- Assign primary care doctor
INSERT INTO patient_primary_doctors (patient_id, doctor_id)
SELECT p.id, d.id 
FROM patients p, doctors d 
WHERE p.email = 'john.doe@email.com' 
AND d.seo_slug = 'dr-emily-chen';
```

### **Appointment Booking**

```sql
-- Book appointment
INSERT INTO appointments (
    patient_id, doctor_id, location_id, service_id,
    appointment_date, appointment_time, appointment_type
) VALUES (
    (SELECT id FROM patients WHERE email = 'john.doe@email.com'),
    (SELECT id FROM doctors WHERE seo_slug = 'dr-emily-chen'),
    (SELECT id FROM clinic_locations WHERE seo_slug = 'san-francisco-clinic'),
    (SELECT id FROM healthcare_services WHERE seo_slug = 'primary-care-consultation'),
    '2024-11-15', '10:00:00', 'consultation'
);
```

### **Testimonial Management**

```sql
-- Add patient testimonial
INSERT INTO patient_testimonials (
    patient_name, condition_treated, rating, testimonial_text,
    treatment_date, doctor_name, verified, testimonial_status
) VALUES (
    'John D.', 'Annual Checkup', 5,
    'Excellent care and very professional staff.',
    '2024-10-15', 'Dr. Emily Chen', true, 'approved'
);
```

## 🏥 Healthcare-Specific Features

### **Medical Specialties Supported**

- **Primary Care**: Family Medicine, Internal Medicine, Geriatric Medicine
- **Specialist Care**: Cardiology, Rheumatology, Endocrinology, Neurology
- **Emergency Care**: Emergency Medicine
- **Therapeutic Services**: Physical Therapy
- **Preventive Care**: Comprehensive preventive medicine

### **Appointment Types**

- **Consultation**: Initial patient visits
- **Follow-up**: Return visits
- **Emergency**: Urgent care appointments
- **Procedure**: Medical procedures
- **Physical Therapy**: Rehabilitation sessions
- **Preventive Care**: Wellness visits

### **Location Types**

- **Main Clinic**: Primary care facility
- **Branch Clinic**: Satellite locations
- **Emergency Center**: 24/7 urgent care
- **Specialist Clinic**: Specialty care facility

## 📈 Performance Optimizations

### **Indexing Strategy**

The schema includes **strategic indexes** for common query patterns:

```sql
-- Patient lookups
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_phone ON patients(phone);

-- Appointment queries
CREATE INDEX idx_appointments_date_status ON appointments(appointment_date, status);

-- Doctor availability
CREATE INDEX idx_doctor_locations_schedule ON doctor_locations(doctor_id, location_id, day_of_week);

-- Testimonial queries
CREATE INDEX idx_testimonials_rating_status ON patient_testimonials(rating, testimonial_status);
```

### **Query Optimization**

```sql
-- Efficient doctor search by specialty and location
SELECT d.*, cl.name as location_name
FROM active_doctors_with_specialties d
JOIN doctor_locations dl ON d.id = dl.doctor_id
JOIN clinic_locations cl ON dl.location_id = cl.id
WHERE d.specialty_code = 'cardiology'
  AND cl.seo_slug = 'san-francisco-clinic'
  AND dl.is_active = true;

-- Patient testimonial aggregation
SELECT 
    doctor_name,
    COUNT(*) as total_reviews,
    ROUND(AVG(rating), 2) as average_rating,
    STRING_AGG(testimonial_text, ' | ' ORDER BY created_at DESC) as recent_testimonials
FROM doctor_testimonials
WHERE total_testimonials > 0
GROUP BY doctor_name;
```

## 🔒 Security & Compliance

### **Row Level Security (RLS)**

Basic RLS policies are included for sensitive data:

```sql
-- Patients can only access their own records
CREATE POLICY "patients_own_records" ON patients
    FOR ALL USING (auth.uid()::text = id::text);

-- Medical records access control
CREATE POLICY "medical_records_access" ON medical_records
    FOR ALL USING (
        auth.uid()::text = patient_id::text OR
        auth.role() = 'doctor'
    );
```

### **Data Privacy Features**

- **Anonymous testimonials** support
- **Patient consent tracking**
- **Audit trail** maintenance
- **Access restriction** flags
- **Confidential record** marking

## 🛠️ Development Workflow

### **Local Development Setup**

```bash
# 1. Create local PostgreSQL database
createdb gabriel_clinic

# 2. Load schema and sample data
psql gabriel_clinic < database-schema-complete.sql

# 3. Verify installation
psql gabriel_clinic -c "SELECT COUNT(*) FROM doctors;"
```

### **Supabase Integration**

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Apply schema to Supabase
-- The schema is fully compatible with Supabase
```

### **Testing Data**

```sql
-- Generate test appointments for the next 30 days
INSERT INTO appointments (
    patient_id, doctor_id, location_id, service_id,
    appointment_date, appointment_time, appointment_type, status
)
SELECT 
    p.id, d.id, cl.id, hs.id,
    CURRENT_DATE + (random() * 30)::int as appointment_date,
    ('08:00'::time + (random() * interval '8 hours')) as appointment_time,
    'consultation', 'scheduled'
FROM patients p
CROSS JOIN doctors d
CROSS JOIN clinic_locations cl
CROSS JOIN healthcare_services hs
WHERE d.status = 'active'
LIMIT 100;
```

## 📊 Sample Data Overview

### **Doctors (5 Total)**

| Name | Specialty | Experience | Fee |
|------|-----------|------------|-----|
| Dr. Emily Chen | Family Medicine | 15 years | $150 |
| Dr. Raj Kumar | Endocrinology | 17 years | $200 |
| Dr. Maria Rodriguez | Cardiology | 13 years | $220 |
| Dr. James Patterson | Physical Therapy | 11 years | $120 |
| Dr. Sarah Williams | Geriatric Medicine | 18 years | $180 |

### **Locations (3 Total)**

| Location | Type | Address | Emergency |
|----------|------|---------|-----------|
| San Francisco | Main Clinic | 123 Market Street | ✅ Yes |
| Oakland | Branch Clinic | 456 Broadway | ❌ No |
| San Jose | Branch Clinic | 789 Santa Clara Street | ❌ No |

### **Patients (5 Total)**

- **Margaret Smith** (79, Arthritis, San Francisco)
- **Robert Miller** (72, Diabetes, Oakland)  
- **Dorothy Wilson** (76, Heart Disease, San Jose)
- **Thomas Harris** (69, Hip Replacement, San Francisco)
- **Helen Thompson** (84, Dementia, Oakland)

### **Services (6 Total)**

- Primary Care Consultation ($150)
- Cardiology Consultation ($220)
- Emergency Care (Variable)
- Physical Therapy ($120)
- Preventive Care ($150)
- Diabetes Management ($200)

## 🔧 Customization Guide

### **Adding New Medical Specialty**

```sql
INSERT INTO medical_specialties (
    name, specialty_code, description, category, is_primary_care
) VALUES (
    'Pain Management', 'pain_management', 
    'Specialized care for chronic pain conditions',
    'specialist_care', false
);
```

### **Adding New Location**

```sql
INSERT INTO clinic_locations (
    name, location_type, address_line_1, city, state, postal_code,
    phone, is_emergency_available, seo_slug
) VALUES (
    'Gabriel Family Clinic - Berkeley', 'branch_clinic',
    '123 University Avenue', 'Berkeley', 'California', '94704',
    '+1-510-555-CLINIC', false, 'berkeley-clinic'
);
```

### **Extending Patient Information**

```sql
ALTER TABLE patients ADD COLUMN 
    occupation VARCHAR(255),
    marital_status VARCHAR(50),
    preferred_pharmacy VARCHAR(255);
```

## 🚨 Important Notes

### **Production Deployment**

1. **Enable RLS**: Ensure Row Level Security is properly configured
2. **Backup Strategy**: Implement regular automated backups
3. **Monitoring**: Set up database performance monitoring
4. **Security**: Configure SSL connections and access controls
5. **Compliance**: Ensure HIPAA compliance in all operations

### **Performance Considerations**

1. **Index Maintenance**: Regularly update table statistics
2. **Query Optimization**: Monitor slow queries and optimize
3. **Connection Pooling**: Use connection pooling in production
4. **Read Replicas**: Consider read replicas for heavy read workloads

### **Data Migration**

1. **Existing Data**: Plan migration strategy for existing patient data
2. **Data Mapping**: Map legacy fields to new schema structure
3. **Validation**: Implement data validation during migration
4. **Testing**: Thoroughly test migration process in staging

## 📞 Support & Maintenance

### **Database Health Check**

```sql
-- Check database size and table counts
SELECT * FROM get_database_stats();

-- Monitor connection counts
SELECT count(*) as active_connections 
FROM pg_stat_activity 
WHERE state = 'active';

-- Check index usage
SELECT 
    schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

### **Regular Maintenance Tasks**

```sql
-- Update table statistics
ANALYZE;

-- Clean up old appointments
DELETE FROM appointments 
WHERE appointment_date < CURRENT_DATE - INTERVAL '1 year'
  AND status IN ('completed', 'cancelled');

-- Archive old medical records
UPDATE medical_records 
SET status = 'archived' 
WHERE record_date < CURRENT_DATE - INTERVAL '7 years';
```

---

## 🎉 Summary

This database schema provides a **complete, production-ready foundation** for the Gabriel Family Clinic healthcare platform. It includes:

- ✅ **15+ comprehensive tables** with healthcare-specific structures
- ✅ **Sample data** representing realistic clinic operations
- ✅ **Performance optimizations** with strategic indexing
- ✅ **Security features** including RLS policies
- ✅ **Scalable design** for future growth
- ✅ **HIPAA-compliant** data handling considerations

The schema is designed to support all aspects of clinic operations from patient management to appointment scheduling, medical records, and patient feedback systems.

**Ready for immediate use in local development and production deployment!** 🚀