import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "auth";
import { SignOut } from "../auth/auths";
import Link from "next/link";

export default async function UserDropDown() {
  const session = await auth();
  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative p-1 rounded-full">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={session.user?.image || ""}
                alt={session.user?.name || ""}
              />
              <AvatarFallback className="h-12 w-12 font-bold">
                {session.user?.name.charAt(0).toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user?.name || "Anonymous"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email || " "}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {session?.user?.role == "admin" && (
            <DropdownMenuItem className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left cursor-pointer">
              <Link href="/dashboard">Admin Dashboard</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className="flex items-center justify-center w-full"
          >
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
