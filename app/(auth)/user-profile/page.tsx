// app/(protected)/profile/page.tsx
import { auth } from "@/lib/auth";
import { Session } from "@/lib/auth-types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import UserCard from "./user-card";

// Error boundary component for handling errors gracefully
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/10">
      <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-red-700 dark:text-red-300">
        {error.message}
      </p>
    </div>
  );
}

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <div className="w-full h-48 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
  );
}

// Separate data fetching logic for better organization
async function fetchUserData() {
  try {
    const headersList = await headers();

    const [session, activeSessions, deviceSessions] = await Promise.all([
      auth.api.getSession({
        headers: headersList,
      }),
      auth.api.listSessions({
        headers: headersList,
      }),
      auth.api.listDeviceSessions({
        headers: headersList,
      }),
    ]);

    return {
      session,
      activeSessions,
      deviceSessions,
    };
  } catch (error) {
    if (error instanceof Error) {
      // Handle specific error types if needed
      if (error.message.includes("unauthorized")) {
        redirect("/sign-in");
      }
    }
    // For any other errors, redirect to sign-in
    redirect("/sign-in");
  }
}

// Main profile page component
export default async function UserProfilePage() {
  const data = await fetchUserData();

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingState />}>
        <UserCard
          session={data.session as Session}
          activeSessions={data.activeSessions}
        />
      </Suspense>
    </div>
  );
}

// Add metadata for the page
export const metadata = {
  title: "User Profile",
  description: "Manage your profile and account settings",
};
