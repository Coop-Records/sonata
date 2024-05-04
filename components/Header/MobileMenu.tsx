import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Filter from '../Feed/PlatformFilter';
import BalanceInfo from './BalanceInfo';
import SignInButton from '../SignInButton';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

type MobileMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  const { user, signOut } = useNeynarProvider();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle className="text-left text-4xl">Notes</SheetTitle>
        </SheetHeader>

        <BalanceInfo />
        <Separator />
        <Filter />
        <Separator />

        <div className="mt-auto space-y-6">
          <Separator />
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.pfp_url} />
                  <AvatarFallback>{user.display_name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">@{user.username}</h3>
              </div>
              <Button onClick={signOut}>Sign Out</Button>
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
