import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("teams").collect();
  },
});

export const update = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    colorHex: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    const team = await ctx.db
      .query("teams")
      .withIndex("by_teamId", (q) => q.eq("id", id))
      .unique();
    if (team) {
      await ctx.db.patch(team._id, patch);
    }
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("teams").collect();
    if (existing.length === 0) {
      const DEFAULT_TEAMS = [
        { id: 'pg-phd', name: "PG-PhD", colorHex: "#A855F7" },
        { id: 'batch-22', name: "'22 Batch", colorHex: "#3B82F6" },
        { id: 'batch-23', name: "'23 Batch", colorHex: "#10B981" },
        { id: 'batch-24', name: "'24 Batch", colorHex: "#F59E0B" },
        { id: 'batch-25', name: "'25 Batch", colorHex: "#EF4444" },
      ];
      for (const team of DEFAULT_TEAMS) {
        await ctx.db.insert("teams", team);
      }
    }
  },
});
