import Case from "@/models/case";
import { connectToDB } from "@/utils/database";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const deletedCase = await Case.findByIdAndDelete(params.id);
    if (!deletedCase) {
      return new Response("Case not found", { status: 404 });
    }
    return new Response(JSON.stringify(deletedCase), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
