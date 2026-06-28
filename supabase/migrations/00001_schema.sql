-- ============================================
-- Zyvo - Schema (idempotent: safe to rerun)
-- ============================================

-- 1. USERS
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  phone text,
  email text default '',
  city text default '',
  role text default 'client' check (role in ('client', 'prestataire', 'admin')),
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.users enable row level security;

drop policy if exists "Users can read own profile" on public.users;
create policy "Users can read own profile"
  on public.users for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.users;
create policy "Users can update own profile"
  on public.users for update using (auth.uid() = id);

-- 2. PROVIDERS
create table if not exists public.providers (
  id bigint generated always as identity primary key,
  user_id uuid references public.users on delete cascade,
  name text not null,
  service text,
  category text,
  city text,
  description text default '',
  price text,
  price_value bigint default 0,
  cover_gradient text default 'from-blue-600 via-blue-500 to-cyan-400',
  badges jsonb default '[]'::jsonb,
  verified_documents jsonb default '[]'::jsonb,
  gallery jsonb default '[]'::jsonb,
  rating numeric(2,1) default 5.0,
  missions bigint default 0,
  response_rate text default '100%',
  response_time text default '15 min',
  likes bigint default 0,
  created_at timestamptz default now()
);

-- Add missing columns (safe, only if they don't exist)
alter table public.providers add column if not exists avatar_gradient text default 'from-blue-500 to-cyan-400';
alter table public.providers add column if not exists experience text default '';
alter table public.providers add column if not exists languages jsonb default '[]'::jsonb;
alter table public.providers add column if not exists availability_days jsonb default '[]'::jsonb;
alter table public.providers add column if not exists availability_from time default '08:00';
alter table public.providers add column if not exists availability_to time default '17:00';
alter table public.providers add column if not exists whatsapp text default '';
alter table public.providers add column if not exists instagram text default '';
alter table public.providers add column if not exists facebook text default '';
alter table public.providers add column if not exists zones jsonb default '[]'::jsonb;

alter table public.providers enable row level security;

drop policy if exists "Anyone can read providers" on public.providers;
create policy "Anyone can read providers"
  on public.providers for select using (true);

drop policy if exists "Providers can update own profile" on public.providers;
create policy "Providers can update own profile"
  on public.providers for update using (auth.uid() = user_id);

drop policy if exists "Providers can insert own profile" on public.providers;
create policy "Providers can insert own profile"
  on public.providers for insert with check (auth.uid() = user_id);

-- 3. SERVICES
create table if not exists public.services (
  id bigint generated always as identity primary key,
  provider_id bigint references public.providers on delete cascade,
  name text not null,
  category text,
  price text,
  description text,
  active boolean default true,
  created_at timestamptz default now()
);

alter table public.services enable row level security;

drop policy if exists "Anyone can read services" on public.services;
create policy "Anyone can read services"
  on public.services for select using (true);

drop policy if exists "Providers can manage own services" on public.services;
create policy "Providers can manage own services"
  on public.services for all using (
    auth.uid() in (select user_id from public.providers where id = provider_id)
  );

-- 4. QUOTES
create table if not exists public.quotes (
  id bigint generated always as identity primary key,
  client_id uuid references public.users on delete cascade,
  category text,
  city text,
  description text,
  urgency text,
  budget text,
  status text default 'Ouvert' check (status in ('Ouvert', 'Répondu', 'Fermé')),
  photos jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table public.quotes enable row level security;

drop policy if exists "Clients can manage own quotes" on public.quotes;
create policy "Clients can manage own quotes"
  on public.quotes for all using (auth.uid() = client_id);

drop policy if exists "Providers can read quotes" on public.quotes;
create policy "Providers can read quotes"
  on public.quotes for select using (
    exists (select 1 from public.providers where user_id = auth.uid())
  );

-- 5. QUOTE RESPONSES
create table if not exists public.quote_responses (
  id bigint generated always as identity primary key,
  quote_id bigint references public.quotes on delete cascade,
  provider_id bigint references public.providers on delete cascade,
  price text,
  message text,
  created_at timestamptz default now()
);

alter table public.quote_responses enable row level security;

drop policy if exists "Providers can respond to quotes" on public.quote_responses;
create policy "Providers can respond to quotes"
  on public.quote_responses for insert with check (
    auth.uid() in (select user_id from public.providers where id = provider_id)
  );

drop policy if exists "Quote participants can read responses" on public.quote_responses;
create policy "Quote participants can read responses"
  on public.quote_responses for select using (
    auth.uid() in (select client_id from public.quotes where id = quote_id)
    or auth.uid() in (select user_id from public.providers where id = provider_id)
  );

-- 6. BOOKINGS
create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  client_id uuid references public.users on delete cascade,
  provider_id bigint references public.providers on delete cascade,
  date text,
  time text,
  status text default 'En attente' check (status in ('En attente', 'Confirmée', 'Terminée', 'Annulée', 'No-show')),
  address text,
  price_value bigint default 0,
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;

drop policy if exists "Participants can read bookings" on public.bookings;
create policy "Participants can read bookings"
  on public.bookings for select using (
    auth.uid() = client_id or
    auth.uid() in (select user_id from public.providers where id = provider_id)
  );

drop policy if exists "Clients can create bookings" on public.bookings;
create policy "Clients can create bookings"
  on public.bookings for insert with check (auth.uid() = client_id);

drop policy if exists "Participants can update bookings" on public.bookings;
create policy "Participants can update bookings"
  on public.bookings for update using (
    auth.uid() = client_id or
    auth.uid() in (select user_id from public.providers where id = provider_id)
  );

-- 7. REVIEWS
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  client_id uuid references public.users on delete cascade,
  provider_id bigint references public.providers on delete cascade,
  rating smallint not null check (rating >= 1 and rating <= 5),
  comment text,
  likes bigint default 0,
  created_at timestamptz default now()
);

alter table public.reviews enable row level security;

drop policy if exists "Anyone can read reviews" on public.reviews;
create policy "Anyone can read reviews"
  on public.reviews for select using (true);

drop policy if exists "Clients can create reviews" on public.reviews;
create policy "Clients can create reviews"
  on public.reviews for insert with check (auth.uid() = client_id);

-- 8. NOTIFICATIONS
create table if not exists public.notifications (
  id bigint generated always as identity primary key,
  user_id uuid references public.users on delete cascade,
  type text,
  title text,
  message text,
  read boolean default false,
  created_at timestamptz default now()
);

alter table public.notifications enable row level security;

drop policy if exists "Users can manage own notifications" on public.notifications;
create policy "Users can manage own notifications"
  on public.notifications for all using (auth.uid() = user_id);

-- 9. MESSAGES
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  sender_id uuid references public.users on delete cascade,
  receiver_id uuid references public.users on delete cascade,
  content text,
  read boolean default false,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

drop policy if exists "Conversation participants can read messages" on public.messages;
create policy "Conversation participants can read messages"
  on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);

drop policy if exists "Users can send messages" on public.messages;
create policy "Users can send messages"
  on public.messages for insert with check (auth.uid() = sender_id);

-- Indexes
create index if not exists idx_providers_category on public.providers(category);
create index if not exists idx_providers_city on public.providers(city);
create index if not exists idx_quotes_client on public.quotes(client_id);
create index if not exists idx_quotes_status on public.quotes(status);
create index if not exists idx_bookings_client on public.bookings(client_id);
create index if not exists idx_bookings_provider on public.bookings(provider_id);
create index if not exists idx_notifications_user on public.notifications(user_id);
create index if not exists idx_messages_sender on public.messages(sender_id);
create index if not exists idx_messages_receiver on public.messages(receiver_id);
create index if not exists idx_reviews_provider on public.reviews(provider_id);
