export type Case = {
  _id: string;
  case_type: string;
  fir_no: string;
  date: string;
  evidence: boolean;
  summary: string;
  time: string;
  frequency?: number;
  age: number;
  material_damage: string;
  physical_damage: string;
  status: "Active";
  priority_score: number;
};
export type CaseForm = {
  case_type: string;
  fir_no: string;
  date: string;
  evidence: boolean;
  summary: string;
  time: string;
  frequency?: number;
  age: number;
  material_damage: string;
  physical_damage: string;
};
