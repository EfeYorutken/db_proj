 select a.name,count(a.side_effect) from 
(
 	select medication.name,pos_effect.fixes,neg_effect.side_effect from medication 
	inner join has_effect 
	on has_effect.medication_id = medication.med_id 
	inner join pos_effect 
	on has_effect.effect_id = pos_effect.pos_id
	inner join has_side_effect
	on has_side_effect.medication_id = medication.med_id
	inner join neg_effect
	on neg_effect.neg_id = has_side_effect.side_effect_id
	where pos_effect.fixes = "improves mood" or pos_effect.fixes ="lowers bp" 
) as a 
group by a.name
;
