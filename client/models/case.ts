import { Schema, model, models } from "mongoose";

const CaseSchema = new Schema({
  ps_code: { type: Schema.Types.ObjectId, ref: "User" },
  case_type: { type: String, required: true },
  fir_no: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  evidence: { type: Boolean, required: true },
  summary: { type: String, required: true },
  time: { type: String, required: true },
  frequency: { type: Number, required: true },
  age: { type: Number, required: true },
  material_damage: { type: String, required: true },
  physical_damage: { type: String, required: true },
  status: { type: String, required: true },
  priority_score: { type: Number, required: true },
});

const Case = models.Case || model("Case", CaseSchema);

export default Case;
