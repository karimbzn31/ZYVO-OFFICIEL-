-- Disable the auto-confirm trigger so email verification is required
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.auto_confirm_user;
