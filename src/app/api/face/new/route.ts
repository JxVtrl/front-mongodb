import connectMongoDB from "@/assets/lib/database"
import { Face } from "@/models/Face"

export async function POST(req: Request) {
  const { name, _id, descriptors } = await req.json()

  if (!name || !_id || !descriptors) {
    return new Response("Missing fields", { status: 400 })
  }

  try {
    await connectMongoDB()

    let faceExists = await Face.findOne({ _id })

    if (faceExists) {
      return new Response("Face already exists", { status: 400 })
    }

    let newFace = await Face.create({
      name,
      _id,
      descriptors
    })

    return new Response(JSON.stringify(newFace), { status: 201 })
  } catch (err: any) {
    return new Response(err.message, { status: 400 })
  }
}
