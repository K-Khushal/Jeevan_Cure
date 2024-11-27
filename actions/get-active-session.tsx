"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getActiveSessions() {
  try {
    return await auth.api.listSessions({
      headers: await headers(), // Convert ReadonlyHeaders to plain object
    });
  } catch (error) {
    console.error("Failed to fetch active sessions:", error);
    return [];
  }
}
