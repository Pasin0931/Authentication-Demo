import { NextResponse } from "next/server"
import { userDb } from "@/lib/db"

export async function POST(request) {
    try {

        const { email, password, name } = await request.json()

        if (!email || !password || !name) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
        }

        const existingUser = await userDb.getUserByEmail(email)
        if (existingUser) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }

        const result = userDb.createUser(email, password, name)
        console.log("result :", result)
        if (result.changes > 0) {
            return NextResponse.json({ message: "User registered successfuly" }, { user: { id: result.lastInsertRowid, email, name } }
            )
        }

    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json({ error: "Registration failed" }, { status: 500 })
    }
}

export async function GET() {
    try {

        const allUsers = await userDb.getAllUsers()
        return NextResponse.json({ Users: allUsers }, { status: 200 })

    } catch (error) {
        console.error("Error getting users:", error)
        return NextResponse.json({ error: "Error getting users:" }, { status: 500 })
    }
}