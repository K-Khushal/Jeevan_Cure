import { getActiveSessions } from "@/actions/get-active-session";
import Loading from "@/app/dashboard/loading";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import UserCard from "./user-card";

export default async function UserProfilePage() {
  const activeSessions = await getActiveSessions().catch((e) => {
    throw redirect("/sign-in");
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Suspense fallback={<Loading />}>
        <UserCard activeSessions={activeSessions} />
      </Suspense>
    </div>
  );
}
