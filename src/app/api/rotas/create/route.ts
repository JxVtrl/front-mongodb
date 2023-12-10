import Route from "@/models/Route"
import connectMongoDB from "@/assets/lib/database"

export async function POST(req: any, res: any) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")


  const { origin, destination, departureTime, departureDate, tickets} = req.body
  
  console.log("d: ", destination)
  console.log("o: ", origin)

  if (!id) return new Response("id is required", { status: 400 })

  try {
    await connectMongoDB()
    console.log(id)
    console.log('aaa')

    const route = await Route.create({
      origin,
      destination,
      departureTime,
      departureDate,
      tickets,
    })


    if (!route) {
      return new Response("Rota não encontrada", { status: 400 })
    }

    return new Response(JSON.stringify(route), { status: 200 })
  } catch (err: any) {
    return new Response(err.message, { status: 500 })
  }
}
