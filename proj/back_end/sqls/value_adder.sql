use db_project;
insert into pos_effect(fixes)
values
("lowers bp"),
("increases bp"),
("improves mood"),
("lessens phisical pain"),
("increases blood-sugar"),
("lowers blood-sugar"),
("lowers acid reflux")
;

insert into neg_effect(side_effect)
values
("drops bp"),
("hightens bp"),
("depression"),
("joint pain"),
("over increases blood sugar"),
("lathergy")
;

insert into medication(name)values("vzjkbin");
insert into medication(name)values("klqpaol");
insert into medication(name)values("iixfjol");
insert into medication(name)values("onensol");
insert into medication(name)values("lzbngron");
insert into medication(name)values("lwoldin");
insert into medication(name)values("oujeiin");
insert into medication(name)values("gwfxoron");
insert into medication(name)values("qninpron");
insert into medication(name)values("eefzqol");

insert into has_effect(medication_id,effect_id) values (1,5);
insert into has_side_effect(medication_id,side_effect_id) values (1,3);
insert into has_effect(medication_id,effect_id) values (1,5);
insert into has_side_effect(medication_id,side_effect_id) values (1,3);
insert into has_effect(medication_id,effect_id) values (2,6);
insert into has_side_effect(medication_id,side_effect_id) values (2,2);
insert into has_effect(medication_id,effect_id) values (2,3);
insert into has_side_effect(medication_id,side_effect_id) values (2,5);
insert into has_effect(medication_id,effect_id) values (3,5);
insert into has_side_effect(medication_id,side_effect_id) values (3,3);
insert into has_effect(medication_id,effect_id) values (3,5);
insert into has_side_effect(medication_id,side_effect_id) values (3,3);
insert into has_effect(medication_id,effect_id) values (4,3);
insert into has_side_effect(medication_id,side_effect_id) values (4,5);
insert into has_effect(medication_id,effect_id) values (4,6);
insert into has_side_effect(medication_id,side_effect_id) values (4,2);
insert into has_effect(medication_id,effect_id) values (5,4);
insert into has_effect(medication_id,effect_id) values (5,1);
insert into has_side_effect(medication_id,side_effect_id) values (5,7);
insert into has_effect(medication_id,effect_id) values (6,1);
insert into has_side_effect(medication_id,side_effect_id) values (6,7);
insert into has_effect(medication_id,effect_id) values (6,3);
insert into has_side_effect(medication_id,side_effect_id) values (6,5);
insert into has_effect(medication_id,effect_id) values (7,2);
insert into has_side_effect(medication_id,side_effect_id) values (7,6);
insert into has_effect(medication_id,effect_id) values (7,7);
insert into has_side_effect(medication_id,side_effect_id) values (7,1);
insert into has_effect(medication_id,effect_id) values (8,5);
insert into has_side_effect(medication_id,side_effect_id) values (8,3);
insert into has_effect(medication_id,effect_id) values (8,2);
insert into has_side_effect(medication_id,side_effect_id) values (8,6);
insert into has_effect(medication_id,effect_id) values (9,6);
insert into has_side_effect(medication_id,side_effect_id) values (9,2);
insert into has_effect(medication_id,effect_id) values (9,1);
insert into has_side_effect(medication_id,side_effect_id) values (9,7);
insert into has_effect(medication_id,effect_id) values (10,7);
insert into has_side_effect(medication_id,side_effect_id) values (10,1);
insert into has_effect(medication_id,effect_id) values (10,6);
insert into has_side_effect(medication_id,side_effect_id) values (10,2);
