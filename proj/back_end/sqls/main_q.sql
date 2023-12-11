--my magnum opus !!!!!!!! :)))))))
select medication.name,neg_effect.side_effect,pos_effect.fixes from medication
inner join has_side_effect
on medication.med_id = has_side_effect.medication_id

inner join neg_effect
on neg_effect.neg_id = has_side_effect.side_effect_id

inner join has_effect
on has_effect.medication_id = medication.med_id

inner join pos_effect
on has_effect.effect_id = pos_effect.pos_id;
