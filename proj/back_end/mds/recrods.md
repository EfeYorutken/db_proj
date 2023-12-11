1. created database "db\_project" with the following command
```sql
CREATE DATABASE db_project;
```
1. created the tables medication, has\_effect, has\_side\_effect, pos\_effect, neg\_effect with the following command with the primary key, foreign key and AUTO\_INCREMENT features
```sql
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
```
1. i then used the following sql squeries to add pos\_effect and neg\_effect values
```sql
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
```
1. i used the following python script to create random medications with random effects, at least one of which has to be good. the same script also produces the sql queries that will insert the produced values
```python
from random import randrange
MED_ENDINGS = [ "ion", "ron", "in", "ol"]
SHORTEST_MED_NAME_LN = 4
LEAST_AMOUNT_OF_EFFECTS = 2
MEDS = []
GOODS = [
        "lowers bp",
        "increases bp",
        "improves mood",
        "lessens phisical pain",
        "increases blood-sugar",
        "lowers blood-sugar",
        "lowers acid reflux"
        ]
BADS = [
        "drops bp",
        "hightens bp",
        "depression",
        "",
        "joint pain",
        "over increases blood sugar",
        "lathergy",
        ]

def get_med_names(no):
    res = []
    for i in range(no):
        temp = chr(randrange(97,123))
        for j in range(SHORTEST_MED_NAME_LN):
            temp = temp + chr(randrange(97,123))
        temp = temp + MED_ENDINGS[randrange(0,len(MED_ENDINGS))]
        MEDS.append(temp)
        temp = temp + "\n"
        for j in range(LEAST_AMOUNT_OF_EFFECTS):
            index = randrange(len(GOODS))
            pos = GOODS[index]
            neg = BADS[len(BADS) - 1 - index]
            temp = temp + pos + "\n"
            temp = temp + neg + "\n"
        res.append(temp)
    return res

total_query = ""
med_add = ""
effect_add = ""
arr = get_med_names(int(input(">> ")))
for med in MEDS:
    med_add = med_add + ("insert into medication(name)values(\"%s\");\n"%med)

for med in arr:
    med_index = MEDS.index(med.split("\n")[0]) + 1
    for effect in med.split("\n")[1:]:
        if len(effect) == 0:
            pass
        elif effect in BADS:
            bad_index = BADS.index(effect) + 1
            effect_add = effect_add +  "insert into has_side_effect(medication_id,side_effect_id) values (%s,%s);\n"%(med_index,bad_index)
        elif effect in GOODS:
            good_index = GOODS.index(effect) + 1
            effect_add = effect_add + "insert into has_effect(medication_id,effect_id) values (%s,%s);\n" %(med_index,good_index)

total_query = med_add + "\n" + effect_add
print(total_query)
```
1. i ran the ouputed queries to set up the necessary rows and relations which was the following
```sql
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
```

