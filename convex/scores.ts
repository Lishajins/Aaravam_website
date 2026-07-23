import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("scores").collect();
  },
});

export const upsert = mutation({
  args: {
    eventId: v.string(),
    teamId: v.string(),
    points: v.number(),
  },
  handler: async (ctx, args) => {
    const { eventId, teamId, points } = args;
    const existing = await ctx.db
      .query("scores")
      .withIndex("by_event", (q) => q.eq("eventId", eventId))
      .filter((q) => q.eq(q.field("teamId"), teamId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { points });
    } else {
      await ctx.db.insert("scores", { eventId, teamId, points });
    }
  },
});

export const clearEventScores = mutation({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const scores = await ctx.db
      .query("scores")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();
    for (const score of scores) {
      await ctx.db.delete(score._id);
    }
  },
});
