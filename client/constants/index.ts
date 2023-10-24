export const caseTypes: string[] = [
  "Murder",
  "Rape",
  "Kidnapping",
  "Robbery",
  "Drug",
  "Fraud",
  "Destruction of Property",
  "Extortion",
  "Breach of duty",
  "Battery",
];

export const prompt: string =
  "In the above case summary, 1) i want the case type out of the following ['Murder','Rape','Kidnapping','Robbery','Drug','Fraud','Destruction of Property','Extortion','Breach of duty','Battery'] 2) I want the evidence i.e if their is evidence say yes otherwise no 3)Age of the victim if available (only the number and not any suffix or prefix) otherwise 0' 4) Physical damage, here just tell the amount of time (days weeks etc) needed for recovery, if not alive or the victim is dead then say dead and in all other cases i.e if no information related to physical damage is present or there are multiple injured then say 'nil' 5) Material Damage, here just tell the amount of damage or money, if not then say 'nil'. 6) Date of the crime, if not present then say 'nil'. 7) Time of the crime, if not present then say 'nil' For all these questions i want them as 1) crime_type: 2)victim_age: 3)physical_damage: 4)material_damage: 5)date_of_crime: 6)time_of_crime 7)evidence: ";
