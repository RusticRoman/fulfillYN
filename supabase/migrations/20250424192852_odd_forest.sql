/*
  # 3PL Partner Database Schema

  1. New Tables
    - Core company information
    - Warehouse locations
    - Capabilities and features
    - Compliance information
    - Tech stack details
    - Performance metrics
    - Customer references
    - Media assets

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users
*/

-- Companies table
CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  company_name text NOT NULL,
  website_url text,
  phone text NOT NULL,
  year_founded integer NOT NULL,
  headquarters_address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Warehouses table
CREATE TABLE warehouses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies ON DELETE CASCADE NOT NULL,
  address text NOT NULL,
  square_footage integer NOT NULL,
  capabilities text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Capabilities table
CREATE TABLE capabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies ON DELETE CASCADE NOT NULL,
  temperature_controlled boolean DEFAULT false,
  temperature_types text[] DEFAULT '{}',
  supports_hazmat boolean DEFAULT false,
  supports_fba_prep boolean DEFAULT false,
  handles_returns boolean DEFAULT false,
  offers_kitting boolean DEFAULT false,
  offers_subscription_fulfillment boolean DEFAULT false,
  offers_same_day_shipping boolean DEFAULT false,
  supported_marketplaces text[] DEFAULT '{}',
  supports_edi boolean DEFAULT false,
  supports_b2b boolean DEFAULT false,
  b2b_types text[] DEFAULT '{}',
  minimum_order_volume text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (company_id)
);

-- Compliance table
CREATE TABLE compliance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies ON DELETE CASCADE NOT NULL,
  fda_registered boolean DEFAULT false,
  has_liability_insurance boolean DEFAULT false,
  certifications text[] DEFAULT '{}',
  other_certification text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (company_id)
);

-- Tech Stack table
CREATE TABLE tech_stack (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies ON DELETE CASCADE NOT NULL,
  wms_system text NOT NULL,
  other_wms text,
  has_client_portal boolean DEFAULT false,
  integrations text[] DEFAULT '{}',
  has_proprietary_software boolean DEFAULT false,
  proprietary_software_details text,
  carriers text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (company_id)
);

-- Performance Metrics table
CREATE TABLE performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies ON DELETE CASCADE NOT NULL,
  average_receiving_time integer NOT NULL,
  max_receiving_time integer NOT NULL,
  notifies_on_receiving boolean DEFAULT false,
  cutoff_time text,
  dtc_sla text NOT NULL,
  b2b_sla text,
  peak_season_sla text,
  returns_processing_time integer,
  provides_branded_return_portals boolean DEFAULT false,
  order_accuracy_rate text NOT NULL,
  inventory_accuracy_rate text NOT NULL,
  cycle_counting text NOT NULL,
  provides_real_time_tracking boolean DEFAULT false,
  billing_frequency text NOT NULL,
  has_onboarding_fees boolean DEFAULT false,
  transparent_fees boolean DEFAULT false,
  has_dedicated_manager boolean DEFAULT false,
  response_time text NOT NULL,
  support_hours text NOT NULL,
  has_weekend_support boolean DEFAULT false,
  requires_long_term_contracts boolean DEFAULT false,
  provides_onboarding_support boolean DEFAULT false,
  has_standard_onboarding boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (company_id)
);

-- Customer References table (renamed from 'references' to avoid reserved keyword)
CREATE TABLE customer_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies ON DELETE CASCADE NOT NULL,
  brand_name text NOT NULL,
  website text NOT NULL,
  contact_email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Media Assets table
CREATE TABLE media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies ON DELETE CASCADE NOT NULL,
  logo_url text,
  warehouse_image_urls text[] DEFAULT '{}',
  intro_video_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (company_id)
);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own company data" ON companies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own company data" ON companies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own company data" ON companies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Warehouse policies
CREATE POLICY "Users can view own warehouse data" ON warehouses
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM companies WHERE id = warehouses.company_id
    )
  );

CREATE POLICY "Users can update own warehouse data" ON warehouses
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM companies WHERE id = warehouses.company_id
    )
  );

CREATE POLICY "Users can insert own warehouse data" ON warehouses
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM companies WHERE id = warehouses.company_id
    )
  );

-- Similar policies for other tables
CREATE POLICY "Users can view own capabilities" ON capabilities
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM companies WHERE id = capabilities.company_id
    )
  );

CREATE POLICY "Users can update own capabilities" ON capabilities
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM companies WHERE id = capabilities.company_id
    )
  );

CREATE POLICY "Users can insert own capabilities" ON capabilities
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM companies WHERE id = capabilities.company_id
    )
  );

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_warehouses_updated_at
    BEFORE UPDATE ON warehouses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_capabilities_updated_at
    BEFORE UPDATE ON capabilities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_updated_at
    BEFORE UPDATE ON compliance
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tech_stack_updated_at
    BEFORE UPDATE ON tech_stack
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_performance_metrics_updated_at
    BEFORE UPDATE ON performance_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_references_updated_at
    BEFORE UPDATE ON customer_references
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_assets_updated_at
    BEFORE UPDATE ON media_assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();