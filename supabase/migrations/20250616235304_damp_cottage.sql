/*
  # Create 3PL Tables Migration

  1. New Tables
    - `capabilities` - 3PL service capabilities
    - `compliance` - compliance and certifications
    - `tech_stack` - technology and integrations  
    - `performance_metrics` - SLA and performance data
    - `customer_references` - customer reference information
    - `media_assets` - media files and URLs

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage own data
    - Add policies for admins to view all data

  3. Indexes and Triggers
    - Performance indexes on foreign keys
    - Auto-updating timestamps
*/

-- Capabilities table
CREATE TABLE IF NOT EXISTS capabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  temperature_controlled boolean DEFAULT false,
  temperature_types text[] DEFAULT '{}',
  supports_hazmat boolean DEFAULT false,
  supports_fba_prep boolean DEFAULT false,
  handles_returns boolean DEFAULT false,
  offers_kitting boolean DEFAULT false,
  offers_subscription_fulfillment boolean DEFAULT false,
  offers_same_day_shipping boolean DEFAULT false,
  supports_edi boolean DEFAULT false,
  supports_b2b boolean DEFAULT false,
  b2b_types text[] DEFAULT '{}',
  minimum_order_volume integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint if it doesn't exist
DO $$ BEGIN
  ALTER TABLE capabilities ADD CONSTRAINT capabilities_company_id_key UNIQUE(company_id);
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Compliance table
CREATE TABLE IF NOT EXISTS compliance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  fda_registered boolean DEFAULT false,
  has_liability_insurance boolean DEFAULT false,
  certifications text[] DEFAULT '{}',
  other_certification text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint if it doesn't exist
DO $$ BEGIN
  ALTER TABLE compliance ADD CONSTRAINT compliance_company_id_key UNIQUE(company_id);
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Tech Stack table
CREATE TABLE IF NOT EXISTS tech_stack (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  wms_system text DEFAULT '',
  other_wms text,
  has_client_portal boolean DEFAULT false,
  integrations text[] DEFAULT '{}',
  has_proprietary_software boolean DEFAULT false,
  proprietary_software_details text,
  carriers text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint if it doesn't exist
DO $$ BEGIN
  ALTER TABLE tech_stack ADD CONSTRAINT tech_stack_company_id_key UNIQUE(company_id);
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Performance Metrics table
CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  average_receiving_time integer DEFAULT 0,
  max_receiving_time integer DEFAULT 0,
  notifies_on_receiving boolean DEFAULT false,
  cutoff_time text,
  dtc_sla text,
  b2b_sla text,
  peak_season_sla text,
  returns_processing_time integer,
  provides_branded_return_portals boolean DEFAULT false,
  order_accuracy_rate text,
  inventory_accuracy_rate text,
  cycle_counting text,
  provides_real_time_tracking boolean DEFAULT false,
  billing_frequency text,
  has_onboarding_fees boolean DEFAULT false,
  transparent_fees boolean DEFAULT false,
  has_dedicated_manager boolean DEFAULT false,
  response_time text,
  support_hours text,
  has_weekend_support boolean DEFAULT false,
  requires_long_term_contracts boolean DEFAULT false,
  provides_onboarding_support boolean DEFAULT false,
  has_standard_onboarding boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint if it doesn't exist
DO $$ BEGIN
  ALTER TABLE performance_metrics ADD CONSTRAINT performance_metrics_company_id_key UNIQUE(company_id);
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Customer References table
CREATE TABLE IF NOT EXISTS customer_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  brand_name text NOT NULL,
  website text,
  contact_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Media Assets table
CREATE TABLE IF NOT EXISTS media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  logo_url text,
  warehouse_image_urls text[] DEFAULT '{}',
  intro_video_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint if it doesn't exist
DO $$ BEGIN
  ALTER TABLE media_assets ADD CONSTRAINT media_assets_company_id_key UNIQUE(company_id);
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable RLS on all tables
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own capabilities" ON capabilities;
DROP POLICY IF EXISTS "Users can insert own capabilities" ON capabilities;
DROP POLICY IF EXISTS "Users can update own capabilities" ON capabilities;
DROP POLICY IF EXISTS "Admins can view all capabilities" ON capabilities;

DROP POLICY IF EXISTS "Users can view own compliance" ON compliance;
DROP POLICY IF EXISTS "Users can insert own compliance" ON compliance;
DROP POLICY IF EXISTS "Users can update own compliance" ON compliance;
DROP POLICY IF EXISTS "Admins can view all compliance" ON compliance;

DROP POLICY IF EXISTS "Users can view own tech stack" ON tech_stack;
DROP POLICY IF EXISTS "Users can insert own tech stack" ON tech_stack;
DROP POLICY IF EXISTS "Users can update own tech stack" ON tech_stack;
DROP POLICY IF EXISTS "Admins can view all tech stack" ON tech_stack;

DROP POLICY IF EXISTS "Users can view own performance metrics" ON performance_metrics;
DROP POLICY IF EXISTS "Users can insert own performance metrics" ON performance_metrics;
DROP POLICY IF EXISTS "Users can update own performance metrics" ON performance_metrics;
DROP POLICY IF EXISTS "Admins can view all performance metrics" ON performance_metrics;

DROP POLICY IF EXISTS "Users can view own customer references" ON customer_references;
DROP POLICY IF EXISTS "Users can insert own customer references" ON customer_references;
DROP POLICY IF EXISTS "Users can update own customer references" ON customer_references;
DROP POLICY IF EXISTS "Users can delete own customer references" ON customer_references;
DROP POLICY IF EXISTS "Admins can view all customer references" ON customer_references;

DROP POLICY IF EXISTS "Users can view own media assets" ON media_assets;
DROP POLICY IF EXISTS "Users can insert own media assets" ON media_assets;
DROP POLICY IF EXISTS "Users can update own media assets" ON media_assets;
DROP POLICY IF EXISTS "Admins can view all media assets" ON media_assets;

-- Capabilities policies
CREATE POLICY "Users can view own capabilities"
  ON capabilities
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own capabilities"
  ON capabilities
  FOR INSERT
  TO authenticated
  WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update own capabilities"
  ON capabilities
  FOR UPDATE
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all capabilities"
  ON capabilities
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM user_profiles WHERE user_type = 'admin'
  ));

