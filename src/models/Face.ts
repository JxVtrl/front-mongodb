import { Schema, models, model } from "mongoose"

const faceSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  _id: {
    type: String,
    required: [true, "Id is required"],
  },
  descriptors: [{
    type: String,
    required: [true, "Descriptor is required"],
  }]
})

export const Face = models.Face || model("Face", faceSchema)
