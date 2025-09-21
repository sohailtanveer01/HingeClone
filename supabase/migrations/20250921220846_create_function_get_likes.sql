
create or replace function get_likes()
returns table (
  id uuid,
  photo_url text,
  answer_text text,
  question text,
  profile jsonb
)
language plpgsql
security definer
as $$
declare
  v_profile_id uuid;
  like_status int := 2;
begin

select profiles.id into v_profile_id
from profiles where profiles.user_id = auth.uid();

if v_profile_id is null then
  raise exception 'profile not found for user %', auth.uid();
end if;

return query
select
  i.id,
  profile_photos.photo_url,
  profile_answers.answer_text,
  prompts.question,
  (select jsonb_build_object (
    'id', p.id,
    'first_name', p.first_name,
    'age', extract(year from age(p.dob))::int,
    'height_cm', p.height_cm,
    'neighborhood', p.neighborhood,
    'children', children.name,
    'family_plan', family_plans.name,
    
    'gender', gender.name,
    'ethnicities', (
      select coalesce(array_agg(ethnicities.name), '{}')
      from profile_ethnicities
      left join ethnicities on ethnicities.id = profile_ethnicities.ethnicity_id
      where profile_ethnicities.profile_id = p.id
    ),
    
    'photos', (
      select coalesce(jsonb_agg(json_build_object(
        'id', profile_photos.id,
        'photo_url', profile_photos.photo_url,
        'photo_order', profile_photos.photo_order
      ) order by profile_photos.photo_order)::jsonb, '{}' )
      from profile_photos
      where profile_photos.profile_id = p.id and profile_photos.is_active = true
    ),
    'answers', (
      select coalesce(jsonb_agg(json_build_object(
        'id', profile_answers.id,
        'answer_text', profile_answers.answer_text,
        'answer_order', profile_answers.answer_order,
        'question', prompts.question
      ) order by profile_answers.answer_order)::jsonb, '{}' )
      from profile_answers
      left join prompts on prompts.id = profile_answers.prompt_id
      where profile_answers.profile_id = p.id and profile_answers.is_active = true
    )
  )) as profile
from interactions i
join profiles p on p.id = i.actor_id
left join profile_photos on profile_photos.id = i.photo_id
left join profile_answers on profile_answers.id = i.answer_id
left join prompts on prompts.id = profile_answers.prompt_id
left join children on children.id = p.children_id
left join family_plans on family_plans.id = p.family_plan_id

left join gender on gender.id = p.gender_id
where i.status_id = like_status
  and i.target_id = v_profile_id
order by i.created_at desc;
end;
$$;
