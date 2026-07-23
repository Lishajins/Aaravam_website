import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("winners").collect();
  },
});

export const upsert = mutation({
  args: {
    eventId: v.string(),
    firstPlace: v.optional(v.string()),
    secondPlace: v.optional(v.string()),
    thirdPlace: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { eventId, ...patch } = args;
    const existing = await ctx.db
      .query("winners")
      .withIndex("by_event", (q) => q.eq("eventId", eventId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, patch);
    } else {
      await ctx.db.insert("winners", { eventId, ...patch });
    }
  },
});

export const deleteWinner = mutation({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("winners")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .unique();
    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});
