import Route from "@/models/Route"
import connectMongoDB from "@/assets/lib/database"

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)

  const id = searchParams.get("id")

    try {
    await connectMongoDB()
      
    const route = await Route.findByIdAndDelete(id)

    if (!route) {
      return new Response("Rota não encontrada", { status: 204 })
    }

    return new Response(JSON.stringify(route), { status: 201 })
  } catch (err: any) {
    return new Response(err.message, { status: 500 })
  }
}
