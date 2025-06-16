/*
  # Comprehensive FulfillYN Database Schema

  1. New Tables
    - brands: Store brand information and profiles
    - brand_requirements: Store brand 3PL requirements and matching criteria
    - partnerships: Track matches/partnerships between brands and 3PLs
    - user_profiles: Extended user profile information
    - admin_actions: Track admin activities and certifications
    - notifications: System notifications for users

  2. Updates
    - Update existing capabilities table for better integration
    - Add user type management

  3. Security
    - Enable RLS on all tables
    - Comprehensive policies for all user types
*/

-- Create enum for user types
CREATE TYPE user_type AS ENUM ('brand', '3pl', 'admin');

-- Create enum for partnership status
CREATE TYPE partnership_status AS ENUM ('pending', 'active', 'paused', 'terminated');

-- Create enum for notification types
CREATE TYPE notification_type AS ENUM ('match_found', 'partnership_request', 'certification_update', 'system_update');

-- User Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  user_type user_type NOT NULL,
  first_name text,
  last_name text,
  phone text,
  company_name text,
  avatar_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id)
);

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  brand_name text NOT NULL,
  contact_name text,
  contact_email text,
  phone text,
  industry text,
  website_url text,
  monthly_volume integer NOT NULL,
  average_order_value decimal(10,2) DEFAULT 0,
  product_types text[] DEFAULT '{}',
  preferred_locations text[] DEFAULT '{}',
  current_platform text,
  current_wms text,
  budget_range text,
  max_setup_fee integer DEFAULT 0,
  timeline_to_start text,
  special_requirements text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Brand Requirements table
CREATE TABLE IF NOT EXISTS brand_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands ON DELETE CASCADE NOT NULL,
  
  -- Essential Requirements
  temperature_controlled boolean DEFAULT false,
  hazmat_support boolean DEFAULT false,
  fba_prep boolean DEFAULT false,
  returns_handling boolean DEFAULT false,
  kitting boolean DEFAULT false,
  subscription_fulfillment boolean DEFAULT false,
  same_day_shipping boolean DEFAULT false,
  b2b_support boolean DEFAULT false,
  edi_support boolean DEFAULT false,
  client_portal boolean DEFAULT false,
  
  -- Integration Requirements
  required_integrations text[] DEFAULT '{}',
  
  -- Performance Requirements
  required_shipping_speed text,
  max_receiving_time integer,
  min_order_accuracy decimal(5,2),
  min_inventory_accuracy decimal(5,2),
  requires_real_time_tracking boolean DEFAULT false,
  
  -- Contract Preferences
  prefer_no_long_term_contract boolean DEFAULT false,
  requires_transparent_pricing boolean DEFAULT false,
  requires_dedicated_manager boolean DEFAULT false,
  requires_24x7_support boolean DEFAULT false,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (brand_id)
);

-- Partnerships/Matches table
CREATE TABLE IF NOT EXISTS partnerships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands ON DELETE CASCADE NOT NULL,
  company_id uuid REFERENCES companies ON DELETE CASCADE NOT NULL,
  status partnership_status DEFAULT 'pending',
  match_score decimal(5,2), -- AI matching score (0-100)
  initiated_by uuid REFERENCES auth.users,
  notes text,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (brand_id, company_id)
);

-- Admin Actions table (for audit trail)
CREATE TABLE IF NOT EXISTS admin_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid REFERENCES auth.users NOT NULL,
  action_type text NOT NULL, -- 'certify', 'suspend', 'approve', 'reject', etc.
  target_type text NOT NULL, -- 'company', 'brand', 'user'
  target_id uuid NOT NULL,
  description text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  related_entity_type text, -- 'partnership', 'company', 'brand'
  related_entity_id uuid,
  metadata jsonb DEFAULT '{}',
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Add certification status to companies table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'is_certified'
  ) THEN
    ALTER TABLE companies ADD COLUMN is_certified boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'certification_date'
  ) THEN
    ALTER TABLE companies ADD COLUMN certification_date timestamptz;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'certified_by'
  ) THEN
    ALTER TABLE companies ADD COLUMN certified_by uuid REFERENCES auth.users;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM user_profiles WHERE user_type = 'admin'
    )
  );

-- Brands Policies
CREATE POLICY "Users can view own brands" ON brands
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own brands" ON brands
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own brands" ON brands
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all brands" ON brands
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM user_profiles WHERE user_type = 'admin'
    )
  );

CREATE POLICY "3PLs can view brands for matching" ON brands
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM user_profiles WHERE user_type = '3pl'
    )
  );

-- Brand Requirements Policies
CREATE POLICY "Users can view own brand requirements" ON brand_requirements
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM brands WHERE id = brand_requirements.brand_id
    )
  );

CREATE POLICY "Users can update own brand requirements" ON brand_requirements
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM brands WHERE id = brand_requirements.brand_id
    )
  );

CREATE POLICY "Users can insert own brand requirements" ON brand_requirements
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM brands WHERE id = brand_requirements.brand_id
    )
  );

CREATE POLICY "3PLs can view brand requirements for matching" ON brand_requirements
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM user_profiles WHERE user_type = '3pl'
    )
  );

-- Partnerships Policies
CREATE POLICY "Brands can view own partnerships" ON partnerships
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM brands WHERE id = partnerships.brand_id
    )
  );

CREATE POLICY "3PLs can view own partnerships" ON partnerships
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM companies WHERE id = partnerships.company_id
    )
  );

CREATE POLICY "Users can create partnerships" ON partnerships
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM brands WHERE id = partnerships.brand_id
    ) OR auth.uid() IN (
      SELECT user_id FROM companies WHERE id = partnerships.company_id
    )
  );

