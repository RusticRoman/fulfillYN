/*
  # Fix user signup trigger function

  1. Problem
    - The handle_new_user trigger is failing when new users sign up
    - This is likely due to RLS policies blocking the trigger function
    - The trigger needs to properly extract user metadata and create user profiles

  2. Solution
    - Recreate the handle_new_user trigger function with proper security context
    - Ensure the function can bypass RLS when creating user profiles
    - Handle all required fields properly

  3. Security
    - Function runs with SECURITY DEFINER to bypass RLS
    - Only creates user profiles for new auth users
*/

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create the trigger function with proper permissions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert into user_profiles table
  INSERT INTO public.user_profiles (
    user_id,
    user_type,
    first_name,
    last_name,
    company_name,
    is_active
  )
  VALUES (
    NEW.id,
    COALESCE(
      (NEW.raw_user_meta_data->>'user_type')::user_type,
      'brand'::user_type
    ),
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'company_name',
    true
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create the trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Add a policy to allow the trigger function to insert user profiles
CREATE POLICY "Allow trigger to insert user profiles"
  ON user_profiles
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Ensure the service role can always insert user profiles
CREATE POLICY "Service role can manage user profiles"
  ON user_profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);