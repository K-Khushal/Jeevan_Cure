"use client";

import { getActiveSessions } from "@/actions/get-active-session";
import Loading from "@/app/dashboard/loading";
import { Session } from "@/lib/auth-types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserCard from "./user-card";

export default function UserProfilePage() {
  const [activeSessions, setActiveSessions] = useState<Session["session"][]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchActiveSessions = async () => {
      try {
        const sessions = await getActiveSessions();
        setActiveSessions(sessions);
      } catch (e) {
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSessions();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {activeSessions ? <UserCard activeSessions={activeSessions} /> : null}
    </div>
  );
}
