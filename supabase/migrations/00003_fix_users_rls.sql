-- Fix: add INSERT policy for users table (missing from 00001)
-- Without this, registration inserts are silently blocked by RLS

drop policy if exists "Users can insert own profile" on public.users;
create policy "Users can insert own profile"
  on public.users for insert with check (auth.uid() = id);
