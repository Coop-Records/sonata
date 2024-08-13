import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

export default function useCopyToClipboard() {
  const { toast } = useToast();

  const copy = useCallback(async (data: string) => {
    try {
      await navigator.clipboard.writeText(data);
      toast({ title: 'Copied!', description: 'Copied to clipboard.' });
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, [])

  return { copy };
}