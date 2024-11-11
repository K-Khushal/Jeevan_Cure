import { SignInButton } from "@/components/sign-in-btn";
import { SignInFallback } from "@/components/sign-in-btn";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Navbar() {
  return (
    <nav>
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8 relative py-6">
        <div className="relative flex h-16 space-x-10 w-full">
          <div className="flex justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="block h-12 w-auto"
                height="250"
                width="250"
                src="/Logo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8 flex-1 justify-end justify-self-end ">
            <Suspense fallback={<SignInFallback />}>
              <SignInButton />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
