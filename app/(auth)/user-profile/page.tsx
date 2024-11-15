import { listSessions } from "@/lib/auth";
import { getSession } from "@/lib/auth";
import UserCard from "./user-card";

export default function UserProfilePage() {
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

  const session = getSession();

  const activeSessions = listSessions();

  return (
    <div className="container mx-auto px-4 py-8">
      <UserCard
        session={JSON.parse(JSON.stringify(session))}
        activeSessions={JSON.parse(JSON.stringify(activeSessions))}
      />
    </div>
  );
}
