import { Schema, models, model } from "mongoose"

const ticketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantidadeDePassageiros: {
    type: Number,
    required: [true, "Quantity of passengers is required"],
  },
  rota: {
    type: Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
  precoTotal: {
    type: Number,
    required: [true, "Total price is required"],
  },
  passageiros: [
    {
      type: Schema.Types.ObjectId,
      ref: "Passenger",
    },
  ],
})

export const Ticket = models.Ticket || model("Ticket", ticketSchema)
