import User from "@/models/User"
import connectMongoDB from "@/assets/lib/database"

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) return new Response("id is required", { status: 400 })

  try {
    await connectMongoDB()

    const user = await User.findById(id)

    if (!user) {
      return new Response("User not found", { status: 400 })
    }

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (err: any) {
    return new Response(err.message, { status: 500 })
  }
}
