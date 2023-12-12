import connectMongoDB from "@/assets/lib/database"
import User from "@/models/User"

export async function GET() {
    try {
        await connectMongoDB()

        const users = await User.find()
      
        if (users.length === 0) {
            return new Response(JSON.stringify([]), { status: 204 })
        }
      
        return new Response(JSON.stringify(users), { status: 200 })
    } catch (err: any) {
        return new Response(err.message, { status: 500 })
    }
}
