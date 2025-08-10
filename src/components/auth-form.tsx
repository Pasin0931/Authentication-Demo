"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle, CardHeader, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { ReactFormState } from "react-dom/client"

export default function AuthForm() {

    const [isLogin, setIsLogin] = useState(false)
    const [formData, setFormData] = useState({ email: "", password: "", name: "" })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const endPoint = isLogin ? "/api/auth/login" : "/api/auth/register"
            const body = isLogin ? { email: formData.email, password: formData.password } : formData

            const res = await fetch(endPoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            const data = await res.json()

            if (res.ok) {
                console.log(res.status)
                console.log(data)
                // onAuthSuccess(data.token, data.user)
            } else {
                // setError(data.error || "Authentication Failed")
            }

        } catch (error) {
            console.log(error)
        } finally {
            // setLoading(!isLogin)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {isLogin ? "Sign in your account" : "Create your account"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isLogin ? "Enter your credentials to access your notes" : "Enter your information to create a new account."}
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-2 mb-1">
                                <Label htmlFor="name">Full name</Label>
                                <Input id="name" name="name" type="text" required={!isLogin}
                                     value={formData.name}
                                     onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                />
                            </div>
                        )}
                        <div className="space-y-2 mb-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required
                                 value={formData.email}
                                 onChange={handleInputChange}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2 mb-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required
                                 value={formData.password}
                                 onChange={handleInputChange}
                                placeholder="Enter your password"
                            />
                        </div>

                        <Button type="submit" className="w-full mt-4">
                            {isLogin ? "Login" : "Register"}
                        </Button>

                    </form>

                    <div className="mt-4 text-center">
                        <Button variant={"link"} className="text-sm" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Don't have an account ? Sign up" : "Already have an account ? Sign in"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}