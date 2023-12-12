import { Schema, models, model } from "mongoose"

const routeSchema = new Schema({
  origin: {
    type: String,
  },
  destination: {
    type: String,
  },
  departureTime: {
    type: String,
  },
  departureDate: {
    type: Date,
    default: Date.now,
  },
})

export default models.Route || model("Route", routeSchema)

