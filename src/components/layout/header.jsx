import { auth } from "auth";
import { SignIn } from "@/components/auth/auths";
import Logo from "./logo";
import CartToggler from "@/components/cart/cart-toggler";
import UserDropDown from "../user/user-dopdown";

export default async function Header() {
  const session = await auth();
  return (
    <header className="flex items-center sticky top-0 w-full h-16 z-50 border-b border-border/40 bg-background/95 backdrop-blur  ">
      <div className="flex justify-between items-center self-center w-full max-w-screen-xl mx-auto px-3 md:px-4 lg:px-6 ">
        <div className="flex space-x-4 items-center flex-grow justify-start ">
          <Logo className="flex mr-4" />
        </div>
        <div className="flex gap-4 items-center">
          <CartToggler />
          {session?.user ? <UserDropDown /> : <SignIn />}
        </div>
      </div>
    </header>
  );
}
