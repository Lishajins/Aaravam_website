import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("achievers").collect();
  },
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("achievers")),
    title: v.string(),
    name: v.string(),
    points: v.number(),
    photoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    if (id) {
      await ctx.db.patch(id, data);
      return id;
    } else {
      return await ctx.db.insert("achievers", data);
    }
  },
});

export const remove = mutation({
  args: {
    id: v.id("achievers"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
