use db_project;
create table medication(
	med_id int primary key AUTO_INCREMENT,
	name varchar(40)
);
alter table medication
AUTO_INCREMENT = 1;

create table pos_effect(
	pos_id int primary key AUTO_INCREMENT,
	fixes varchar(40)
);
alter table pos_effect
AUTO_INCREMENT = 1;

create table neg_effect(
	neg_id int primary key AUTO_INCREMENT,
	side_effect varchar(40)
);
alter table neg_effect
AUTO_INCREMENT = 1;

create table has_effect(
	medication_id int,
	effect_id int,
	foreign key(medication_id) references medication(med_id),
	foreign key (effect_id) references pos_effect(pos_id)
);

create table has_side_effect(
	medication_id int,
	side_effect_id int,
	foreign key (medication_id) references medication(med_id),
	foreign key (side_effect_id) references neg_effect(neg_id)
);
