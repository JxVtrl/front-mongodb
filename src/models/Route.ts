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
    type: String,
  },
  origin_coords: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  destination_coords: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  arrive_date: {
    type: String,
  },
  arrive_time: {
    type: String,
  },
  seats: [{
    id: {
      type: Number,
    },
    numero: {
      type: Number,
    },
    ocupado: {
      type: Boolean,
    },
  }],
  value: {
    type: Number,
  },
})

export default models.Route || model("Route", routeSchema)

