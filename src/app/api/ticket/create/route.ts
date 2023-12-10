import { Ticket } from "@/models/Ticket"
import connectMongoDB from "@/assets/lib/database"

export async function POST(req: any) {
  const { user, quantidadeDePassageiros, rota, precoTotal, passageiros } = req.body


  if (!user.email ) return new Response("Usuário não informado!", { status: 400 })
  
  if (!quantidadeDePassageiros) return new Response("Quantidade de passageiros não informado!", { status: 400 })

  if (!rota) return new Response("Rota não informado!", { status: 400 })

  if (!precoTotal) return new Response("Preço total não informado!", { status: 400 })

  if (!passageiros) return new Response("Passageiros não informado!", { status: 400 })

  try {
    await connectMongoDB()

    Ticket.create({
      user,
      quantidadeDePassageiros,
      rota,
      precoTotal,
      passageiros,
    })

    return new Response("Ticket criado com sucesso!", { status: 200 })
  } catch (err: any) {
    new Response(err.message, { status: 500 })
  }
}
