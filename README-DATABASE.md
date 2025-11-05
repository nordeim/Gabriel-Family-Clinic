# Database Setup & Backup

## 📁 Files Overview

This directory contains the complete database setup for Gabriel Family Clinic:

| File | Purpose | Lines |
|------|---------|-------|
| `database-schema-complete.sql` | **Complete database schema** with sample data | 1,257 |
| `DATABASE_SCHEMA_GUIDE.md` | **Comprehensive documentation** and usage guide | 466 |
| `setup-database.sh` | **Automated setup script** for local development | 249 |
| `README.md` | **This file** - Quick setup instructions | - |

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

```bash
# Make script executable (if not already)
chmod +x setup-database.sh

# Run automated setup
./setup-database.sh

# Or for specific operations:
./setup-database.sh reset    # Drop and recreate database
./setup-database.sh verify   # Check database setup
./setup-database.sh backup   # Create backup
./setup-database.sh clean    # Remove data (keep schema)
```

### Option 2: Manual Setup

```bash
# 1. Create database
createdb gabriel_clinic

# 2. Load schema and sample data
psql gabriel_clinic < database-schema-complete.sql

# 3. Verify setup
psql gabriel_clinic -c "SELECT COUNT(*) FROM doctors; SELECT COUNT(*) FROM patients;"
```

## 📊 What's Included

### **Complete Schema**
- **15+ healthcare-specific tables**
- **Sample data** for realistic clinic operations
- **Performance indexes** for optimal query speed
- **Security policies** for data protection
- **Triggers** for automatic timestamp management

### **Sample Data**
- **5 Doctors** with various specialties
- **3 Clinic Locations** (San Francisco, Oakland, San Jose)
- **5 Patient Records** with medical history
- **6 Healthcare Services** (primary care, cardiology, etc.)
- **7 Patient Testimonials** with ratings
- **Insurance providers** and system configuration

## 🔧 Database Features

### **Healthcare-Specific Tables**
- **Patients** - Complete patient management
- **Doctors** - Medical staff with specialties
- **Appointments** - Scheduling system
- **Medical Records** - Patient history
- **Testimonials** - Patient feedback system
- **Locations** - Multi-clinic support

### **Performance Optimizations**
- **Strategic indexing** for common queries
- **UUID primary keys** for security
- **Foreign key constraints** for data integrity
- **Query views** for complex operations

### **Security & Compliance**
- **Row Level Security (RLS)** policies
- **HIPAA-compliant** design considerations
- **Audit trails** with timestamps
- **Access control** mechanisms

## 📖 Documentation

### **Complete Guide**
Read `DATABASE_SCHEMA_GUIDE.md` for:
- Detailed table descriptions
- API integration examples
- Performance optimization tips
- Security best practices
- Customization guidelines

### **Quick Reference**

```sql
-- View sample doctors
SELECT * FROM active_doctors_with_specialties;

-- Check clinic locations
SELECT * FROM clinic_locations_with_services;

-- View testimonials
SELECT * FROM patient_testimonials WHERE testimonial_status = 'approved';

-- Get database statistics
SELECT * FROM get_database_stats();
```

## 🏥 Production Considerations

### **Before Production Deployment**

1. **Enable Row Level Security** (if using Supabase)
2. **Configure SSL connections**
3. **Set up regular backups**
4. **Monitor performance**
5. **Review security policies**

### **Environment Variables**

```bash
# PostgreSQL connection
DATABASE_URL="postgresql://user:password@localhost:5432/gabriel_clinic"

# Supabase (if applicable)
SUPABASE_DB_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
```

## 🛠️ Common Operations

### **Add New Doctor**

```sql
INSERT INTO doctors (
    first_name, last_name, title, primary_specialty_id, 
    consultation_fee, status
) VALUES (
    'Jane', 'Smith', 'MD', 
    (SELECT id FROM medical_specialties WHERE specialty_code = 'family_medicine'),
    175.00, 'active'
);
```

### **Book Appointment**

```sql
INSERT INTO appointments (
    patient_id, doctor_id, location_id, service_id,
    appointment_date, appointment_time
) VALUES (
    (SELECT id FROM patients WHERE email = 'patient@email.com'),
    (SELECT id FROM doctors WHERE seo_slug = 'dr-emily-chen'),
    (SELECT id FROM clinic_locations WHERE seo_slug = 'san-francisco-clinic'),
    (SELECT id FROM healthcare_services WHERE seo_slug = 'primary-care-consultation'),
    '2024-11-15', '10:00:00'
);
```

### **Add Testimonial**

```sql
INSERT INTO patient_testimonials (
    patient_name, condition_treated, rating, testimonial_text,
    doctor_name, verified, testimonial_status
) VALUES (
    'Anonymous Patient', 'Annual Checkup', 5,
    'Excellent service and caring staff!',
    'Dr. Emily Chen', true, 'approved'
);
```

## 📈 Monitoring & Maintenance

### **Database Health Check**

```bash
# Run setup script verification
./setup-database.sh verify

# Or manual check
psql gabriel_clinic -c "SELECT * FROM get_database_stats();"
```

### **Regular Maintenance**

```sql
-- Update statistics
ANALYZE;

-- Clean old appointments
DELETE FROM appointments 
WHERE appointment_date < CURRENT_DATE - INTERVAL '1 year';

-- Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## 🔗 Integration Examples

### **Next.js/React Application**

```javascript
// Example Supabase client setup
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Query doctors by specialty
const { data: doctors } = await supabase
  .from('active_doctors_with_specialties')
  .select('*')
  .eq('specialty_code', 'cardiology')
```

### **Node.js/Express API**

```javascript
// Example Express route
app.get('/api/appointments', async (req, res) => {
  const { data: appointments } = await supabase
    .from('appointments')
    .select(`
      *,
      patients(first_name, last_name),
      doctors(first_name, last_name),
      clinic_locations(name, address_line_1)
    `)
    .eq('appointment_date', req.query.date)
    
  res.json(appointments)
})
```

## 📞 Support

For questions about the database schema:

1. **Check the guide**: `DATABASE_SCHEMA_GUIDE.md`
2. **Run verification**: `./setup-database.sh verify`
3. **Review logs**: Check PostgreSQL logs for errors
4. **Test queries**: Use `psql` to test database connectivity

## 🎯 Success Criteria

Your database setup is successful when:

- ✅ **Schema created**: All 15+ tables exist
- ✅ **Sample data loaded**: Doctors, locations, patients present
- ✅ **Functions working**: Views and stored procedures accessible
- ✅ **Security enabled**: RLS policies active (if using Supabase)
- ✅ **Performance tested**: Queries execute without timeout

---

**Ready for production deployment!** 🚀

The Gabriel Family Clinic database is now ready to support your healthcare platform with comprehensive patient management, appointment scheduling, and medical record keeping.