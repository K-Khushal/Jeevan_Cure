import { auth } from "@/lib/auth";
import { TvMinimal } from "lucide-react";
import { LogIn } from "lucide-react";

import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "./ui/button";

export async function SignInButton() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Link
      href={session?.session ? "/dashboard" : "/sign-in"}
      className="flex justify-center"
    >
      <Button
        className="gap-2 justify-between rounded-full"
        variant="default"
        size="sm"
      >
        {!session?.session ? <LogIn /> : <TvMinimal />}
        <span>{session?.session ? "Dashboard" : "Sign In"}</span>
      </Button>
    </Link>
  );
}

function checkOptimisticSession(headers: Headers) {
  const guessIsSignIn =
    headers.get("cookie")?.includes("better-auth.session") ||
    headers.get("cookie")?.includes("__Secure-better-auth.session-token");
  return !!guessIsSignIn;
}

export async function SignInFallback() {
  //to avoid flash of unauthenticated state
  const guessIsSignIn = checkOptimisticSession(await headers());
  return (
    <Link
      href={guessIsSignIn ? "/dashboard" : "/sign-in"}
      className="flex justify-center"
    >
      <Button
        className="gap-2 justify-between rounded-full"
        variant="default"
        size="sm"
      >
        {!guessIsSignIn ? <LogIn /> : <TvMinimal />}
        <span>{guessIsSignIn ? "Dashboard" : "Sign In"}</span>
      </Button>
    </Link>
  );
}
