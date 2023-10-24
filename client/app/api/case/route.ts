import { prompt } from "@/constants";
import Case from "@/models/case";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  try {
    const { fir_no, summary, ps_code } = await req.json();
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${summary} ${prompt}`,
        },
      ],
    };
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const gptRes = await res.json();

    const lines = gptRes.choices[0].message.content.split("\n");
    console.log("lines", lines);

    var case_type = "";
    var evidence = false;
    var age = "";
    var physical_damage = "";
    var material_damage = "";
    var date = "";
    var time = "";

    lines.forEach((line: string) => {
      const parts = line.split(": ");
      if (parts.length === 2) {
        const key = parts[0].split(") ")[1].trim();
        const value = parts[1].trim();

        switch (key) {
          case "crime_type":
            case_type = value;
            break;
          case "evidence":
            evidence = value.toLowerCase() === "yes" ? true : false;
            break;
          case "victim_age":
            age = value.split(" ")[0];
            break;
          case "physical_damage":
            physical_damage = value;
            break;
          case "material_damage":
            material_damage = value;
            break;
          case "date_of_crime":
            date = value;
            break;
          case "time_of_crime":
            time = value;
            break;
        }
      }
    });
    console.log("Crime Type:", case_type);
    console.log("Evidence:", evidence);
    console.log("Victim Age:", age);
    console.log("Physical Damage:", physical_damage);
    console.log("Material Damage:", material_damage);
    console.log("Date of Crime:", date);
    console.log("Time of Crime:", time);

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
