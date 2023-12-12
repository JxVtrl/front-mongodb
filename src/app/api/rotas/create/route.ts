import Route from "@/models/Route"
import connectMongoDB from "@/assets/lib/database"

export async function POST(req: Request, res: Response) {
  const { origin, destination, departureTime, departureDate} = await req.json()

  try {
    await connectMongoDB()
    
    const alreadyExists = await Route.findOne({ origin, destination, departureTime, departureDate })
    
    if (alreadyExists) {
      return new Response("Rota já cadastrada", { status: 409 })
    }

    const route = await Route.create({
      origin,
      destination,
      departureTime,
      departureDate,
    })


    if (!route) {
      return new Response("Rota não encontrada", { status: 204 })
    }

    return new Response(JSON.stringify(route), { status: 201 })
  } catch (err: any) {
    return new Response(err.message, { status: 500 })
  }
}
