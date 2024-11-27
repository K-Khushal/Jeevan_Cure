import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { signIn } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignInWithEmail = async () => {
    try {
      setLoading(true);
      await signIn.email(
        {
          email,
          password,
          callbackURL: "/dashboard",
          rememberMe,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            toast.success("Logged in successfully");
          },
        },
      );
    } catch (e) {
      toast.error((e as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithUsername = async () => {
    try {
      setLoading(true);
      await signIn.username(
        {
          username: email,
          password,
          rememberMe,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            toast.success("Logged in successfully");
            router.push("/dashboard");
          },
        },
      );
    } catch (e) {
      toast.error((e as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "github" | "discord" | "google" | "microsoft" | "twitch",
  ) => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Welcome</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email/Username</Label>
            <Input
              id="email"
              placeholder="Email or Username"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forget-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox onClick={() => setRememberMe(!rememberMe)} />
            <Label>Remember me</Label>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              if (email.includes("@")) {
                await handleSignInWithEmail();
              } else {
                await handleSignInWithUsername();
              }
            }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button
              disabled={true}
              variant="outline"
              onClick={() => handleSocialSignIn("github")}
            >
              <Icons.gitHub />
              GitHub
            </Button>
            <Button
              disabled={true}
              variant="outline"
              onClick={() => handleSocialSignIn("google")}
            >
              <Icons.google />
              Google
            </Button>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignIn;
