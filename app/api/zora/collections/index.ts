import getSetupNewContractLogs from '@/lib/zora/getSetupNewContractLogs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { formatLogs } from './formatLogs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const logs = await getSetupNewContractLogs()
    const formattedLogs = formatLogs(logs);
    res.status(200).json({data: formattedLogs}); 
}

export default handler
