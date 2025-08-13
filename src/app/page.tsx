"use client"

import { useState, useEffect } from "react"
import AuthForm from "@/components/auth-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface UserData {
  id: string
  name: string
  email: string
}

export default function Home() {

  const [user, setUser] = useState<UserData | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    else {
      setLoading(false)
    }
  }, [])

  const handleAuthSuccess = (authToken: string, userData: any) => {
    setUser(userData)

    setToken(authToken)
    localStorage.setItem("token", authToken)
    localStorage.setItem("user", JSON.stringify(userData))
    setLoading(false)
  }

  const handleAuthLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    console.log("Logout")
  }

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />
  }

  return (
    <div className="flex flex-cols justify-center items-center h-screen gap-2">
      <Card className="p-7">
        <div className="flex flex-cols justify-center items-center">
          {user.name}
        </div>
        <div className="flex flex-cols justify-center items-center">
          {user.email}
        </div>
        <div className="flex flex-cols justify-center items-center ">
          <Button onClick={handleAuthLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </div>
  )
}