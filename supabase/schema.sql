create schema if not exists halo;
grant usage on schema halo to anon, authenticated, service_role;
alter default privileges in schema halo grant all on tables to anon, authenticated, service_role;
alter default privileges in schema halo grant all on sequences to anon, authenticated, service_role;

create table if not exists halo.businesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  brand_voice text,
  category text,
  created_at timestamptz default now()
);

create table if not exists halo.reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references halo.businesses(id) on delete cascade,
  source text check (source in ('google','yelp','g2','trustpilot')),
  rating int check (rating between 1 and 5),
  author text,
  body text,
  posted_at timestamptz,
  status text default 'new'
);

create table if not exists halo.drafts (
  id uuid primary key default gen_random_uuid(),
  review_id uuid references halo.reviews(id) on delete cascade,
  draft_text text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table halo.businesses enable row level security;
alter table halo.reviews enable row level security;
alter table halo.drafts enable row level security;

drop policy if exists "own businesses" on halo.businesses;
create policy "own businesses" on halo.businesses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own reviews" on halo.reviews;
create policy "own reviews" on halo.reviews for all using (
  exists (select 1 from halo.businesses where id = halo.reviews.business_id and user_id = auth.uid())
) with check (
  exists (select 1 from halo.businesses where id = halo.reviews.business_id and user_id = auth.uid())
);

drop policy if exists "own drafts" on halo.drafts;
create policy "own drafts" on halo.drafts for all using (
  exists (
    select 1 from halo.reviews r
    join halo.businesses b on b.id = r.business_id
    where r.id = halo.drafts.review_id and b.user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from halo.reviews r
    join halo.businesses b on b.id = r.business_id
    where r.id = halo.drafts.review_id and b.user_id = auth.uid()
  )
);

create or replace function halo.seed_for_user(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = halo, public
as $func$
declare
  b_yoga uuid;
  b_coffee uuid;
  b_roof uuid;
  r_id uuid;
  has_data boolean;
begin
  select exists(select 1 from halo.businesses where user_id = p_user_id) into has_data;
  if has_data then return; end if;

  insert into halo.businesses (user_id, name, brand_voice, category)
  values (p_user_id, 'Sunrise Yoga Studio', 'Warm, grateful, present-moment. Sign off with "With gratitude, the Sunrise team." Acknowledge the practice, not just the customer.', 'wellness')
  returning id into b_yoga;

  insert into halo.businesses (user_id, name, brand_voice, category)
  values (p_user_id, 'Carriage Lane Coffee', 'Friendly, local, neighborly. First-name energy. Mentions of regulars and the Tampa community welcome. Sign-off: "the Carriage Lane crew."', 'food-beverage')
  returning id into b_coffee;

  insert into halo.businesses (user_id, name, brand_voice, category)
  values (p_user_id, 'Beacon Roofing & Restoration', 'Direct, accountable, no fluff. Confirm the work, the warranty, and the timeline. Sign-off: "Tony, owner".', 'home-services')
  returning id into b_roof;

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_yoga, 'google', 5, 'Maya P.', 'Anya''s 6am vinyasa is the highlight of my week. The candlelit savasana actually made me cry. Worth every cent of the unlimited plan.', now() - interval '2 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Maya, what a thing to read first thing this morning. Anya will be so glad — the candlelit savasana is her favorite part too. Thank you for showing up at 6am with us. We see you, and we''re grateful. With gratitude, the Sunrise team.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_yoga, 'google', 5, 'Jordan K.', 'Three months of regular practice here and my chronic back pain is gone. The yin classes saved me. Studio is spotless, mats provided, no upsells.', now() - interval '4 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Jordan, this means everything to read. Three months of showing up is the real work — the studio is just the room. We''re so happy your back is finding ease. Keep going. With gratitude, the Sunrise team.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_yoga, 'yelp', 4, 'Priya S.', 'Love the classes and the teachers. Only knock is parking can be tight on Saturdays. Studio itself is beautiful and welcoming.', now() - interval '6 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Priya, thank you for the kind words. Saturday parking is real — we''re working with the building next door on weekend overflow, and we''ll update the studio newsletter once it''s sorted. So glad to have you with us. With gratitude, the Sunrise team.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_yoga, 'google', 3, 'Sam W.', 'Beautiful space and great teachers, but the 90-minute class felt rushed at the start because the prior class ran 10 min over. Hope that''s a one-off.', now() - interval '8 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Sam, you''re right — that was on us. We''ve added a 15-minute buffer between weekend classes starting next week so this doesn''t repeat. Thank you for naming it clearly; that''s how we get better. Hope to see you back on the mat. With gratitude, the Sunrise team.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_yoga, 'google', 5, 'Linh T.', 'Sound bath last Friday was unreal. Felt like a reset I didn''t know I needed. Already booked the next one.', now() - interval '11 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Linh, the next one is going to be a deep one — gongs back in rotation. So glad it landed for you. With gratitude, the Sunrise team.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_yoga, 'yelp', 1, 'Anonymous', 'Showed up for a 7pm class and the doors were locked. No notice, no email. Drove 25 minutes for nothing. Disappointed.', now() - interval '14 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'I''m so sorry — there was a last-minute teacher emergency and we should have pushed the notification harder than we did. That''s on us. If you''re open to it, please email hello@sunriseyoga.studio and I''ll personally credit your account for two classes and make sure you''re first on our SMS alert list going forward. — Anya, studio owner', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_coffee, 'google', 5, 'Marcus D.', 'Best cortado in South Tampa. Period. The baristas remember your name by visit two. Pastries from the bakery down the street are a nice touch.', now() - interval '1 day', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Marcus, the bakery (Olive & Vine) loves the shoutout — passing it along. Thanks for being a regular. — the Carriage Lane crew.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_coffee, 'google', 5, 'Elena R.', 'Work-from-coffee-shop heaven. Fast wifi, friendly staff, outlets everywhere. The cold brew is dangerous (in a good way).', now() - interval '3 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Elena, the cold brew batch from this week is our 18hr — glad it''s landing. Come hide out anytime. — the Carriage Lane crew.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_coffee, 'yelp', 4, 'Tyler M.', 'Solid latte, great vibe. Only thing — sometimes the wait at peak is brutal. Maybe a second espresso machine?', now() - interval '5 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Tyler — you''re reading our minds. Second machine arrives end of June, plus a mobile-order pickup shelf. Thanks for sticking with us through the line. — the Carriage Lane crew.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_coffee, 'google', 3, 'Hannah B.', 'Coffee is great but they were out of oat milk on a Tuesday morning at 9am. Just feels like that shouldn''t happen anymore.', now() - interval '7 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Hannah, fair. We doubled our standing oat order this week and added a Mon/Wed/Fri delivery so we''re not riding the edge anymore. If you swing back, your next oat drink is on the house — just mention this review at the counter. — the Carriage Lane crew.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_coffee, 'google', 5, 'Diego A.', 'Single-origin pour-over from Honduras was incredible. The barista (I think Sage?) explained the farm and the process. Felt like a real coffee experience.', now() - interval '9 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Diego, yes — that''s Sage. They light up every time someone asks. The Honduras is on the menu through next week, then we rotate to an Ethiopian Yirgacheffe. — the Carriage Lane crew.', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_coffee, 'yelp', 1, 'Patrick V.', 'Barista was rude when I asked to substitute syrups in a drink. Felt like I was being a nuisance for ordering. Won''t be back.', now() - interval '12 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Patrick, that''s not how we want anyone leaving Carriage Lane. I''d like to make it right. If you''re open to it, email me directly at owner@carriagelane.coffee and I''ll handle this personally — coffee on us next visit, and I''ll be there to make it. — Mateo, owner', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_roof, 'google', 5, 'Karen H.', 'Beacon replaced our roof in 2 days after the storm. Crew showed up on time, cleaned every nail off the lawn, and Tony walked us through the warranty paperwork in person. Rare these days.', now() - interval '2 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Karen, appreciate you taking the time. Two-day turnarounds happen because the crew gives a damn — I''ll pass this to them at Monday''s huddle. Warranty is registered, you''re set for 25 years on the material and 10 on our labor. — Tony, owner', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_roof, 'google', 5, 'Ron P.', 'Got three quotes, went with Beacon because Tony was the only one who actually got on the roof during the estimate. No upsells, no scare tactics. Job came in under the bid.', now() - interval '5 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Ron, appreciate the trust. If you''re not on the roof during the estimate, you''re guessing — and homeowners deserve better than a guess. Glad we came in under. — Tony, owner', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_roof, 'google', 4, 'Marie L.', 'Quality work, fair price. Only feedback — communication on day 2 timing was a little vague. Got the job done well though, and the cleanup was perfect.', now() - interval '6 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Marie, fair note. We''ve started sending a same-morning text with an exact ETA and crew names — should have already been doing it. Glad the cleanup held up; that''s a hard line for us. — Tony, owner', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_roof, 'google', 5, 'Dale R.', 'Insurance claim was a mess until Beacon stepped in. Tony sat at my kitchen table with the adjuster and walked through every line item. Roof looks great. Saved us thousands.', now() - interval '10 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Dale, that''s the part homeowners shouldn''t have to do alone. Adjusters move fast and a lot gets missed if no one''s in the room. Glad it landed where it should have. — Tony, owner', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_roof, 'yelp', 3, 'Beth O.', 'Workmanship was fine but it took 11 days to get the final invoice. Had to email twice. Roof itself is good.', now() - interval '13 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'Beth, that''s on the office side and that''s on me. We''ve moved invoicing to same-week-of-completion as a hard rule. Apologies for the chase. — Tony, owner', 'pending');

  insert into halo.reviews (business_id, source, rating, author, body, posted_at, status)
  values (b_roof, 'google', 1, 'Anonymous', 'Crew tracked tar onto our porch and didn''t clean it up. Called twice — no response. Bad look.', now() - interval '16 days', 'new')
  returning id into r_id;
  insert into halo.drafts (review_id, draft_text, status) values (r_id, 'I want to own this. Calls should have been returned same day — full stop. If you''ll send your address to tony@beaconroof.com, I''ll be at your house tomorrow with a power washer and whatever else it takes. — Tony, owner', 'pending');
end;
$func$;

grant execute on function halo.seed_for_user(uuid) to authenticated;
