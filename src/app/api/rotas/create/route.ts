import Route from "@/models/Route"
import connectMongoDB from "@/assets/lib/database"

export async function POST(req: any, res: any) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  const { origem, destino, horaPartida, dataPartida, passagens } = req.body

  if (!id) return new Response("id is required", { status: 203 })

  try {
    await connectMongoDB()
    
    const route = await Route.create({
      origem,
      destino,
      horaPartida,
      dataPartida,
      passagens,
    })

    if (!route) {
      return new Response("Rota não encontrada", { status: 204 })
    }

    return new Response(JSON.stringify(route), { status: 201 })
  } catch (err: any) {
    return new Response(err.message, { status: 500 })
  }
}
