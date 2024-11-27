"use client";

import { client } from "@/lib/auth-client";
import { Session } from "@/lib/auth-types";
import { MobileIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { Laptop } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UAParser } from "ua-parser-js";

export default function ActiveSession(props: {
  session: Session | null;
  activeSessions: Session["session"][];
}) {
  const activeSessions = props.activeSessions;
  const router = useRouter();
  const [isTerminating, setIsTerminating] = useState<string>();

  const getUAInfo = (userAgent: string | null | undefined) => {
    if (!userAgent) return null;
    const parser = new UAParser(userAgent);
    return {
      deviceType: parser.getDevice().type,
      osName: parser.getOS().name,
      browserName: parser.getBrowser().name,
    };
  };

  return (
    <div className="border-l-2 px-2 w-max gap-1 flex flex-col">
      <p className="text-xs font-medium ">Active Sessions</p>
      {activeSessions
        .filter((session) => session.userAgent)
        .map((session) => {
          const uaInfo = getUAInfo(session.userAgent);
          return (
            <div key={session.id}>
              <div className="flex items-center gap-2 text-sm  text-black font-medium dark:text-white">
                {uaInfo?.deviceType === "mobile" ? (
                  <MobileIcon />
                ) : (
                  <Laptop size={16} />
                )}
                {uaInfo?.osName}, {uaInfo?.browserName}
                <button
                  className="text-red-500 opacity-80  cursor-pointer text-xs border-muted-foreground border-red-600  underline "
                  onClick={async () => {
                    setIsTerminating(session.id);
                    const res = await client.revokeSession({
                      token: session.token,
                    });

                    if (res.error) {
                      toast.error(res.error.message);
                    } else {
                      toast.success("Session terminated successfully");
                    }
                    router.refresh();
                    setIsTerminating(undefined);
                  }}
                >
                  {isTerminating === session.id ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : session.id === props.session?.session.id ? (
                    "Sign Out"
                  ) : (
                    "Terminate"
                  )}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
