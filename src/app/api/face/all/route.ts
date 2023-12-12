import connectMongoDB from "@/assets/lib/database"
import { Face } from "@/models/Face"

export async function GET() {
    try {
        await connectMongoDB()

        const faces = await Face.find()
      
        if (faces.length === 0) {
            return new Response(JSON.stringify([]), { status: 204 })
        }
      
        return new Response(JSON.stringify(faces), { status: 200 })
    } catch (err: any) {
        return new Response(err.message, { status: 500 })
    }
}
