"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Input } from "@base-ui/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSigInSubmit = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong.");
        },
        onSuccess: () => {
          window.alert("You are now logged In.");
        },
      },
    );
  };
  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("Success");
        },
      },
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col p-5 bg-purple-300">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-black mt-6 p-2 rounded-2xl"
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black mt-6 p-2 rounded-2xl"
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black mt-6 p-2 rounded-2xl"
        />
        <Button
          onClick={onSubmit}
          className="pt-2 pl-5 pr-5 pb-2 bg-black text-2xl text-white mt-6 rounded-2xl">
          Create User
        </Button>
      </div>
      <div className="flex flex-col bg-blue-300 m-10">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black mt-6 p-2 rounded-2xl"
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black mt-6 p-2 rounded-2xl"
        />
        <Button
          onClick={onSigInSubmit}
          className="pt-2 pl-5 pr-5 pb-2 bg-black text-2xl text-white mt-6 rounded-2xl">
          Sign In
        </Button>
      </div>
    </>
  );
}
