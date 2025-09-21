
create extension postgis with schema "extensions";

alter table profiles
add column location geography
generated always as (st_point(longitude, latitude))
stored;

create index profiles_geo_index
on public.profiles
using gist (location);


create or replace function get_profiles(
  page_size integer
)
returns table (
  id uuid,
  first_name text,
  age integer,
  height_cm integer,
  neighborhood text,
  children text,
  family_plan text,
  
  gender text,
  
  ethnicities text[],
  
  photos jsonb,
  answers jsonb
)
language plpgsql
security definer
as $$
declare
  v_profile_id uuid;
  current_profile profiles%rowtype;
  like_status int := 2;
  match_status int := 4;
  unmatch_status int := 5;
  review_status int := 6;
begin

select profiles.id into v_profile_id
from profiles where profiles.user_id = auth.uid();

if v_profile_id is null then
  raise exception 'profile not found for user %', auth.uid();
end if;

select * into current_profile
from profiles where profiles.id = v_profile_id;

return query
with filtered_profiles as (
  select p.*
  from profiles p
  where p.id <> v_profile_id
    and extract(year from age(p.dob)) between current_profile.min_age and current_profile.max_age
    and extract(year from age(current_profile.dob)) between p.min_age and p.max_age
    and st_dwithin(p.location, current_profile.location, current_profile.max_distance_km * 1000)
)
select
  p.id,
  p.first_name,
  extract(year from age(p.dob))::int as age,
  p.height_cm,
  p.neighborhood,
  children.name as children,
  family_plans.name as family_plan,
  
  "gender".name as gender,
  (
    select coalesce(array_agg(ethnicities.name), '{}')
    from profile_ethnicities
    left join ethnicities on ethnicities.id = profile_ethnicities.ethnicity_id
    where profile_ethnicities.profile_id = p.id
  ) as ethnicities,
  
  (
    select coalesce(jsonb_agg(json_build_object(
      'id', profile_photos.id,
      'photo_url', profile_photos.photo_url,
      'photo_order', profile_photos.photo_order
    ) order by profile_photos.photo_order)::jsonb, '[]'::jsonb )
    from profile_photos
    where profile_photos.profile_id = p.id and profile_photos.is_active = true
  ) as photos,
  (
    select coalesce(jsonb_agg(json_build_object(
      'id', profile_answers.id,
      'answer_text', profile_answers.answer_text,
      'answer_order', profile_answers.answer_order,
      'question', prompts.question
    ) order by profile_answers.answer_order)::jsonb, '[]'::jsonb )
    from profile_answers
    left join prompts on prompts.id = profile_answers.prompt_id
    where profile_answers.profile_id = p.id and profile_answers.is_active = true
  ) as answers
from filtered_profiles p
left join children on children.id = p.children_id
left join family_plans on family_plans.id = p.family_plan_id

left join "gender" on "gender".id = p.gender_id

left join profile_ethnicity_preferences pep_cp on pep_cp.profile_id = v_profile_id
left join profile_ethnicity_preferences pep_p on pep_p.profile_id = p.id
left join interactions i_cp on i_cp.target_id = p.id and i_cp.actor_id = v_profile_id
left join interactions i_p on i_p.target_id = v_profile_id and i_p.actor_id = p.id
where (
    (current_profile.gender_id = (select "gender".id from "gender" where name = 'Man') 
     and p.gender_id = (select "gender".id from "gender" where name = 'Woman'))
    or
    (current_profile.gender_id = (select "gender".id from "gender" where name = 'Woman') 
     and p.gender_id = (select "gender".id from "gender" where name = 'Man'))
  )
  and (pep_cp.ethnicity_id in (
    select profile_ethnicities.ethnicity_id
    from profile_ethnicities
    where profile_ethnicities.profile_id = p.id
  ) or pep_cp.ethnicity_id is null)
  and (pep_p.ethnicity_id in (
    select profile_ethnicities.ethnicity_id
    from profile_ethnicities
    where profile_ethnicities.profile_id = v_profile_id
  ) or pep_p.ethnicity_id is null)
  and (i_cp.status_id is null or i_cp.status_id in (review_status, unmatch_status))
  and (i_p.status_id is null or i_p.status_id not in (like_status, match_status))
limit get_profiles.page_size;
end;
$$;
