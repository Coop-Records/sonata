import { stack } from '@/lib/stack/client';

const track = async (endpoint: string, options: any) => stack.track(endpoint, options);

export default track;
