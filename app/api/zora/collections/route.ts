import getSetupNewContractLogs from "@/lib/zora/getSetupNewContractLogs";
import { formatLogs } from "./formatLogs";

export async function GET() {
  try {
    const logs = await getSetupNewContractLogs()
    const formattedLogs = formatLogs(logs);
    return Response.json({ message: 'success', data: formattedLogs });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
