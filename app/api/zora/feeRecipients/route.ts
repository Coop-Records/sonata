import { ZORA_FEE_RECIPIENTS } from "@/lib/consts";
import trackEndpoint from "@/lib/trackEndpoint";

export async function GET() {
  try {
    await trackEndpoint("zora+feeRecipients")
    return Response.json({ message: 'success', data: ZORA_FEE_RECIPIENTS });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
