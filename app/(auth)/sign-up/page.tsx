"use client";

import SignUp from "@/components/auth/sign-up";

export default function SignUpPage() {
  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full md:py-10">
        <div className="md:w-[400px]">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
