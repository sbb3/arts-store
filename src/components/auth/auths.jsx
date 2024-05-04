import { signIn, signOut } from "auth";
import { Button } from "../ui/button";

export function SignIn({ provider, ...props }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button
        className="w-full
        font-bold
        text-md  

        "
        {...props}
      >
        Sign In
      </Button>
    </form>
  );
}

export function SignOut(props) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button
        // variant="ghost"
        className="
        w-full
      "
        {...props}
      >
        Sign Out
      </Button>
    </form>
  );
}
