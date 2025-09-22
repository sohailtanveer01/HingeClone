
create policy "select_children_public"
on "public"."children"
as permissive
for select
to public
using (true);

create policy "select_family_plans_public"
on "public"."family_plans"
as permissive
for select
to public
using (true);



create policy "select_gender_public"
on "public"."gender"
as permissive
for select
to public
using (true);



create policy "select_ethnicities_public"
on "public"."ethnicities"
as permissive
for select
to public
using (true);



create policy "select_prompts_public"
on "public"."prompts"
as permissive
for select
to public
using (true);
