import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { signIn, signUp } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signUp.email({
        email,
        password,
        username,
        name: username,
        callbackURL: "/dashboard",
      });
      toast.success("Account created successfully. Please sign in.");
      router.push("/sign-in");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "github" | "discord" | "google" | "microsoft",
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
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
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
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="Password"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Confirm Password</Label>
          <PasswordInput
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="new-password"
            placeholder="Confirm Password"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          onClick={handleSignUp}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUp;
