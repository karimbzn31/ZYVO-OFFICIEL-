-- Auto-confirm emails on signup (bypass email verification)
create or replace function public.auto_confirm_user()
returns trigger as $$
begin
  update auth.users set email_confirmed_at = now() where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.auto_confirm_user();
