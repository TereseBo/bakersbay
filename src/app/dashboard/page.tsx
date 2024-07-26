'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession,useSession } from "next-auth/react"
import { signOut } from "next-auth/react";

export default function Dashoboard() {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (!session) {
      redirect("/auth/signin")
    }
  }
  , [session])

  if (status === "loading") {
    return <p>Loading...</p>
  }



  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div>
        <button onClick={() => signOut()}>Sign out</button> 
      </div>
      <div>
        <h1 className="text-4xl font-bold">Welcome to Bakers bay dashboard</h1>
      </div>


    </main>
  );
}
