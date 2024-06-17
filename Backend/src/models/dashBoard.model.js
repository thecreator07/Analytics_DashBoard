import { text } from "express"
import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const tempSchema = new Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: Number,
  impact: String,
  added: { type: Date, default: Date.now },
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
})

tempSchema.index({
  sector: "text",
  topic: "text",
  region: "text",
  country: "text",
  pestle: "text"
})
tempSchema.plugin(mongooseAggregatePaginate)

export const tempData = mongoose.model("TempData", tempSchema)