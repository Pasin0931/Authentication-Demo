import Database from 'better-sqlite3'
import { createSecureServer } from 'http2'
import path from 'path'

let db = null

export function getDb() {
    if (!db) {
        const dbPath = path.join(process.cwd(), "notes.db")
        db = new Database(dbPath)

        db.pragma("journal_mode = 'WAL'")

        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)
        console.log("Database created !")
    }
    return db
}

export function closeDb() {
    if (db) {
        db.close()
        db = null
    }
}

export const userDb = {
    createUser(email, hashedPassword, name) {
        const db = getDb()
        const stmt = db.prepare(`
            INSERT INTO users (email, password, name, created_at)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        `)
        return stmt.run(email, hashedPassword, name)
    },

    getAllUsers() {
        const db = getDb()
        const allUsers = db.prepare(`SELECT * FROM users ORDER BY id`).all()
        return allUsers
    },

    getUserByEmail(email) {
        const db = getDb()
        const users = db.prepare(`SELECT * FROM users WHERE email=?`).get(email)
        return users
    },

    getUserById(id) {
        const db = getDb()
        return db.prepare(`
            SELECT * FROM users WHERE id = ?
        `).get(id)
    }
}