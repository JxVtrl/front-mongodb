import Route from "@/models/Route"
import connectMongoDB from "@/assets/lib/database"
import { getCoordsInGoogleMaps, getDurationTimeInGoogleMaps } from "@/utils/functions"

export async function POST(req: Request, res: Response) {

  try {
    
  const { origin,destination, departureTime, departureDate, value } = await req.json()

    
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

    const duration = await getDurationTimeInGoogleMaps(origin, destination)
    
    const arrive_date = new Date(departureDate)
    arrive_date.setSeconds(arrive_date.getSeconds() + duration)
    const arrive_time = arrive_date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    const arrive_date_formatted = arrive_date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

    const route = await Route.create({
      origin,
      origin_coords: getCoordsInGoogleMaps(origin),
      destination,
      destination_coords: getCoordsInGoogleMaps(destination),
      departureTime, 
      departureDate,
      arrive_date: arrive_date_formatted,
      arrive_time: arrive_time,
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
