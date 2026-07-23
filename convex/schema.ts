import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  teams: defineTable({
    id: v.string(),
    name: v.string(),
    colorHex: v.optional(v.string()),
  }).index("by_teamId", ["id"]),

  events: defineTable({
    name: v.string(),
    category: v.union(v.literal('on_stage'), v.literal('off_stage')),
    day: v.number(),
    date: v.string(),
    time: v.string(),
    venue: v.string(),
  }),

  scores: defineTable({
    eventId: v.string(),
    teamId: v.string(),
    points: v.number(),
  }).index("by_event", ["eventId"])
    .index("by_team", ["teamId"]),

  winners: defineTable({
    eventId: v.string(),
    firstPlace: v.optional(v.string()),
    secondPlace: v.optional(v.string()),
    thirdPlace: v.optional(v.string()),
  }).index("by_event", ["eventId"]),

  achievers: defineTable({
    title: v.string(),
    name: v.string(),
    points: v.number(),
    photoUrl: v.optional(v.string()),
  }),
});
