import { NextResponse } from 'next/server'
import { userDb } from "@/lib/db"
import { verifyPassword, gennerateToken } from '@/lib/auth'

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

        // Check raw password (not decrypt password)
        // if (password !== user.password) {
        //     return NextResponse.json({ error: "Password is incorrect" }, { status: 401 })
        // }

        //--------------------------------------

        const isValidPassword = verifyPassword(password, user.password)
        if (!isValidPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 })
        }

        const token = await gennerateToken({userId: user.id, email: user.email, name: user.name})

        //--------------------------------------

        return NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            token
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}