import { listSessions } from "@/lib/auth";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserCard from "./user-card";

export default async function UserProfilePage() {
  try {
    const [session, activeSessions] = await Promise.all([
      getSession(),
      listSessions(),
    ]);

    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-[100vh]">
        <UserCard
          session={JSON.parse(JSON.stringify(session))}
          activeSessions={JSON.parse(JSON.stringify(activeSessions))}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching session data:", error);
    redirect("/dashboard");
  }
}