CREATE POLICY "Admins can view all partnerships" ON partnerships
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM user_profiles WHERE user_type = 'admin'
    )
  );

-- Admin Actions Policies
CREATE POLICY "Admins can insert admin actions" ON admin_actions
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_profiles WHERE user_type = 'admin'
    )
  );

CREATE POLICY "Admins can view admin actions" ON admin_actions
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM user_profiles WHERE user_type = 'admin'
    )
  );

-- Notifications Policies
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);

-- Add policies for other tables to work with different user types
CREATE POLICY "3PLs can update own companies" ON companies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "3PLs can insert own companies" ON companies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Similar policies for related tables (warehouses, capabilities, etc.)
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN SELECT unnest(ARRAY['warehouses', 'capabilities', 'compliance', 'tech_stack', 'performance_metrics', 'customer_references', 'media_assets'])
  LOOP
    -- Insert policies for company-related tables
    EXECUTE format('
      CREATE POLICY "3PLs can insert own %1$s" ON %1$s
      FOR INSERT WITH CHECK (
        auth.uid() IN (
          SELECT user_id FROM companies WHERE id = %1$s.company_id
        )
      )', table_name);
    
    -- Admin view policies
    EXECUTE format('
      CREATE POLICY "Admins can view all %1$s" ON %1$s
      FOR SELECT USING (
        auth.uid() IN (
          SELECT user_id FROM user_profiles WHERE user_type = ''admin''
        )
      )', table_name);
      
    -- Brands can view for matching
    EXECUTE format('
      CREATE POLICY "Brands can view %1$s for matching" ON %1$s
      FOR SELECT USING (
        auth.uid() IN (
          SELECT user_id FROM user_profiles WHERE user_type = ''brand''
        )
      )', table_name);
  END LOOP;
END $$;

-- Create updated_at triggers for new tables
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_requirements_updated_at
    BEFORE UPDATE ON brand_requirements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partnerships_updated_at
    BEFORE UPDATE ON partnerships
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_type ON user_profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_brands_user_id ON brands(user_id);
CREATE INDEX IF NOT EXISTS idx_brands_status ON brands(status);
CREATE INDEX IF NOT EXISTS idx_partnerships_brand_id ON partnerships(brand_id);
CREATE INDEX IF NOT EXISTS idx_partnerships_company_id ON partnerships(company_id);
CREATE INDEX IF NOT EXISTS idx_partnerships_status ON partnerships(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_admin_actions_admin_user_id ON admin_actions(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_actions_target ON admin_actions(target_type, target_id);

-- Create a function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, user_type, first_name, last_name)
  VALUES (
    new.id,
    'brand'::user_type, -- Default to brand, can be changed later
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to calculate partnership match scores
CREATE OR REPLACE FUNCTION calculate_match_score(
  p_brand_id uuid,
  p_company_id uuid
)
RETURNS decimal AS $$
DECLARE
  match_score decimal := 0;
  brand_req record;
  company_cap record;
  location_match boolean := false;
BEGIN
  -- Get brand requirements
  SELECT * INTO brand_req FROM brand_requirements WHERE brand_id = p_brand_id;
  
  -- Get company capabilities
  SELECT * INTO company_cap FROM capabilities WHERE company_id = p_company_id;
  
  IF brand_req IS NULL OR company_cap IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Calculate score based on matching requirements (simplified logic)
  -- Temperature control
  IF brand_req.temperature_controlled = company_cap.temperature_controlled THEN
    match_score := match_score + 10;
  END IF;
  
  -- Hazmat support
  IF NOT brand_req.hazmat_support OR company_cap.supports_hazmat THEN
    match_score := match_score + 10;
  END IF;
  
  -- FBA Prep
  IF NOT brand_req.fba_prep OR company_cap.supports_fba_prep THEN
    match_score := match_score + 10;
  END IF;
  
  -- Returns handling
  IF NOT brand_req.returns_handling OR company_cap.handles_returns THEN
    match_score := match_score + 10;
  END IF;
  
  -- Kitting
  IF NOT brand_req.kitting OR company_cap.offers_kitting THEN
    match_score := match_score + 10;
  END IF;
  
  -- Subscription fulfillment
  IF NOT brand_req.subscription_fulfillment OR company_cap.offers_subscription_fulfillment THEN
    match_score := match_score + 10;
  END IF;
  
  -- Same day shipping
  IF NOT brand_req.same_day_shipping OR company_cap.offers_same_day_shipping THEN
    match_score := match_score + 10;
  END IF;
  
  -- B2B support
  IF NOT brand_req.b2b_support OR company_cap.supports_b2b THEN
    match_score := match_score + 10;
  END IF;
  
  -- EDI support
  IF NOT brand_req.edi_support OR company_cap.supports_edi THEN
    match_score := match_score + 10;
  END IF;
  
  -- Additional scoring could be added for location matching, volume capacity, etc.
  
  -- Base score for certified companies
  SELECT is_certified INTO location_match FROM companies WHERE id = p_company_id;
  IF location_match THEN
    match_score := match_score + 10;
  END IF;
  
  RETURN GREATEST(0, LEAST(100, match_score));
END;
$$ LANGUAGE plpgsql;

-- Insert some example data for testing (optional)
-- This would normally be done through the application
/*
INSERT INTO user_profiles (user_id, user_type, first_name, last_name, company_name) VALUES
  (gen_random_uuid(), 'admin', 'System', 'Admin', 'FulfillYN'),
  (gen_random_uuid(), 'brand', 'John', 'Doe', 'Example Brand'),
  (gen_random_uuid(), '3pl', 'Jane', 'Smith', 'Example 3PL');
*/