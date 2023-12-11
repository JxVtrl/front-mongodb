import Route from "@/models/Route"
import connectMongoDB from "@/assets/lib/database"

export async function GET() {
  try {
    await connectMongoDB()

    const rotas = await Route.find()

    if (rotas.length === 0) {
      return new Response(JSON.stringify([]), { status: 204 })
    }

    return new Response(JSON.stringify(rotas), { status: 200 })
  } catch (err: any) {
    return new Response(err.message, { status: 500 })
  }
}
