import Route from "@/models/Route"
import connectMongoDB from "@/assets/lib/database"
import { getCoordsInGoogleMaps } from "@/utils/functions"

export async function POST(req: Request, res: Response) {

  try {
    
  const { origin,origin_coords, destination, destination_coords,departureTime, departureDate, value } = await req.json()

    
    await connectMongoDB()
    
    const alreadyExists = await Route.findOne({ origin, destination, departureTime, departureDate })
    
    if (alreadyExists) {
      return new Response("Rota já cadastrada", { status: 409 })
    }
    
    let seats = []
    for (let i = 0; i < 40; i++) {
      seats.push({
        id: i,
        numero: i + 1,
        ocupado: false,
      })
    }    

    const route = await Route.create({
      origin,
      origin_coords: getCoordsInGoogleMaps(origin),
      destination,
      destination_coords: getCoordsInGoogleMaps(destination),
      departureTime,
      departureDate,
      value,
      seats
    })


    if (!route) {
      return new Response("Rota não encontrada", { status: 204 })
    }

    return new Response(JSON.stringify(route), { status: 201 })
  } catch (err: any) {
    return new Response(err.message, { status: 500 })
  }
}
