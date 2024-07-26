"use client";

import { useEffect } from "react";
import Link from "next/link";
//import { useRouter } from "next/navigation";
import { signOut,useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  //const router = useRouter();

/*   useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]); */

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div>
        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <Link href="/auth/signin">Sign In</Link>
        )}
      </div>
      <div>
        <h1 className="text-4xl font-bold">Welcome to Bakers bay home page</h1>
      </div>
    </main>
  );
}
