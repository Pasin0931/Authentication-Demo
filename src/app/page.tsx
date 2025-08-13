"use client"

import { useState, useEffect } from "react"
import AuthForm from "@/components/auth-form"

interface UserData {
  id: string
  name: string
  email: string
}

export default function Home() {

  const [user, setUser] = useState<UserData | null>(null)
  // const [token, setToken] = useState<string | null>(null)

  // useEffect(() => {})

  const handleAuthSuccess = (token: string, userData: any) => {
    setUser(userData)
  }

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />
  }

  return (
    <div>
      {user.name}
      {user.email}
    </div>
  )
}