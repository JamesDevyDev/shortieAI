import connectDb from "@/utils/connectDb"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

import User from "@/utils/model/User.model"


export const POST = async (req: Request) => {

    const body = await req.json()
    const { username, password } = body

    try {
        await connectDb()

        const ifExist = await User.findOne({ username: username })
        if (!ifExist) return NextResponse.json("user doesnt exist.", { status: 400 })

        const samePassword = await bcrypt.compare(password, ifExist.password)

        if (!samePassword) return NextResponse.json("password does not matched.", { status: 400 })

        return NextResponse.json(ifExist, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json('Interanl Server Error.', { status: 500 })
    }
}