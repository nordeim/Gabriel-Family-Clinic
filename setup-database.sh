#!/bin/bash

# ================================================
# Gabriel Family Clinic Database Setup Script
# ================================================
# Quick setup script for local development database
# Compatible with: PostgreSQL, Supabase
# ================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="gabriel_clinic"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}Gabriel Family Clinic Database Setup${NC}"
echo -e "${BLUE}===============================================${NC}"
echo ""

# Function to print status messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    print_error "PostgreSQL is not installed or not in PATH"
    echo "Please install PostgreSQL first:"
    echo "  macOS: brew install postgresql"
    echo "  Ubuntu: sudo apt-get install postgresql postgresql-contrib"
    echo "  Docker: docker run -d --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 postgres"
    exit 1
fi

print_status "PostgreSQL found: $(psql --version)"

# Function to check if database exists
db_exists() {
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"
}

# Function to create database
create_database() {
    print_status "Creating database: $DB_NAME"
    createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"
}

# Function to drop database
drop_database() {
    print_status "Dropping existing database: $DB_NAME"
    dropdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"
}

# Function to run SQL file
run_sql_file() {
    local sql_file="$1"
    if [ ! -f "$sql_file" ]; then
        print_error "SQL file not found: $sql_file"
        exit 1
    fi
    
    print_status "Running SQL file: $sql_file"
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$sql_file"
}

# Function to run SQL command
run_sql_command() {
    local sql_command="$1"
    print_status "Executing: $sql_command"
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "$sql_command"
}

# Main setup process
main() {
    echo -e "${BLUE}Starting database setup...${NC}"
    echo ""
    
    # Check if database already exists
    if db_exists; then
        print_warning "Database '$DB_NAME' already exists"
        read -p "Do you want to drop and recreate it? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            drop_database
            create_database
        else
            print_status "Using existing database"
        fi
    else
        create_database
    fi
    
    echo ""
    print_status "Setting up database schema..."
    
    # Run the main schema file
    if [ -f "database-schema-complete.sql" ]; then
        run_sql_file "database-schema-complete.sql"
    else
        print_error "database-schema-complete.sql not found in current directory"
        print_error "Please run this script from the gabriel-clinic directory"
        exit 1
    fi
    
    echo ""
    print_status "Verifying setup..."
    
    # Verify tables were created
    table_count=$(run_sql_command "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | tail -n 1 | tr -d ' ')
    
    if [ "$table_count" -gt 0 ]; then
        print_status "Successfully created $table_count tables"
    else
        print_error "No tables found - setup may have failed"
        exit 1
    fi
    
    # Show database statistics
    echo ""
    print_status "Database statistics:"
    run_sql_command "SELECT * FROM get_database_stats() LIMIT 5;"
    
    # Show sample data counts
    echo ""
    print_status "Sample data counts:"
    run_sql_command "SELECT 'Doctors' as entity, COUNT(*) as count FROM doctors;"
    run_sql_command "SELECT 'Locations' as entity, COUNT(*) as count FROM clinic_locations;"
    run_sql_command "SELECT 'Patients' as entity, COUNT(*) as count FROM patients;"
    run_sql_command "SELECT 'Testimonials' as entity, COUNT(*) as count FROM patient_testimonials;"
    run_sql_command "SELECT 'Services' as entity, COUNT(*) as count FROM healthcare_services;"
    
    echo ""
    echo -e "${GREEN}===============================================${NC}"
    echo -e "${GREEN}Database setup completed successfully!${NC}"
    echo -e "${GREEN}===============================================${NC}"
    echo ""
    echo -e "${BLUE}Connection details:${NC}"
    echo -e "  Host: ${DB_HOST}"
    echo -e "  Port: ${DB_PORT}"
    echo -e "  Database: ${DB_NAME}"
    echo -e "  User: ${DB_USER}"
    echo ""
    echo -e "${BLUE}Example connection string:${NC}"
    echo -e "  postgresql://${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo -e "  1. Update your application configuration"
    echo -e "  2. Test the database connection"
    echo -e "  3. Review the DATABASE_SCHEMA_GUIDE.md for usage examples"
    echo ""
}

# Command line options
case "${1:-setup}" in
    "setup"|"")
        main
        ;;
    "reset")
        print_warning "This will drop and recreate the database!"
        read -p "Are you sure? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            drop_database
            create_database
            run_sql_file "database-schema-complete.sql"
            print_status "Database reset completed"
        else
            print_status "Reset cancelled"
        fi
        ;;
    "verify")
        print_status "Verifying database setup..."
        if ! db_exists; then
            print_error "Database '$DB_NAME' does not exist"
            exit 1
        fi
        
        # Check essential tables
        tables=("doctors" "patients" "clinic_locations" "healthcare_services" "patient_testimonials")
        for table in "${tables[@]}"; do
            count=$(run_sql_command "SELECT COUNT(*) FROM $table;" | tail -n 1 | tr -d ' ')
            print_status "$table: $count records"
        done
        
        print_status "Database verification completed"
        ;;
    "connect")
        print_status "Connecting to database..."
        psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME"
        ;;
    "backup")
        backup_file="gabriel_clinic_backup_$(date +%Y%m%d_%H%M%S).sql"
        print_status "Creating backup: $backup_file"
        pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME" > "$backup_file"
        print_status "Backup created: $backup_file"
        ;;
    "clean")
        print_warning "This will remove all data but keep the schema!"
        read -p "Are you sure? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            run_sql_command "TRUNCATE TABLE patient_testimonials RESTART IDENTITY CASCADE;"
            run_sql_command "TRUNCATE TABLE appointments RESTART IDENTITY CASCADE;"
            run_sql_command "TRUNCATE TABLE medical_records RESTART IDENTITY CASCADE;"
            run_sql_command "TRUNCATE TABLE patients RESTART IDENTITY CASCADE;"
            print_status "Data cleaned (schema preserved)"
        else
            print_status "Clean cancelled"
        fi
        ;;
    "help"|"-h"|"--help")
        echo "Gabriel Family Clinic Database Setup Script"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  setup    Setup database with schema and sample data (default)"
        echo "  reset    Drop and recreate database"
        echo "  verify   Verify database setup and sample data"
        echo "  connect  Connect to database with psql"
        echo "  backup   Create database backup"
        echo "  clean    Remove all data (keep schema)"
        echo "  help     Show this help message"
        echo ""
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Run '$0 help' for available commands"
        exit 1
        ;;
esac