import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";

export function DeleteDialog({
  children,
  name,
  action,
}: {
  children: React.ReactNode;
  name: string;
  action: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="bg-[#FEE4E2] p-2 rounded-full w-fit">
            <CircleAlert color="#D92D20" />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-[#101828] font-bold text-xl">
              Remove{" "}
              {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
            </p>
            {name === "event"
              ? `This action cannot be undone. This will permanently delete the ${name} and
            remove all the tickets and tickets purchases assoiciated with the ${name} from our servers.`
              : `This action cannot be undone. This will permanently delet the ${name} and
            remove the ${name} from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="px-0 bg-transparent">
            <Button onClick={action} variant={"destructive"} className="w-full">
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
