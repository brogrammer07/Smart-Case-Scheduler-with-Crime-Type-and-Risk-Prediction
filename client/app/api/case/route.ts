import Case from "@/models/case";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  try {
    const {
      case_type,
      fir_no,
      evidence,
      material_damage,
      physical_damage,
      summary,
      date,
      time,
      age,
      ps_code,
    } = await req.json();
    await connectToDB();
    const user = await User.findOne({ ps_code: ps_code });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const existingCase = await Case.findOne({ fir_no: fir_no });
    if (existingCase) {
      return new Response("Case already exists", { status: 409 });
    }
    const priority_score = 80;
    const frequency = 1;
    const status = "Active";
    const newCase = new Case({
      ps_code: user._id,
      case_type,
      fir_no,
      date,
      evidence,
      summary,
      time,
      frequency,
      age,
      material_damage,
      physical_damage,
      status,
      priority_score,
    });
    await newCase.save();
    return new Response(JSON.stringify(newCase), { status: 201 });
  } catch (error) {
    console.log(error);

    return new Response("Failed to add new case", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const cases = await Case.find();
    return new Response(JSON.stringify(cases), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch cases", { status: 500 });
  }
};
