'use client'
import { redirect } from 'next/navigation'
import { getSession,useSession } from "next-auth/react"
import { signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }



  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div>
        {session ? <button onClick={() => signOut()}>Sign out</button> : <button onClick={() => redirect('/signin')}>Sign in</button>}
      </div>
      <div>
        <h1 className="text-4xl font-bold">Welcome to Bakers bay home page</h1>
      </div>


    </main>
  );
}
