'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SignInButton from './SignInButton';

export default function SignInDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please sign in to continue</DialogTitle>
          <DialogDescription>Connect with you farcaster account</DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full sm:justify-center">
          <SignInButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
