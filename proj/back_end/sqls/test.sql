 select * from ( select medication.name, pos_effect.fixes from medication inner join has_effect on has_effect.medication_id = medication.med_id inner join pos_effect on has_effect.effect_id = pos_effect.pos_id) as a where a.fixes = "lowers bp" or a.fixes = "increases bp" or a.fixes = "improves mood";