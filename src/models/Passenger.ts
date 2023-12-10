import { Schema, models, model } from "mongoose"

const passengerSchema = new Schema({
  seat: {
    type: Schema.Types.ObjectId,
    ref: "Seat",
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  cpf: {
    type: String,
    required: [true, "CPF is required"],
  },
})

export const Passenger = models.Passenger || model("Passenger", passengerSchema)