-- Compliance policies
CREATE POLICY "Users can view own compliance"
  ON compliance
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own compliance"
  ON compliance
  FOR INSERT
  TO authenticated
  WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update own compliance"
  ON compliance
  FOR UPDATE
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all compliance"
  ON compliance
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM user_profiles WHERE user_type = 'admin'
  ));

-- Tech Stack policies
CREATE POLICY "Users can view own tech stack"
  ON tech_stack
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own tech stack"
  ON tech_stack
  FOR INSERT
  TO authenticated
  WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update own tech stack"
  ON tech_stack
  FOR UPDATE
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all tech stack"
  ON tech_stack
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM user_profiles WHERE user_type = 'admin'
  ));

-- Performance Metrics policies
CREATE POLICY "Users can view own performance metrics"
  ON performance_metrics
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own performance metrics"
  ON performance_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update own performance metrics"
  ON performance_metrics
  FOR UPDATE
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all performance metrics"
  ON performance_metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM user_profiles WHERE user_type = 'admin'
  ));

-- Customer References policies
CREATE POLICY "Users can view own customer references"
  ON customer_references
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own customer references"
  ON customer_references
  FOR INSERT
  TO authenticated
  WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update own customer references"
  ON customer_references
  FOR UPDATE
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own customer references"
  ON customer_references
  FOR DELETE
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all customer references"
  ON customer_references
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM user_profiles WHERE user_type = 'admin'
  ));

-- Media Assets policies
CREATE POLICY "Users can view own media assets"
  ON media_assets
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own media assets"
  ON media_assets
  FOR INSERT
  TO authenticated
  WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update own media assets"
  ON media_assets
  FOR UPDATE
  TO authenticated
  USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all media assets"
  ON media_assets
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM user_profiles WHERE user_type = 'admin'
  ));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_capabilities_company_id ON capabilities(company_id);
CREATE INDEX IF NOT EXISTS idx_compliance_company_id ON compliance(company_id);
CREATE INDEX IF NOT EXISTS idx_tech_stack_company_id ON tech_stack(company_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_company_id ON performance_metrics(company_id);
CREATE INDEX IF NOT EXISTS idx_customer_references_company_id ON customer_references(company_id);
CREATE INDEX IF NOT EXISTS idx_media_assets_company_id ON media_assets(company_id);

-- Create or replace the trigger function (in case it doesn't exist yet)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_capabilities_updated_at ON capabilities;
DROP TRIGGER IF EXISTS update_compliance_updated_at ON compliance;
DROP TRIGGER IF EXISTS update_tech_stack_updated_at ON tech_stack;
DROP TRIGGER IF EXISTS update_performance_metrics_updated_at ON performance_metrics;
DROP TRIGGER IF EXISTS update_customer_references_updated_at ON customer_references;
DROP TRIGGER IF EXISTS update_media_assets_updated_at ON media_assets;

-- Create updated_at triggers for all tables
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