import { listSessions } from "@/lib/auth";
import { getSession } from "@/lib/auth";
import UserCard from "./user-card";

export default async function UserProfilePage() {
  // const [session, activeSessions] = await Promise.all([
  //   auth.api.getSession({
  //     headers: await headers(),
  //   }),
  //   auth.api.listSessions({
  //     headers: await headers(),
  //   }),
  // ]).catch((e) => {
  //   throw redirect("/sign-in");
  // });

  const session = await getSession();

  const activeSessions = await listSessions();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-[100vh]">
      <UserCard
        session={JSON.parse(JSON.stringify(session))}
        activeSessions={JSON.parse(JSON.stringify(activeSessions))}
      />
    </div>
  );
}
