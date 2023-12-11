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
        "brings up energy"
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
