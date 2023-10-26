type calculateScoreType = {
  case_type: string;
  evidence: boolean;
  age: string;
  physical_damage: string;
  material_damage: string;
};
export const calculateScore = ({
  age,
  case_type,
  evidence,
  material_damage,
  physical_damage,
}: calculateScoreType) => {
  var wc;
  if (case_type.toLowerCase() === "murder") wc = 100;
  else if (case_type.toLowerCase() === "rape") wc = 75;
  else if (case_type.toLowerCase() === "kidnapping") wc = 60;
  else if (case_type.toLowerCase() === "robbery") wc = 60;
  else if (case_type.toLowerCase() === "battery") wc = 55;
  else if (case_type.toLowerCase() === "drug") wc = 50;
  else if (case_type.toLowerCase() === "extortion") wc = 30;
  else if (case_type.toLowerCase() === "breach of duty") wc = 30;
  else if (case_type.toLowerCase() === "fraud") wc = 10;
  else if (case_type.toLowerCase() === "destruction of property") wc = 10;
  else wc = 10;

  var wp;
  if (physical_damage.toLowerCase() === "nil") wp = 0;
  else if (
    physical_damage.toLowerCase() === "dead" ||
    physical_damage.toLowerCase().includes("dead")
  )
    wp = 5;
  else if (
    parseInt(physical_damage.split(" ")[0]) < 2 ||
    parseInt(physical_damage.split(" ")[0]) === 2
  )
    wp = 0.8;
  else if (
    parseInt(physical_damage.split(" ")[0]) > 2 ||
    parseInt(physical_damage.split(" ")[0]) < 4
  )
    wp = 1;
  else if (
    parseInt(physical_damage.split(" ")[0]) > 4 ||
    parseInt(physical_damage.split(" ")[0]) < 8
  )
    wp = 1.2;
  else if (
    parseInt(physical_damage.split(" ")[0]) > 8 ||
    parseInt(physical_damage.split(" ")[0]) < 16
  )
    wp = 1.4;
  else if (
    parseInt(physical_damage.split(" ")[0]) > 16 ||
    parseInt(physical_damage.split(" ")[0]) < 24
  )
    wp = 1.6;
  else if (parseInt(physical_damage.split(" ")[0]) > 24) wp = 2;
  else wp = 0;

  var wm;
  if (material_damage.toLowerCase() === "nil") wm = 0;
  else if (parseInt(material_damage.split("₹")[1]) < 1000) wm = 0.01;
  else if (
    parseInt(material_damage.split("₹")[1]) > 1000 ||
    parseInt(material_damage.split("₹")[1]) < 10000
  )
    wm = 0.02;
  else if (
    parseInt(material_damage.split("₹")[1]) > 10000 ||
    parseInt(material_damage.split("₹")[1]) < 50000
  )
    wm = 0.05;
  else if (
    parseInt(material_damage.split("₹")[1]) > 50000 ||
    parseInt(material_damage.split("₹")[1]) < 100000
  )
    wm = 0.08;
  else if (
    parseInt(material_damage.split("₹")[1]) > 100000 ||
    parseInt(material_damage.split("₹")[1]) < 1000000
  )
    wm = 0.1;
  else if (
    parseInt(material_damage.split("₹")[1]) > 1000000 ||
    parseInt(material_damage.split("₹")[1]) < 5000000
  )
    wm = 0.2;
  else if (parseInt(material_damage.split("₹")[1]) > 5000000) wm = 0.3;
  else wm = 0.05;

  var we;
  if (evidence) we = 2.4;
  else we = 2.2;

  var wa;

  if (parseInt(age) < 7) wa = 2.5;
  else if (parseInt(age) > 6 || parseInt(age) < 13) wa = 2;
  else if (parseInt(age) > 12 || parseInt(age) < 16) wa = 1.5;
  else if (parseInt(age) > 15 || parseInt(age) < 21) wa = 1.2;
  else if (parseInt(age) > 20 || parseInt(age) < 60) wa = 1;
  else if (parseInt(age) > 59) wa = 1.2;
  else wa = 1;
  const priority_score = (wc * (we + wa) + wp * (we + wa) + wm * 10).toFixed(2);

  return priority_score;
};
