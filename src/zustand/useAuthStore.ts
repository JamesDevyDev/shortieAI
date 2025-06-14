
import { NextResponse } from 'next/server'
import { create } from 'zustand'

interface AuthStore {
    authUser: any,
    getLoggedInUser: () => Promise<any>,
    loginFunction: (username: string, password: string) => Promise<any>,
    registerFunction: (username: string, password: string) => Promise<any>
}

const useAuthStore = create<AuthStore>((set, get) => ({
    authUser: null,
    getLoggedInUser: async () => {
        try {
            let res = await fetch('/api/user/me')
            if (!res.ok) return console.log('Error, no logged in user.')
            const data = await res.json()
            if (!res.ok) return { error: data?.error }
            set({ authUser: data })
            return data
        } catch (error) {
            console.log(error)
        }
    },
    loginFunction: async (username, password) => {
        try {
            let res = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json()
            if (!res.ok) return data
            set({ authUser: data })
            return data
        } catch (error) {
            console.log(error)
        }
    },
    registerFunction: async (username, password) => {
        try {
            let res = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json()
            if (!res.ok) return data
            return data
        } catch (error) {
            console.log(error)
        }
    },
    logoutFunction: async () => {
        try {
            let res = await fetch('/api/user/logout')
            set({ authUser: null })
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useAuthStore