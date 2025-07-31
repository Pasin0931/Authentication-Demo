import { NextResponse } from 'next/server'
import { userDb } from "@/lib/db"

export async function POST(request) {
    try {

        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Email or password is required" }, { status: 404 })
        }

        const user = await userDb.getUserByEmail(email)
        if (!user) {
            return NextResponse.json({ error: "User not found" })
        }

        if (password !== user.password) {
            return NextResponse.json({ error: "Password is incorrect" }, { status: 401 })
        }

        return NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}