select medication.name,neg_effect.side_effect from medication
inner join has_side_effect
on has_side_effect.medication_id = medication.med_id
inner join neg_effect
on has_side_effect.side_effect_id = neg_effect.neg_id
where medication.name = "oujeiin";


select medication.name,pos_effect.fixes from medication
inner join has_effect
on has_effect.medication_id = medication.med_id
inner join pos_effect
on has_effect.effect_id = pos_effect.pos_id;
