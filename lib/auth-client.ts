import {
  adminClient,
  multiSessionClient,
  organizationClient,
  passkeyClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const client = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    organizationClient(),
    twoFactorClient({
      redirect: true,
      twoFactorPage: "/two-factor",
    }),
    passkeyClient(),
    adminClient(),
    multiSessionClient(),
    usernameClient(),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export const { signUp, signIn, signOut, useSession } = client;
