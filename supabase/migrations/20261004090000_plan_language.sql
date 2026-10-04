-- Language the traveller wants their plan written in. Existing rows are
-- English, which is what every plan so far was generated in.
alter table public.trip_preferences
  add column language text not null default 'en'
    check (language in ('en', 'es', 'fr'));
