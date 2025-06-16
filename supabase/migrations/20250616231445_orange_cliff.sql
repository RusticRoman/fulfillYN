/*
  # Fix infinite recursion in user_profiles RLS policy

  1. Problem
    - The "Admins can view all profiles" policy on user_profiles table causes infinite recursion
    - The policy tries to SELECT from user_profiles within its own evaluation
    - This creates a loop when the policy is evaluated during SELECT operations

  2. Solution
    - Drop the problematic "Admins can view all profiles" policy
    - The existing "Users can view own profile" policy already handles user access
    - Admin access can be handled through other means or a different approach
    
  3. Security
    - Maintains existing user access to their own profiles
    - Removes recursive policy that was causing database errors
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- The other policies remain intact:
-- - "Users can view own profile" - allows users to see their own data
-- - "Users can update own profile" - allows users to update their own data  
-- - "Users can insert own profile" - allows users to create their profile
-- - Service role and trigger policies remain for system operations