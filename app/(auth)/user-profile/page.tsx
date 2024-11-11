import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import UserCard from "./user-card";

export default async function UserProfilePage() {

  const [session, activeSessions, deviceSessions] = await Promise.all([
  		auth.api.getSession({
  			headers: await headers(),
  		}),
  		auth.api.listSessions({
  			headers: await headers(),
  		}),
  		auth.api.listDeviceSessions({
  			headers: await headers(),
  		}),
  	]).catch((e) => {
  		throw redirect("/sign-in");
  	});

	return (
		<div className="w-full">
				<UserCard
					session={JSON.parse(JSON.stringify(session))}
					activeSessions={JSON.parse(JSON.stringify(activeSessions))}
				/>
		</div>
	);
}
