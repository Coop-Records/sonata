import getSetupNewContractLogs from "@/lib/zora/getSetupNewContractLogs";
import { formatLogs } from "./formatLogs";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const creator = new URL(request.url).searchParams.get('creator'); 
    const logs = await getSetupNewContractLogs(creator)
    const formattedLogs = formatLogs(logs);
    return Response.json({ message: 'success', data: formattedLogs });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
