"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@base-ui/react";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) {
    return <p>loading...</p>;
  }
  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/auth/sign-in"),
            },
          })
        }
        className="bg-black text-white p-2">
        Sign out
      </Button>
    </div>
  );
}
