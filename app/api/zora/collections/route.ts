import getSetupNewContractLogs from "@/lib/zora/getSetupNewContractLogs";
import { NextRequest } from "next/server";
import { Address } from "viem";
import trackEndpoint from "@/lib/stack/trackEndpoint";
import formatBigIntValues from "@/lib/formatBigIntValues";

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint("zora+collections")
    const creator = new URL(request.url).searchParams.get('creator') as Address; 
    const logs = await getSetupNewContractLogs(creator)
    const formattedLogs = formatBigIntValues(logs);
    return Response.json({ message: 'success', data: formattedLogs });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
